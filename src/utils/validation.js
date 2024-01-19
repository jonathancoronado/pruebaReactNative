/**
 * Función para validar el texto de búsqueda.
 *
 * @function
 * @param {string} text - Texto a validar.
 * @returns {boolean} true si el texto es válido, false de lo contrario.
 */

/**
 * Función para validar el texto de búsqueda.
 *
 * @function
 * @param {string} text - Texto a validar.
 * @returns {boolean} true si el texto es válido, false de lo contrario.
 */
export const validateSearchText = (text) => {
    return text.length >= 4 && text.toLowerCase() !== 'doublevpartners';
  };
  