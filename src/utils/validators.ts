export function isValidEmail(value: string): boolean {
  const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  return re.test(String(value).toLowerCase());
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isPositiveNumberString(value: string): boolean {
  return /^\d+(\.\d+)?$/.test(value) && Number(value) > 0;
}

