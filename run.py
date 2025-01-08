# run.py
from waitress import serve
from app import create_app

# Create the app instance
app = create_app()

# if __name__ == '__main__':
#     app.run(debug=False, host="0.0.0.0", port=5000)

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5000)
