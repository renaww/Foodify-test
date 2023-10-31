import { StyleSheet } from 'react-native';
import { withOrientation } from 'react-navigation';

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'raleway-bold',
  },

  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'raleway-bold',
  },

  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'raleway-bold',
  },

  h3: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#332E3C',
    fontFamily: 'raleway-bold',
  },

  h4: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'raleway-bold',
  },

  h6: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'raleway-bold',
  },

  categoryTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#332E3C',
    fontFamily: 'raleway-bold',
    marginTop: 15,
  },

  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
    fontFamily: 'raleway-regular',
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  modalView: {
    margin: 10,
    backgroundColor: "#FFF3EB",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    /*shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,*/
    elevation: 5,
    width: 250,
  },

  ingredientSpecs: {
    margin: 10,
    backgroundColor: "#C0A587",
    borderRadius: 20,
    padding: 20,
    //alignItems: "center",
    elevation: 5,
    width: 300,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  buttonText: {
    color: "white",
    fontFamily: 'raleway-bold',
    textAlign: "center",
    fontSize: 16,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    backgroundColor: "#9AC1AF",
  },

  ingredientButton: {
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#9AC1AF",
  },

  indButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 5,
    backgroundColor: "#9AC1AF",
  },

  dropdown: {
    fontFamily: 'raleway-regular',
  },

  buttonOpen: {
    backgroundColor: "#C0A587",
  },

  buttonClose: {
    backgroundColor: "#9AC1AF",
  },

  smallButton: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    marginTop: 10,
    backgroundColor: "#9AC1AF",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    borderColor: "#332E3C",
    borderWidth: 0.5,
    borderRadius: 10,
  },

  recipeCard: {
    backgroundColor: "#FFF3EB",
    borderRadius: 15,
    marginLeft: 0,
    margin: 10,
    padding: 15,
    height: 180,
  },

  recipeDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  recipeTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#332E3C',
    fontFamily: 'raleway-bold',
  },

  recipeImage: {
    width: 220,
    height: 120,
    marginTop: 10,
  },

  arrowIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  scrollView: {
    paddingLeft: 20,
    padding: 15,
  },

  yesParagraph: {
    fontSize: 15,
    fontFamily: 'raleway-regular',
    color: 'green',
  },

  noParagraph: {
    fontSize: 15,
    fontFamily: 'raleway-regular',
    color: 'red',
  },

  recipeSummary: {
    fontSize: 15,
    fontFamily: 'raleway-regular'
  },

  filterButton: {
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#9AC1AF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }

});