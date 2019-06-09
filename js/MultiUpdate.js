


    MN1.onmousemove = function() {
        document.getElementById("labelN").innerText = "Количество щелей:" ;
        updateChart();
    };

    LambdaUP.onmousemove = function () {
        document.getElementById("labelLambda1").innerText = "Верхняя граница диапазона длин волн (нм):"  ;
        updateChart();
    };

    LambdaDOWN.onmousemove = function () {
        document.getElementById("labelLambda2").innerText = "Нижняя граница диапазона длин волн (нм):"  ;
        updateChart();
    };

    MA1.onmousemove = function () {
        document.getElementById("labelA").innerText = "Ширина щели (мкм):"  ;
        updateChart();
    };

    MB1.onmousemove = function () {
        document.getElementById("labelB").innerText = "Период решетки (мкм):";
        updateChart();
    };

    L1.onmousemove = function () {
        document.getElementById("Length").innerText = "Расстояние до экрана (м):" ;
        updateChart();
    };

    window.onload = function () {
        drowChart();
    };

