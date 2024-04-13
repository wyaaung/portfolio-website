// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const { replace } = '';

// escape
const ca = /[&<>'"]/g;

const esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  // eslint-disable-next-line quotes
  "'": '&#39;',
  '"': '&quot;',
};
const pe = (m: keyof typeof esca) => esca[m];

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
export const escape = (es: string): string => replace.call(es, ca, pe);
