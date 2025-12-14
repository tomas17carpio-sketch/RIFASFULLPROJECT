// client-side validators - Editor: Tomas Galea
export function isValidPhone(phone) {
  return /^[0-9]{7,15}$/.test(String(phone||''));
}
export function isValidIdNumber(id) {
  return /^[0-9A-Za-z\-]{3,20}$/.test(String(id||''));
}
