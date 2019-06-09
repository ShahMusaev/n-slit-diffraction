let Multi;
const MN1 = document.getElementById('N');
const L1 = document.getElementById("L");

const LambdaUP = document.getElementById("lambda1");
const LambdaDOWN = document.getElementById("lambda2");

const MA1 = document.getElementById("a");
const MB1 = document.getElementById("b");


function drowChart() {

    var ctx = document.getElementById('myChart').getContext('2d');     Multi = new Chart(ctx, {
         type: 'line',
         data: {
             labels: [],
             datasets: [
                 {
                     label: 'I(x)',
                     data: [],
                     labels: [],
                     borderColor: '#007bff',
                     borderWidth: 2,
                     fill: false,
                     pointRadius: 0
                 }
             ]
         },
        options: {
            scales: {
                yAxes: [{
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        fontFamily: 'Helvetica',
                        fontStyle:  'bold',
                        labelString: "Интенсивность (I)"
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return (100 * (value)).toFixed(2);
                        }
                    }

                }],
                xAxes: [{
                    position: 'top',
                    scaleLabel: {
                        display: true,
                        fontStyle: 'bold',
                        lineHeight: 1,
                        padding: 2,
                        labelString: "Расстояние (мм)"
                    },
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            if ((index % 4) === 0) {return value;}
                            return '';
                        }
                    }
                }]
            }
        }
    });
    updateChart();
}

function updateChart() {
    let wavelengthUP = Number(LambdaUP.value),
        wavelenghtDOWN = Number(LambdaDOWN.value),
        N = Number(MN1.value),
        b = Number(MA1.value) * 1e-3,
        d = Number(MB1.value) * 1e-3,
        L = Number(L1.value) * 1e3;

    let labels = [];
    let intensities = [];

    function intensityFunction(x) {
        let result = 0;
        let count = 0;
        let e = 1e-6;

        for (let i = wavelenghtDOWN; i <= wavelengthUP; i += 1) {
            result += Math.pow(b, 2) * Math.pow(Math.sin((Math.PI * b * x) / (i * e * L)) / (Math.PI * b * x) / (i * e * L), 2)
                * Math.pow(Math.sin(N * (Math.PI * d * x) / (i * e * L)) / Math.sin((Math.PI * d * x) / (i * e * L)), 2);
            count++;
        }
        result = result / count;
        intensities.push(result)

    }




    for (let x = -3/2 * 1e2; x <=3/2 * 1e2 ; x += 0.1  ) {
        labels.push(x.toFixed(2));
        intensityFunction(x);
    }

    if(d > b) {
        Multi.data.labels = labels;
        Multi.data.datasets[0].data = intensities;

        // drawMultiInterfPicture(wavelenghtDOWN, wavelengthUP, d * 1000, 3000, 1, N ,b * 1000);
        drawMultiInterfPicture(wavelenghtDOWN, wavelengthUP, d * 100, L, 10, b * 100, N);
    } else {

        Multi.data.labels = 0;
        Multi.data.datasets[0].data = 0;
        drawMultiInterfPicture(0, 0, d * 100, L, 10, b * 100, N);
    }
    Multi.update();
}