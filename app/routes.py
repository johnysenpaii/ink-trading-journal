# app/routes.py

from flask import Blueprint, render_template, g, Flask, render_template, request, redirect, url_for
import sqlite3

# Create a Blueprint for your routes
bp = Blueprint('routes', __name__)

# Database connection setup function
def get_db_connection():
    conn = sqlite3.connect('trading_journal.db')
    conn.row_factory = sqlite3.Row
    return conn

# Define a route for the homepage
@bp.route('/')
def index():
    conn = get_db_connection()
    cursor = conn.execute('SELECT * FROM trade_entry order by date ASC')  # Update with your table name
    rows = cursor.fetchall()
    #calculate the total PNL
    total_pnl = sum([float(row[8]) for row in rows])
    #calculate the total trades
    cursor2 = conn.execute('SELECT COUNT(*) FROM trade_entry')
    total_count = cursor2.fetchone()[0]
    #calculate the win rate %
    cursor3 = conn.execute('SELECT COUNT(*) FROM trade_entry where result ="Win"')
    wins = cursor3.fetchone()[0]

    if total_count > 0:
        win_rate = (wins/total_count) * 100
    else:
        win_rate = 0

    conn.close()
    return render_template('index.html', rows=rows, total_pnl=total_pnl, total_count=total_count, win_rate=win_rate)

# Define a route for analytics page
@bp.route('/analytics')
def analytics():
    # Connect to your SQLite database (or any other data source)
    conn = get_db_connection()
    
    #for line chart
    # Query data (adjust query as per your table structure)
    cursor4 = conn.execute("SELECT date, pnl FROM trade_entry order by date ASC")
    result = cursor4.fetchall()
    
    # Extract labels and data from the query result
    labels = [row['date'] for row in result]  # Assume 'month' column for labels
    data = [row['pnl'] for row in result]    # Assume 'sales' column for data

    #for doughnut
    cursor5 = conn.execute("SELECT pair FROM trade_entry")
    result = cursor5.fetchall()

    pairs = [row['pair'] for row in result]

    # Count occurrences of each trading pair
    from collections import Counter
    pair_counts = dict(Counter(pairs))

    # Extract pairs and their counts for the chart
    labels2 = list(pair_counts.keys())
    data2 = list(pair_counts.values())

    conn.close()

    # Pass dynamic labels and data to the template
    return render_template('analytics.html', labels=labels, data=data, labels2=labels2, data2=data2)

# Define a route for calculator page
@bp.route('/calculator')
def calculator():
    return render_template('calculator.html')

# CRUD OPERATIONS HERE************************************************

# Route to create (add a new entry)
@bp.route('/add', methods=['POST'])
def add_entry():
    datePicker = request.form['datePicker']
    tradeDay = request.form['tradeDay']
    tradePair = request.form['tradePair']
    tradeBias = request.form['tradeBias']
    tradePosition = request.form['tradePosition']
    slPips = request.form['slPips']
    riskPercent = request.form['riskPercent']
    
    # Try to parse the PNL input as a float
    try:
        pnl = float(request.form['pnl'])  # Convert PNL to a float
    except ValueError:
        # Handle the case where PNL is not a valid number
        pnl = 0.0  # Default to 0.0 or handle the error as needed

    # Calculate the result (Win, Loss, or BE)
    if pnl > 0:
        result = 'Win'
    elif pnl < 0:
        result = 'Loss'
    else:
        result = 'BE'  # Break-even

    conn = get_db_connection()
    conn.execute('INSERT INTO trade_entry (date, trade_day, pair, bias, position, sl_pips, risk_percentage, pnl, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                 (datePicker, tradeDay, tradePair, tradeBias, tradePosition, slPips, riskPercent, pnl, result))
    conn.commit()
    conn.close()
    return redirect(url_for('routes.index'))

# CRUD OPERATIONS HERE************************************************
