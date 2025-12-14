// utils/validators.js
// validators used across backend - Editor: Tomas Galea

function isValidPhone(phone) {
  if (!phone) return false;
  return /^[0-9]{7,15}$/.test(String(phone));
}

function isValidIdNumber(id) {
  if (!id) return false;
  return /^[0-9A-Za-z\-]{3,20}$/.test(String(id));
}

module.exports = { isValidPhone, isValidIdNumber };
