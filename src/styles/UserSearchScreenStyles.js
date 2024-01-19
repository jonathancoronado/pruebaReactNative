// UserSearchScreenStyles.js

import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#3498db',
    backgroundColor: 'white',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50, 
    height: 70, 
    borderRadius: 35, 
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14, 
    color: (index) => (index % 2 === 0 ? 'gray' : 'black'),
  },
  footer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
    marginTop: 20,
  },
  chart: {
    height: window.height * 0.5,
    width: '100%',
  },
  tabHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: 10,
  },
});
