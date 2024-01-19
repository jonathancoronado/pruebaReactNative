/**
 * Función para obtener datos de un usuario de GitHub.
 *
 * @async
 * @function
 * @param {string} username - Nombre de usuario de GitHub.
 * @throws {Error} Si hay un error al obtener los datos del usuario.
 * @returns {Promise<Object>} Datos del usuario.
 */

import Config from 'react-native-config';

/**
 * Función para obtener datos de un usuario de GitHub.
 *
 * @async
 * @function
 * @param {string} username - Nombre de usuario de GitHub.
 * @throws {Error} Si hay un error al obtener los datos del usuario.
 * @returns {Promise<Object>} Datos del usuario.
 */
export const fetchUserData = async (username) => {
   // Realizar la búsqueda en la API de GitHub
   try {
    //const response = await fetch(`${Config.REACT_APP_GITHUB_API_URL}users?q=${username}`);
    const response = await fetch(`https://api.github.com/search/users?q=${username}`);
    const data = await response.json();

    return data;
  } catch (error) {
    setError('Error al buscar usuarios. Inténtalo de nuevo.');
  }
};
