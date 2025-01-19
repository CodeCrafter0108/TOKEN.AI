export const validateNumberInputValue = (value: string) => {
  let _value = value.replace(/[^0-9.]/g, '');
  const parts = _value.split('.');

  // If there are more than one decimal point, join all parts after the first one
  if (parts.length > 2) {
      _value = parts[0] + '.' + parts.slice(1).join('');
  }

  // Prevent input from being just a decimal point
  if (_value === '.') {
      _value = '';
  }

  // Prevent multiple leading zeros before the decimal point
  if (_value.startsWith('0') && !_value.startsWith('0.') && _value.length > 1) {
      _value = '0';
  }

  return _value;
}