// UserProfileStyles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1', // Azul muy claro
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  additionalInfo: {
    fontSize: 24,
    marginBottom: 10,
  },
});
