import { ChartType } from './chartjs.model';

const lineAreaChart: ChartType = {
    datasets: [

    ],
    options: {
        defaultFontColor: '#8791af',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)',
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        max: 100,
                        min: 20,
                        stepSize: 10,
                    },
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)',
                    },
                },
            ],
        },

    }
};

const lineBarChart: ChartType = {
    labels: [

    ],
    datasets: [

    ],
    options: {
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)'
                    },
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)'
                    }
                }
            ]
        }
    }
};

const pieChart: ChartType = {
    labels: [
        'Desktops', 'Tablets'
    ],
    datasets: [
        {
            data: [300, 180],
            backgroundColor: ['#34c38f', '#ebeff2'],
            hoverBackgroundColor: ['#34c38f', '#ebeff2'],
            hoverBorderColor: '#fff',
        }
    ],
    options: {
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        }
    }
};

const donutChart: ChartType = {
    labels: [
        'Desktops', 'Tablets'
    ],
    datasets: [
        {
            data: [300, 210],
            backgroundColor: [
                '#556ee6', '#ebeff2'
            ],
            hoverBackgroundColor: ['#556ee6', '#ebeff2'],
            hoverBorderColor: '#fff',
        }],
    options: {
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        }
    }
};

const radarChart: ChartType = {
    labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running',
    ],
    datasets: [
        {
            label: 'Desktops',
            backgroundColor: 'rgba(52, 195, 143, 0.2)',
            borderColor: '#34c38f',
            pointBackgroundColor: '#34c38f',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#34c38f',
            data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
            label: 'Tablets',
            backgroundColor: 'rgba(85, 110, 230, 0.2)',
            borderColor: '#556ee6',
            pointBackgroundColor: '#556ee6',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#556ee6',
            data: [28, 48, 40, 19, 96, 27, 100],
        },
    ],
    options: {
        maintainAspectRatio: false,
        legend: {
            position: 'top'
        }
    }
};

const polarChart: ChartType = {
    labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4'],
    datasets: [
        {
            data: [11, 16, 7, 18],
            backgroundColor: ['#f46a6a', '#34c38f', '#f1b44c', '#556ee6'],
            label: 'My dataset', // for legend
            hoverBorderColor: '#fff',
        },
    ],
    options: {
        responsive: true,
        legend: {
            position: 'top',
        }
    }
};

export { lineAreaChart, lineBarChart, pieChart, donutChart, radarChart, polarChart };
