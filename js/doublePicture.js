function drawDoubleInterfPicture(wavelength1, wavelength2, d, b, N,  L) {

  function rgbMix(color1, color2) {
    let r = (color1.red + color2.red) / 2;
    let g = (color1.green + color2.green) / 2;
    let b = (color1.blue + color2.blue) / 2;
    let a = color1.alpha;

    return new RGBAColor(r, g, b, a);
  }

  function intensityFunction(x, length) {
    let e = 1e-6;
    let u = (Math.PI * b * x) / (length * e * L);
    let q = (Math.PI * d * x) / (length * e * L);
    return Math.pow(2, 2) * Math.pow(Math.sin(u) / u, 2) * Math.pow(Math.sin(N * q) / Math.sin(q), 2)
  }

  let labels = [];

  for (let x = -3/2; x <= 3/2; x+=3/496) {
    labels.push(x);
  }

  let ctx = document.getElementById("interference_picture").getContext("2d"),
      width = document.getElementById('interference_picture').offsetWidth,
      height = document.getElementById('interference_picture').offsetHeight,
      intensities1 = [],
      intensities2 = [];

  ctx.clearRect(0, 0, width, height);

  labels.forEach(function(x) {
    intensities1.push(intensityFunction(x, wavelength1));
    intensities2.push(intensityFunction(x, wavelength2));
  });

  let yStep = width / labels.length;

  let Max1 = intensities1[labels.length / 2 ];
  let Max2 = intensities2[labels.length / 2 ];

  // alert(labels.length);
  // alert(Max);


  labels.forEach(function(x, index) {
    const yCoord = index * yStep;
    const alpha1 = intensities1[index] / Max1;
    const alpha2 = intensities2[index] / Max2;
    let color1 = Math.nmToRGB2(wavelength1);


    color1 = rgbaFromRGB(color1);
    color1.a = alpha1;

    let color2 = Math.nmToRGB(wavelength2);


    color2 = rgbaFromRGB(color2);
    color2.a = alpha2;

    // let color = rgbMix(color1, color2, alpha(x, wavelength1), alpha(x, wavelength2));
    // ctx.strokeStyle = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';

    let color = blendTwoColors(color2, color1);
    ctx.strokeStyle = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';
    ctx.beginPath();
    ctx.moveTo(yCoord, 0);
    ctx.lineTo(yCoord, width);
    ctx.closePath();
    ctx.stroke();
  });
}