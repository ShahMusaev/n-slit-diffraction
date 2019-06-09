function drawMultiInterfPicture(wavelengthLowerBorder, wavelengthUpperBorder, d, L, wavelengthDelta, b, N) {

  function rgbMix(colors) {
    let r = 0,
        g = 0,
        b = 0;

    colors.forEach( function (color) {
      r += color.r;
      g += color.g;
      b += color.b;

    });

    r /= colors.length;
    g /= colors.length;
    b /= colors.length;

    return new RGBColor(r, g, b);
  }

  const coefficient = Number((24.35 - 0.1 * (L * 1e-3)) / 17).toFixed(2);

  function alpha(x, length) {
    const e = 1e-6;

    let u = (Math.PI * b * x) / (length * e * L);
    let q = (Math.PI * d * x) / (length * e * L);
    return Math.pow( b, 2) * Math.pow(Math.sin(u) / u, 2) * Math.pow(Math.sin(N * q) / Math.sin(q), 2) ;
  }
  let labels = [];

  for (let x = -3/2; x <= 3/2; x+=3/496) {
    labels.push(x);
  }

  const ctx = document.getElementById("interference_picture").getContext("2d"),
      width = document.getElementById('interference_picture').offsetWidth,
      height = document.getElementById('interference_picture').offsetHeight;

  ctx.clearRect(0, 0, width, height);

  const yStep = width / labels.length;
  let al, max =0;




  labels.forEach(function(x, index) {
    const yCoord = index * yStep;

    let colors = [];


    for (let i = wavelengthLowerBorder; i <= wavelengthUpperBorder; i += wavelengthDelta) {

      let alp = alpha(x, i) ;
      if(alp > 1){
        alp = 1;
      }
      const currentColor = Math.nmToRGB(i);
      const currentAlpha = alp ;

      const sourceRGBAColor = rgbaFromRGB(currentColor, currentAlpha);

      let rgbColor = convertRGBAtoRGB(sourceRGBAColor);
      colors.push(rgbColor);
    }

    let color = rgbMix(colors);
    // const  color = blendColors(colors);
    // const color = blendColors2(colors);

    // if (Number((x).toFixed(1)) === 0.0) {
    //   console.log(color);
    //   // color.b = 255;
    // }

    ctx.strokeStyle = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
    // ctx.strokeStyle = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';
    ctx.beginPath();
    ctx.moveTo(yCoord, 0);
    ctx.lineTo(yCoord, width);
    ctx.closePath();
    ctx.stroke();
  });

}