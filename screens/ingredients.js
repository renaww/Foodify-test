import React, {useState, useEffect} from 'react';
import { View, Text, Button, Alert, Modal, Pressable, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';
import { useForm } from "react-hook-form";

export default function IngredientScreen({ navigation }) {
    const [modalVisible, setModalVisible, modal2Visible] = useState(false);
    const [text, setText] = useState(' ');
    const { watch, formState: { errors } } = useForm();
    const [ingredientsPair, setIngredientPair] = useState({ingredient: "", category: "", delete: ""});
    const { register, handleSubmit,  reset } = useForm({
      defaultValues: ingredientsPair,
    });

    //List out ingredients with categories? Prepopulated for now
    var ingredientList = [
        {
            category: "Cooking & Baking Ingredients",
            items: ["Flour"]
        },
        {
            category: "Dips & Spreads",
            items: ["Cheese"]
        },
        {
            category: "Fresh & Frozen Fruits",
            items: ["Oranges", "Apples"]
        },
        {
            category: "Fresh & Frozen Vegetables",
            items: ["Tomatoes", "Corn", "Onions"]
        },
        {
            category: "General Fruits & Vegetables",
            items: ["Pinto Beans"]
        },
        {
            category: "Meat, Seafood, & Eggs",
            items: ["Chicken Breasts"]
        },
        {
            category: "Grains, Rice & Cereal",
            items: ["Millet"]
        },
    ];

    function prefill(given) {
      for (let item of ingredientList) {
        for (var i=0; i < item.items.length; i++) {
          if (given == item.items[i]) {
            var givenCategory = item.category;
            break
          } 
        }
      }
      var prefillObject = {
        ingredient: given,
        category: givenCategory,
        delete: "No"
      }
      setIngredientPair(prefillObject);
      reset(prefillObject);
    }
    
    function RenderButtons() {
      return ingredientList.map(buttonInfo => (
        <>
          <Text style={globalStyles.categoryTitle}>{buttonInfo.category}</Text>
          {buttonInfo.items.map((item) => {
            var orginalIngredient = item;
            return (
              <View>
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
                        <form onSubmit={handleSubmit(editIngredient)} style={{margin: 10}}>
                          <label style={{fontSize: 12, fontWeight: 'bold', color: '#333', fontFamily: 'raleway-bold',}}>
                            Are you deleting this ingredient?
                          </label>
                          <select {...register("delete")} style={{fontFamily: 'raleway-regular'}}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <Text>{'\n'}</Text>
                          <Text style={globalStyles.h6}>Edit your ingredient here</Text>
                          <input 
                            {...register("ingredient")}
                            style={{fontFamily: 'raleway-regular'}} 
                            placeholder="Input your ingredient"
                          />
                          <select {...register("category")} style={{fontFamily: 'raleway-regular'}}>
                            <option value="Condiments & Sauces">Condiments & Sauces</option>
                            <option value="Cooking & Baking Ingredients">Cooking & Baking Ingredients</option>
                            <option value="Dips & Spreads">Dips & Spreads</option>
                            <option value="Fresh & Frozen Fruits">Fresh & Frozen Fruits</option>
                            <option value="Fresh & Frozen Vegetables">Fresh & Frozen Vegetables</option>
                            <option value="General Fruits & Vegetables">General Fruits & Vegetables</option>
                            <option value="Grains, Rice & Cereal">Grains, Rice & Cereal</option>
                            <option value="Meat, Seafood, & Eggs">Meat, Seafood, & Eggs</option>
                          </select>
                          <Pressable
                          style={[globalStyles.button, globalStyles.buttonClose]}
                          onPress={handleSubmit(editIngredient)}
                          type="submit"
                          >
                            <Text style={globalStyles.buttonText}>Submit</Text>
                          </Pressable>
                        </form>
                      </View>
                    </View>
                  </Modal>
                  <Pressable
                    style={[globalStyles.indButton, globalStyles.buttonOpen]}
                    onPress={() => {setModalVisible(true); prefill(item)}}
                  >
                    <Text style={globalStyles.buttonText} key={item}>{item}</Text>
                  </Pressable>
                </View>
            );
          })}
        </>
      ));
    }

    const editIngredient = (data) => {
      setModalVisible(!modalVisible)
      ingredientList.forEach(item => {
        if (data.category == item.category) {
          for (var i=0; i < item.items.length; i++) {
            if (data.ingredient == item.items[i]) {
              if (data.delete == "Yes") {
                //Change to connect with users
                item.items.splice(i,1);
                alert(item.items);
                break
              } else {
                //edit ingredient
                break
              }
            }
          }
        }
      })

    };

    const addIngredient = (data) => {
      setModalVisible(!modalVisible)
      var newCategory= 0;
      ingredientList.forEach(item => {
        if (data.category == item.category) {
          item.items.push(data.ingredient);
          newCategory = 1;
        } 
      })
      if (newCategory == 0) {
        var newObject = {
          category: data.category,
          items: [data.item]
        }
        ingredientList.push(newObject);
      }
      //Change code to update to user profile
      //Update the display
    };

    //Button must be able to select category as well
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.h1}>Your Ingredients</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={globalStyles.centeredView}>
            <View style={globalStyles.modalView}>
              <Text style={globalStyles.h6}>Add a new ingredient</Text>
              <form onSubmit={handleSubmit(addIngredient)}>
                <input {...register("ingredient")} placeholder="Input your ingredient"/>
                <select {...register("category")}>
                  <option value="Condiments & Sauces">Condiments & Sauces</option>
                  <option value="Cooking & Baking Ingredients">Cooking & Baking Ingredients</option>
                  <option value="Dips & Spreads">Dips & Spreads</option>
                  <option value="Fresh & Frozen Fruits">Fresh & Frozen Fruits</option>
                  <option value="Fresh & Frozen Vegetables">Fresh & Frozen Vegetables</option>
                  <option value="Grains, Rice & Cereal">Grains, Rice & Cereal</option>
                </select>
                <Pressable
                style={[globalStyles.button, globalStyles.buttonClose]}
                onPress={handleSubmit(addIngredient)}
                type="submit"
                >
                  <Text style={globalStyles.buttonText}>Submit</Text>
                </Pressable>
              </form>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[globalStyles.button, globalStyles.buttonClose]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={globalStyles.buttonText}>Add Ingredient</Text>
        </Pressable>
        
        <Text style={globalStyles.paragraph}>Tap on any ingredient to edit or delete it</Text>
        <View>
          { RenderButtons() }
        </View>
      </View>
    );
  };