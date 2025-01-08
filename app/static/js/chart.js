// let labels = ['Q3 2020', 'Q4 2020', 'Q1 2021', 'Q2 2021', 'Q3 2021'];

// let itemData = [8771000, 10744000, 10389000, 11958000, 13757000];

const data = {
    labels: chartData.labels,
    datasets: [{
        data: chartData.data,
        borderColor: '#d6c5b3',
        fill: true,
        tension: 0.1,
        label: 'Equity Curve'
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'PnL'
            }
        }
    }
};

const chart = new Chart(
    document.getElementById('myChart'),
    config
);
// For doughnut chart

// let labels2 = ['NQ', 'XAUUSD'];

// let itemData2 = [50,50];

const data2 = {
    labels: chartData2.labels2,
    datasets: [{
      data: chartData2.data2,
      hoverOffset: 4,
      backgroundColor: [
        '#1e1f20', '#d6c5b3', '#ff8c00',
        '#f0e68c', '#32cd32', '#4682b4', '#adff2f', '#8a2be2']
    }]
  };

const config2 = {
    type: 'doughnut',
    data: data2,
  };

  const chart2 = new Chart(
    document.getElementById('myChart2'),
    config2
);