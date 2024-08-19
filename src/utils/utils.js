export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

export function getItemTypeByKey(key) {
  if (key === 'email') {
    return 'email';
  }
  if (key === 'location') {
    return 'location';
  }
  if (key === 'company') {
    return 'company';
  }
  return 'website';
}

export function delay(wait = 3) {
  return new Promise((resolve) => {
    setTimeout(resolve, wait * 1000);
  });
}
