const deviceSizes = {
  mobile5: 320,
  mobile4: 360,
  mobile3: 480,
  mobile2: 768,
  mobile: 968,
  tablet: 1040,
  desktop2: 1380,
  desktop: 1720,
};

const device = {
  mobile: `(max-width : ${deviceSizes.mobile}px)`,
  mobile2: `(max-width : ${deviceSizes.mobile2}px)`,
  mobile3: `(max-width : ${deviceSizes.mobile3}px)`,
  mobile4: `(max-width : ${deviceSizes.mobile4}px)`,
  mobile5: `(max-width : ${deviceSizes.mobile5}px)`,
  tablet: `(max-width : ${deviceSizes.tablet}px)`,
  desktop2: `(max-width : ${deviceSizes.desktop2}px)`,
  desktop: `(max-width : ${deviceSizes.desktop}px)`,
};

const theme = {
  deviceSizes,
  device,
};

export default theme;
