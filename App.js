import React, {useState, useEffect} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { View, Text, StyleSheet, Button, Alert, Modal, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {BarCodeScanner} from 'expo-barcode-scanner';
import axios from 'axios';
import { globalStyles } from './styles/global';
import ScannerScreen from './screens/scanner'
import IngredientScreen from './screens/ingredients';
import RecipeScreen from './screens/recipes';
//import LoginScreen from './screens/LoginScreen';
//import ActualHome from './screens/HomeScreen';

/*Everything installed:
npm install axios
the scanner thing
*/

const getFonts = () => Font.loadAsync({
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf')
  });

  //Home Screen
  // Not the actual home screen--simply used during testing to navigate between functionality
  function TestHome({ navigation }) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Home Screen</Text>
        <Button
          title="Go to Scan"
          onPress={() => navigation.navigate('Scanner')}
        />
        <Button
          title="Ingredients"
          onPress={() => navigation.navigate('Ingredients')}
        />
        <Button
          title="Recipe Generation"
          onPress={() => navigation.navigate('Recipes')}
        />
        {/*
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
        
        <Button
          title="Test"
          onPress={() => navigation.navigate('idk')}
    /> */}
      </View>
    )
  }

  //General packaging

  const Stack = createNativeStackNavigator();
  function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
    if (fontsLoaded) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="TestHome" component={TestHome} />
            <Stack.Screen options={{ headerShown: false }} name="Scanner" component={ScannerScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Ingredients" component={IngredientScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Recipes" component={RecipeScreen} />
            {/*<Stack.Screen name="Login" component={LoginScreen} />*/}
            {/*<Stack.Screen name="idk" component={ActualHome} />*/}
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <AppLoading
          startAsync= {getFonts}
          onFinish= {()=> setFontsLoaded(true)}
          onError= {()=> console.log('error')} 
        />
      );
    }
}

export default App;