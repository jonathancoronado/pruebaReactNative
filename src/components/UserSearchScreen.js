/**
 * Componente principal para la pantalla de búsqueda de usuarios.
 *
 * @component
 * @returns {React.Component} El componente principal.
 */

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import Collapsible from 'react-native-collapsible';
import ErrorComponent from './ErrorComponent';
import { validateSearchText } from '../utils/validation';
import { fetchUserData } from '../utils/api';
import { BarChart } from 'react-native-charts-wrapper';
import styles from '../styles/UserSearchScreenStyles';

/**
 * Componente principal para la pantalla de búsqueda de usuarios.
 *
 * @component
 * @returns {React.Component} El componente principal.
 */
const UserSearchScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [chartDataX, setChartDataX] = useState([]);
  const [chartDataY, setChartDataY] = useState([]);
  const [isResultsCollapsed, setResultsCollapsed] = useState(true);
  const [isChartCollapsed, setChartCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);

  /**
   * Maneja la búsqueda de usuarios.
   */
  const handleSearch = async () => {
    setError('')
    setLoading(true)
    // Validaciones
    if (!validateSearchText(username)) {
      setLoading(false)
      setError('El nombre de usuario debe tener al menos 4 caracteres y no puede ser "doublevpartners".');
      return;
    }

    try {
      const data = await fetchUserData(username);
      let topUsers = data.items.slice(0, 10);

      for(var key in topUsers){
        const consult = await fetch(topUsers[key].url);
        const dataConsult = await consult.json();
        topUsers[key].totalFollowers = dataConsult.followers;
      }

      const dataChartY = topUsers.map(item => ({ y: item.totalFollowers }));
      const dataChartX = topUsers.map(item => (`${item.login}`));

      // Actualizar el estado con los resultados y los datos de seguidores
      setSearchResults(topUsers);
      setChartDataX(dataChartX);
      setChartDataY(dataChartY);
      setResultsCollapsed(false);

    } catch (error) {
      console.error('Error al buscar usuarios:', error);
    }finally{
      setLoading(false)
    }
  };

  /**
   * Navegar a la pantalla de perfil del usuario seleccionado.
   * @param {string} blockData - Bloque de datos del perfil.
   */
  const navigateToUserProfile = (blockData) => {
    navigation.navigate('UserProfile', { blockData });
  };

  // Efecto secundario para limpiar resultados cuando se desmonta el componente
  useEffect(() => {
    return () => {
      setSearchResults([]);
    };
  }, []);

  /**
   * Maneja el cambio de visibilidad de la pestaña de resultados.
   */
  const toggleResults = () => {
    setResultsCollapsed(!isResultsCollapsed);
    setChartCollapsed(true); // Asegúrate de colapsar la pestaña de gráficos
  };

  /**
   * Maneja el cambio de visibilidad de la pestaña de gráficos.
   */
  const toggleChart = () => {
    setChartCollapsed(!isChartCollapsed);
    setResultsCollapsed(true); // Asegúrate de colapsar la pestaña de resultados
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prueba Técnica Jonathan Coronado</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre de usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button title="Buscar" onPress={handleSearch}  />
      {loading && <ActivityIndicator size="big" color="#3498db" />}
      {error && <ErrorComponent errorMessage={error} />}
  
      {searchResults.length > 0 && (
        <TouchableOpacity onPress={toggleResults}>
          <Text style={styles.tabHeader}>Resultados</Text>
        </TouchableOpacity>
      )}
      {!isResultsCollapsed && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userItem} onPress={() => navigateToUserProfile(item)}>
              <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
              <View>
                <Text style={styles.username}>{`Nombre de Usuario: ${item.login}`}</Text>
                <Text>{`ID: ${item.id}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
  
      {searchResults.length > 0 && (
        <TouchableOpacity onPress={toggleChart}>
          <Text style={styles.tabHeader}>Gráficos</Text>
        </TouchableOpacity>
      )}
      {!isChartCollapsed && searchResults.length > 0 && (
        <ScrollView >
          <View>
            <BarChart
              style={styles.chart}
              data={{ dataSets: [{ label: "Seguidores", values: chartDataY }] }}
              xAxis={{ valueFormatter: chartDataX }}
            />
          </View>
        </ScrollView>
      )}

        {searchResults.length === 0 && (
          <Text style={styles.infoText}>Cuando realiza una búsqueda, puede elegir entre ver los resultados o el gráfico. Ambas opciones son colapsables, lo que permite expandirlas u ocultarlas según sea necesario.</Text>
        )}
  
      <Text style={styles.footer}>Presentado por: Jonathan Coronado - Ingeniero de sistemas</Text>
    </View>
  );
};


export default UserSearchScreen;