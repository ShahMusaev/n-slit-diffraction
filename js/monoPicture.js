function drawMonoInterfPicture(wavelength, d, b, N, L) {

  function intensityFunction(x) {
    let e = 1e-6;
    let u = (Math.PI * b * x) / (wavelength * e * L);
    let q = (Math.PI * d * x) / (wavelength * e * L);
    return Math.pow(b, 2) * Math.pow(Math.sin(u) / u, 2) * Math.pow(Math.sin(N * q) / Math.sin(q), 2)
  }

  let labels = [];

    //
    // for (let i = 1.2  ; i >= -1.2  ; i -= 0.0005) {
    //     labels.push(i);
    // }


    for (let x = -3/2; x <= 3/2; x+=3/497) {
        labels.push(x);
    }

  let ctx = document.getElementById("interference_picture").getContext("2d"),
    width = document.getElementById('interference_picture').offsetWidth,
    height = document.getElementById('interference_picture').offsetHeight,
    intensities = [];

  ctx.clearRect(0, 0, width, height);

  labels.forEach(function(x) {
    intensities.push(intensityFunction(x))
  });

  let yStep = width / labels.length;

  let Max = intensities[labels.length / 2 ];
  // alert(Max);

  labels.forEach(function(x, index) {
    const yCoord = index * yStep;
    const alpha = intensities[index] / Max;

    const rgbaColor = rgbaFromRGB(Math.nmToRGB(wavelength), alpha);
    const rgbColor = convertRGBAtoRGB(rgbaColor);

    ctx.strokeStyle = 'rgba(' + rgbaColor.r + ', ' + rgbaColor.g + ', ' + rgbaColor.b + ', ' + rgbaColor.a + ')';
    // ctx.strokeStyle = 'rgb(' + rgbColor.r + ', ' + rgbColor.g + ', ' + rgbColor.b  + ')';
    ctx.beginPath();
    ctx.moveTo(yCoord, 0);
    ctx.lineTo(yCoord, width);
    ctx.closePath();
    ctx.stroke();
  });
  // prob.push(inmin, min);
  // alert(prob);
  // prob.pop();
  // prob.pop();
  // prob.push(inmax, max);
  // alert(prob);
  // alert(labels.length);
  // alert(labels.length / 2);

}