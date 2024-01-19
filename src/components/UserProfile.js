/**
 * Componente para mostrar el perfil de un usuario.
 *
 * @component
 * @param {Object} route - Objeto de ruta de React Navigation.
 * @param {Object} route.params - Parámetros de la ruta.
 * @param {string} route.params.blockData - Datos de usuario.
 * @returns {React.Component} El componente del perfil del usuario.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/UserProfileStyles';

/**
 * Componente para mostrar el perfil de un usuario.
 *
 * @component
 * @param {Object} route - Objeto de ruta de React Navigation.
 * @param {Object} route.params - Parámetros de la ruta.
 * @param {Object} route.params.blockData - Datos de usuario.
 * @returns {React.Component} El componente del perfil del usuario.
 */
const UserProfile = ({ route }) => {
  const { blockData } = route.params;
  const [additionalUserData, setAdditionalUserData] = useState(null);

  useEffect(() => {
    const fetchAdditionalUserData = async () => {
      try {
        const response = await fetch(blockData.url);
        const data = await response.json();
        setAdditionalUserData(data);
      } catch (error) {
        console.error('Error fetching additional user data:', error);
      }
    };

    fetchAdditionalUserData();
  }, [blockData.url]);

  if (!additionalUserData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: blockData.avatar_url }} style={styles.avatar} />
      <Text style={styles.username}>{`Login: ${blockData.login}`}</Text>
      <Text style={styles.additionalInfo}>{`Nombre: ${additionalUserData.name || 'N/A'}`}</Text>
      <Text style={styles.additionalInfo}>{`Compañia: ${additionalUserData.company || 'N/A'}`}</Text>
      <Text style={styles.additionalInfo}>{`Seguidores: ${additionalUserData.followers || 0}`}</Text>
    </View>
  );
};

export default UserProfile;
