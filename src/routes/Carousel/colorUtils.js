/**
 * @author Anton Belousov
 * @since 0.0.1-SNAPSHOT
 */

export function toRgba(hex, a) {
  hex = prepareHex(hex);

  const r = parseInt(hex.slice(0, 2), 16).toString();
  const g = parseInt(hex.slice(2, 4), 16).toString();
  const b = parseInt(hex.slice(4, 6), 16).toString();

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function toOppositeHex(hex) {
  hex = prepareHex(hex);

  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function prepareHex(hex) {
  hex = hex || '#000';
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length > 6) {
    hex = hex.substring(0, 6);
  } else if (hex.length < 6) {
    hex += '0'.repeat(6 - hex.length);
  }

  return hex;
}

function padZero(str, len) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}
