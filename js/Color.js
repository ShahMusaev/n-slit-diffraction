class RGBAColor {

  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

class RGBColor {

  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

const BG_COLOR = new RGBAColor(0, 0, 0, 1);

function colorNormalization(color) {
  const maxValue = 255;

  /*
    Clone object in order to save all other
    properties (e.g. if a RGBA color was passed)
    and to avoid argument modification
   */
  const normalizeColor = Object.assign({}, color);

  normalizeColor.r /= maxValue;
  normalizeColor.g /= maxValue;
  normalizeColor.b /= maxValue;

  return normalizeColor;
}

function normalizedColorToNormal(normalizedColor) {
  const maxValue = 255;

  /*
    Clone object in order to save all other
    properties (e.g. if a RGBA color was passed)
    and to avoid argument modification
   */
  const color = Object.assign({}, normalizedColor);

  color.r *= maxValue;
  color.g *= maxValue;
  color.b *= maxValue;

  return color;
}

function convertRGBAtoRGB(sourceColor, backgroundColor = BG_COLOR) {
  const normalizedSrcColor = colorNormalization(sourceColor);
  const normalizedBgColor = colorNormalization(backgroundColor);
  const bgAlpha = normalizedBgColor.a;
  const srcAlpha = normalizedSrcColor.a;

  const r = ((1 - bgAlpha) * normalizedBgColor.r) + (srcAlpha * normalizedSrcColor.r);
  const g = ((1 - bgAlpha) * normalizedBgColor.g) + (srcAlpha * normalizedSrcColor.g);
  const b = ((1 - bgAlpha) * normalizedBgColor.b) + (srcAlpha * normalizedSrcColor.b);

  const rgbColor = new RGBColor(r, g, b);

  return normalizedColorToNormal(rgbColor);
}

function rgbaFromRGB(rgbColor, alpha = 1) {
  return new RGBAColor(rgbColor.r,
    rgbColor.g,
    rgbColor.b,
    alpha
  );
}

// private
function blend2Colors(fgColor, bgColor) {
  const fg = colorNormalization(fgColor);
  const bg = colorNormalization(bgColor);

  const newColor = new RGBAColor();

  newColor.a = 1 - (1 - fg.a) * (1 - bg.a);
  newColor.r = fg.r * fg.a / newColor.a + bg.r * bg.a * (1 - fg.a) / newColor.a;
  newColor.g = fg.g * fg.a / newColor.a + bg.g * bg.a * (1 - fg.a) / newColor.a;
  newColor.b = fg.b * fg.a / newColor.a + bg.b * bg.a * (1 - fg.a) / newColor.a;

  return normalizedColorToNormal(newColor);
}

function blendTwoColors(fgColor, bgColor) {
  const newColor = blend2Colors(fgColor, bgColor);

  return blend2Colors(newColor, BG_COLOR)
}

function blendColors(colors) {
  let stageColor = colors[0];

  for (let i = 1; i <= colors.length - 1; i++) {
    stageColor = blend2Colors(colors[i], stageColor);
  }

  return blend2Colors(stageColor, BG_COLOR)
}