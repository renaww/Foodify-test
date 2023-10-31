import React, {useState, useEffect} from 'react';
import { View, Text, Button, Alert, Modal, Pressable, Image, SafeAreaView, ScrollView, StatusBar, TouchableHighlight, Linking } from 'react-native';
import axios from 'axios';
import { globalStyles } from '../styles/global';
import { Controller } from 'react-hook-form';
import { IconButton, Colors } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function RecipeScreen({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const searchUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=14df07f651264f59b126879a7b5ca7e9&ranking=2&number=10&ingredients=`;
    const key = '14df07f651264f59b126879a7b5ca7e9';
    const allIngredients = ['tomatoes','corn','onions','eggs'];
    const constraints = ['dairyFree', 'cheap', 'vegetarian']
    //health = health score under a certain amount, can be user set??

    var ingredientUrl = searchUrl;
    
    for (var i=0; i < allIngredients.length; i++) {
        if (i == 0) {
            ingredientUrl = ingredientUrl.concat(allIngredients[i])
        } else {
            ingredientUrl = ingredientUrl.concat(',+' + allIngredients[i]);
        }
    }
   
    const [data, setData] = useState([])
    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();
        async function getRecipes() {
            try {
                const raw = await fetch(ingredientUrl, {signal: controller.signal})
                const response = await raw.json()
                if(!raw.ok) throw new Error ('error')
                if(mounted) {
                    setData(response)
                }
            }
            catch (e) {console.log(e)}
        };
        getRecipes();
        return () => {
            controller.abort()
            mounted = false
        }
    }, []);

    function getDetails(id, missedIngredients) {
        let details = {};
        let mounted = true;
        const controller = new AbortController();
        async function apiDetails() {
            try {
                const url = 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=14df07f651264f59b126879a7b5ca7e9'
                const raw = await fetch(url, {signal: controller.signal})
                let response = await raw.json()
                if(!raw.ok) {
                    throw new Error ('error')
                }
                if(mounted) {
                    renderDetails(response, missedIngredients)
                }
            }
            catch (e) {console.log(e)};
        };
        apiDetails();
        return () => {
            controller.abort()
            mounted = false
        }
    }

    function renderDetails(info, missedIngredients) {
        setModalVisible(true);
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={globalStyles.modal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={globalStyles.centeredView}>
                    <View style={globalStyles.modalView}>
                        <Text style={globalStyles.h3}>{info.title}</Text>
                        <Text style={globalStyles.paragraph}>There are {missedIngredients} missed ingredients</Text>
                    </View>
                </View>
            </Modal>
        );
        
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView style={globalStyles.scrollView}>
            <Text style={globalStyles.h1}>Your Recipes</Text>
            <View style={globalStyles.recipeDetails}>
                <Button style={[globalStyles.filterButton, globalStyles.buttonClose]} title="Ingredients"></Button>
                <Button style={globalStyles.filterButton} title="Preferences"></Button>
            </View>
            {data.map(recipe => {  
                var id = recipe.id
                return (
                    <>
                    <View style={globalStyles.recipeCard}>
                        <Text style={globalStyles.recipeTitle}>{recipe.title}</Text>
                        <View style={globalStyles.recipeDetails}>
                            <Image
                                style={globalStyles.recipeImage}
                                source={{uri: `${recipe.image}`}}
                            />
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                style={globalStyles.modal}
                                onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={globalStyles.centeredView}>
                                    <View style={globalStyles.ingredientSpecs}>
                                        <Text style={globalStyles.h3}>Sun Dried Tomato and Herb Baked Eggs</Text>
                                        <Text style={globalStyles.h6}>Here's how this recipe aligns with your preferences:</Text>
                                        <Text style={{fontSize: 7}}>{' '}</Text>
                                        <Text style={globalStyles.yesParagraph}>Vegetarian: YES</Text>
                                        <Text style={globalStyles.noParagraph}>Cheap: NO</Text>
                                        <Text style={globalStyles.yesParagraph}>Gluten Free: YES</Text>
                                        <Text style={{fontSize: 7}}>{' '}</Text>
                                        <Text style={globalStyles.h6}>Some more information:</Text>
                                        <Text style={globalStyles.recipeSummary}>This recipe is 4 Weight Watcher Smart Points
                                        and has 179 calories, as well as 12g of protein. It will take approx. 25 minutes to prep.</Text>
                                        <Text style={{fontSize: 7}}>{' '}</Text>
                                        <Text style={globalStyles.h6}>There are 2 missing ingredients</Text>
                                        <Text style={globalStyles.h4}>Sound good? Click the image below to get started</Text>
                                        <TouchableHighlight 
                                            onPress={() => Linking.openURL('https://spoonacular.com/sun-dried-tomato-and-herb-baked-eggs-662276')}>
                                        <Image 
                                            source={{uri: 'https://spoonacular.com/recipeImages/662276-312x231.jpg'}} 
                                            style={{height:75, width:150, marginTop: 10}} />
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                            <IconButton
                                icon="arrow-right-circle"
                                color="#332E3C"
                                size={40}
                                style={globalStyles.arrowIcon}
                                onPress={() => {setModalVisible(true), getDetails(id, recipe.missedIngredientCount)}}
                            />
                        </View>
                    </View>
                    </>   
                );
            })}
            <Text style={globalStyles.paragraph}>Didn't find what you're looking for? Click here to search again</Text>
            
            </ScrollView>
        </SafeAreaView>
      )
};