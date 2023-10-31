import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Pressable} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import axios from 'axios';
import { globalStyles } from '../styles/global';

export default function ScannerScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const baseUrl = 'https://api.upcitemdb.com/prod/trial/lookup?upc=';
    const key = '14df07f651264f59b126879a7b5ca7e9';
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      var newData = data;
      console.log(data);
      //Convert EAN to UPC
      if (type == 'org.gs1.EAN-13') {
        newData = data.substring(1,13)
      }
      //API fetching
      axios({
        method: "get",
        url: `${baseUrl}${newData}`,
      }).then((response) => {
        var categoryString = 'temp';
        response.data.items.forEach(item => {
          categoryString = item.category;
        });
        var lastInd = categoryString.lastIndexOf('>');
        var newItem = categoryString.substring(lastInd+2, categoryString.length);
        if (newItem == 'emp') {
          alert(`Oops! Our database doesn't have that item. Please go to the 'ingredients' page and manually add it!`)
        } else {
          alert(`Added ${newItem} to your ingredients list!`);
        }
        //Actually connect to the user profile
        //Make a dictionary that stores category (?)
      }).catch((error) => {
        console.log(error);
      });
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={globalStyles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          //Change stylesheet later
          style={StyleSheet.absoluteFillObject}
        />
        {scanned &&
        <View style={globalStyles.centeredView}> 
          <Pressable style={globalStyles.smallButton} onPress={() => setScanned(false)}>
            <Text style={globalStyles.buttonText}>Tap to Scan Again</Text>
          </Pressable>
          <Pressable style={globalStyles.smallButton}>
            <Text style={globalStyles.buttonText}>View Current Ingredients</Text>
          </Pressable>
        </View>
        }
      </View>
    );
}