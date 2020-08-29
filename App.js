/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  
  StyleSheet,
  
  View,
  Text,
  
} from 'react-native';



const App: () => React$Node = () => {
  return (
    <View>
      <Text style={styles.text}>Dolar App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default App;
