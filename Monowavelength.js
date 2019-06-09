/**
 * Helper method to convert a wavelength value for a given color and
 * produce an RGB representation of it.
 * E.g. 484nm = rgb(0, 224, 255) = #00E0FF
 *
 * This method has been added as a static method on the Math object.
 *
 * - (Number[]) nmToRGB : (Number) wavelength
 *
 * @param wavelength The wavelength of to convert to RGB.
 * @return Object keys: red, green, blue
 *
 * <code>
 * >
 * > Math.nmToRGB(484);
 * > {
 * > 	red: 0,
 * > 	green: 224,
 * > 	blue: 255
 * > }
 * >
 * </code>
 *
 */
(function (namespace, methodName) {
  window[namespace][methodName] = function (wavelength) {
    let w = parseInt(wavelength, 10),
        SSS,
        R,
        G,
        B;

    if (w >= 380 && w < 440) {
      R = -(w - 440.0) / (440.0 - 350.0);
      G = 0.0;
      B = 1.0;
    } else if (w >= 440 && w < 490) {
      R = 0.0;
      G = (w - 440.0) / (490.0 - 440.0);
      B = 1.0;
    } else if (w >= 490 && w < 510) {
      R = 0.0;
      G = 1.0;
      B = -(w - 510.0) / (510.0 - 490.0);
    } else if (w >= 510 && w < 580) {
      R = (w - 510.0) / (580.0 - 510.0);
      G = 1.0;
      B = 0.0;
    } else if (w >= 580 && w < 645) {
      R = 1.0;
      G = -(w - 645.0) / (645.0 - 580.0);
      B = 0.0;
    } else if (w >= 645 && w <= 780) {
      R = 1.0;
      G = 0.0;
      B = 0.0;
    } else {
      R = 0.0;
      G = 0.0;
      B = 0.0;
    }

    if (w >= 380 && w < 420) {
      SSS = 0.3 + 0.7 * (w - 350) / (420 - 350);
    } else if (w >= 420 && w <= 700) {
      SSS = 1.0;
    } else if (w > 700 && w <= 780) {
      SSS = 0.3 + 0.7 * (780 - w) / (780 - 700);
    } else {
      SSS = 0.0;
    }

    SSS *= 255;

    return new RGBColor(parseInt(SSS * R, 10),
        parseInt(SSS * G, 10),
        parseInt(SSS * B, 10)
    );
  };
}("Math", "nmToRGB"));

(function (namespace, methodName) {
  window[namespace][methodName] = function (wavelength) {
    let w = parseInt(wavelength, 10),
        SSS,
        R,
        G,
        B;

    if (w >= 380 && w < 440)
    {
      R   = -(w - 440) / (440 - 380);
      G = 0.0;
      B  = 1.0;
    }
    else if (w >= 440 && w < 490)
    {
      R   = 0.0;
      G = (w - 440) / (490 - 440);
      B  = 1.0;
    }
    else if (w >= 490 && w < 510)
    {
      R   = 0.0;
      G = 1.0;
      B  = -(w - 510) / (510 - 490);
    }
    else if (w >= 510 && w < 580)
    {
      R   = (w - 510) / (580 - 510);
      G = 1.0;
      B  = 0.0;
    }
    else if (w >= 580 && w < 645)
    {
      R   = 1.0;
      G = -(w - 645) / (645 - 580);
      B  = 0.0;
    }
    else if (w >= 645 && w < 781)
    {
      R   = 1.0;
      G = 0.0;
      B  = 0.0;
    }
    else
    {
      R   = 0.0;
      G = 0.0;
      B  = 0.0;
    }

    // Let the intensity fall off near the vision limits

    let factor = 0.0;

    if (w >= 380 && w < 420)
      factor = 0.3 + 0.7*(w - 380) / (420 - 380);
    else if (w >= 420 && w < 701)
      factor = 1.0;
    else if (w >= 701 && w < 781)
      factor = 0.3 + 0.7*(780 - w) / (780 - 700);

    const gamma = 0.80;
    const red = (R > 0 ? 255 * Math.pow(R * factor, gamma) : 0);
    const green = (G > 0 ? 255 * Math.pow(G * factor, gamma) : 0);
    const blue = (B > 0 ? 255 * Math.pow(B * factor, gamma) : 0);

    return new RGBColor(red, green, blue);
  };
}("Math", "nmToRGB2"));