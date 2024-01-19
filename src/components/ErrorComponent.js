/**
 * Componente para mostrar mensajes de error.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.errorMessage - Mensaje de error a mostrar.
 * @returns {React.Component} El componente de mensajes de error.
 */

import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/ErrorStyles';

/**
 * Componente para mostrar mensajes de error.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.errorMessage - Mensaje de error a mostrar.
 * @returns {React.Component} El componente de mensajes de error.
 */
const ErrorComponent = ({ errorMessage }) => {
  return (
    <View>
      <Text style={styles.error}>¡ERROR!: {errorMessage}</Text>
    </View>
  );
};

export default ErrorComponent;
