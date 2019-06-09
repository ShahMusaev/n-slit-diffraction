


    N1.onmousemove = function() {
        document.getElementById("labelN").innerText = "Количество щелей:";
        updateChart();
    };

    Lambda1.onmousemove = function () {
        document.getElementById("labelLambda1").innerText = "Длина первой волны (нм):" ;
        updateChart();
    };

    Lambda2.onmousemove = function () {
        document.getElementById("labelLambda2").innerText = "Длина второй волны (нм):" ;
        updateChart();
    };

    A1.onmousemove = function () {
        document.getElementById("labelA").innerText = "Ширина щели (мкм):" ;
        updateChart();
    };

    B1.onmousemove = function () {
        document.getElementById("labelB").innerText = "Период решетки (мкм):" ;
        updateChart();
    };

    L1.onmousemove = function () {
        document.getElementById("Length").innerText = "Расстояние до экрана (м):";
        updateChart();
    };

    window.onload = function () {
        drowChart();
    };

