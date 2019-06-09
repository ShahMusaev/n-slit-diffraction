let myChart;
const N1 = document.getElementById('N');
const Lambda1 = document.getElementById("lambda1");
const Lambda2 = document.getElementById("lambda2");
const A1 = document.getElementById("a");
const B1 = document.getElementById("b");
const L1 = document.getElementById("L");

function drowChart() {

    var ctx = document.getElementById('myChart').getContext('2d');
     myChart = new Chart(ctx, {
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
                         fontStyle: 'bold',
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
                             if ((index % 4) === 0) {
                                 return value;
                             }
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
    let wavelength1 = Number(Lambda1.value),
        wavelength2 = Number(Lambda2.value),
        N = Number(N1.value),
        b = Number(A1.value) * 1e-3,
        d = Number(B1.value) * 1e-3,
        L = Number(L1.value) * 1e3;

    let labels = [];
    let intensities = [];

    function intensityFunction(x) {
        let e = 1e-6;

        let u1 = (Math.PI * b * x) / (wavelength1 * e * L);
        let q1 = (Math.PI * d * x) / (wavelength1 * e * L);
        let res1 = Math.pow(b, 2) * Math.pow(Math.sin(u1) / u1, 2) * Math.pow(Math.sin(N * q1) / Math.sin(q1), 2);

        let u2 = (Math.PI * b * x) / (wavelength2 * e * L);
        let q2 = (Math.PI * d * x) / (wavelength2 * e * L);
        let res2 = Math.pow(b, 2) * Math.pow(Math.sin(u2) / u2, 2) * Math.pow(Math.sin(N * q2) / Math.sin(q2), 2);

        let res = res1 + res2;
        intensities.push(res / 2)
    }




    for (let x = -3/2 * 1e2; x <=3/2 * 1e2 ; x += 0.1  ) {
        labels.push(x.toFixed(2));
        intensityFunction(x);
    }

    if( d > b) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = intensities;

        // drawMonoInterfPicture(wavelength, d * 100, b* 100, N, 3000)
        // drawDoubleInterfPicture(wavelength1, wavelength2, d *100, b * 100, N, 3000);
        drawDoubleInterfPicture(wavelength1, wavelength2, d * 100, b * 100, N, L)
    } else {
        myChart.data.labels = 0;
        myChart.data.datasets[0].data = 0;
        drawDoubleInterfPicture(0, 0, d * 100, b * 100, N, L)

    }
    myChart.update();

}