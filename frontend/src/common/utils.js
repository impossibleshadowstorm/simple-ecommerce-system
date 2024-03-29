export function currencyFormat(num) {
  return parseFloat(`${num}`)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function calcCartItemSum(cartItems) {
  const sum = cartItems.reduce((prev, item) => {
    const qty = item.quantity;
    return prev + qty;
  }, 0);
  return Math.round(sum);
}

export function calcCartItemTotalPrice(cartItems) {
  const sum = cartItems.reduce((prev, item) => {
    const qty = item.quantity;
    const unitPrice = parseFloat(item.price);
    const total = qty * unitPrice;
    return prev + total;
  }, 0);
  return roundAt2DecimalPlaces(sum);
}

export function roundAt2DecimalPlaces(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

export function isInDesiredForm(str) {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}

export function upperCaseEachWord(str) {
  return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}

export function checkIsValidInteger(str) {
  return /^[0-9]+$/.test(str);
}
