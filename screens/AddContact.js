import React, { useState } from 'react';
import {View,StyleSheet,Alert,Button,TouchableOpacity,AsyncStorage} from 'react-native';
import Input from '../components/Input';

import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

const AddContact = props => {

    const [eneteredName, setEnteredName] = useState(props.navigation.getParam('name') != null ? props.navigation.getParam('name') :'');
    const [eneteredmobile, setEnteredMobile] = useState(props.navigation.getParam('mobile') != null ? props.navigation.getParam('mobile') :'');
    const [eneteredlandline, setEnteredLandline] = useState(props.navigation.getParam('landline') != null ? props.navigation.getParam('landline') :'');
    const [geturi, seturi] = useState(props.navigation.getParam('uri') != null ? props.navigation.getParam('uri') :'');
    const [favorite, setFavorite] = useState(props.navigation.getParam('favorite') != null ? props.navigation.getParam('favorite') : false );

    const numberInputHandler = inputtext =>{
        setEnteredName(inputtext);
    };

    const mobileInputHandler = inputmobile =>{
        setEnteredMobile(inputmobile);
    };

    const LandlineInputHandler = inputlandline =>{
        setEnteredLandline(inputlandline);
    };

    const saveInputHandler = () => {

        if(eneteredName.length === 0 ){
            Alert.alert(
                "Username Empty",
                "Please Enter username",
                [
                  { text: "OK", 
                  style: "cancel",
                  onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
          
            return;
        }
    
        if(eneteredmobile.length === 0 ){
            Alert.alert(
                "Mobile number Empty",
                "Mobile number must not be empty",
                [
                  { text: "OK", 
                  style: "cancel",
                  onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
          
            return;
        }
    
        if(eneteredmobile.length < 8 ){
            Alert.alert(
                "Mobile number is short",
                "Mobile number size must be greater than 7",
                [
                  { text: "OK", 
                  style: "cancel",
                  onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
          
            return;
        }

        if(eneteredlandline.length === 0 ){
            Alert.alert(
                "Landline Empty",
                "Landline must not be empty",
                [
                  { text: "OK", 
                  style: "cancel",
                  onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
          
            return;
        }
    
        if(eneteredlandline.length < 8 ){
            Alert.alert(
                "Landline is short",
                "Landline size must be greater than 7",
                [
                  { text: "OK", 
                  style: "cancel",
                  onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
          
            return;
        }
    
        const objectToBeSaved = {'name':eneteredName,'mobile':eneteredmobile,'landline':eneteredlandline,'uri':geturi,'favorite':favorite};
        console.log(objectToBeSaved);
        AsyncStorage.setItem(eneteredmobile,JSON.stringify(objectToBeSaved))
        .then(() => {
          console.log('It was saved Successfully')
          props.navigation.popToTop();
         
        })
        .catch(() => {
          console.log('There was an error saving the product');
        })
    };

    pickPicture = () => {
      const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.showImagePicker(options, (response) =>{

        if(response.didCancel){
          return;
        }
        if(response.error){
          //TODO: handle error
        }
        seturi(response.uri)
      
      });
}

getPicture = () => {
  pickPicture();
}

    const favoriteInputHandler = () => {
    setFavorite(true);
    };

    return (
        <View style = {styles.screen}>

<TouchableOpacity onPress={getPicture} style = {styles.avatarContainer} >
        <Avatar
        rounded
        size = "xlarge"
        icon = {{name:"person"}}
        source = {geturi.length
          ? {uri: geturi}                      // Use object with 'uri'
          : require('../assets/imgplaceholder.png')}
        />
</TouchableOpacity>

        <Input style = {styles.input} 
        placeholder = "Username" 
        onChangeText = {numberInputHandler}
        value = {eneteredName}/>
        
        <Input style = {styles.input} 
        placeholder = "Mobile"
        onChangeText = {mobileInputHandler}
        value = {eneteredmobile}
        maxLength = {10} />

<Input style = {styles.input} 
        placeholder = "Landline"
        onChangeText = {LandlineInputHandler}
        value = {eneteredlandline}
        maxLength = {10} />
        
        <View style= {styles.fav} >

        <Button title = "SAVE"
        style = {styles.button}
        onPress = {saveInputHandler} />

         <Button title = "Fav"
        style = {styles.button}
        onPress = {favoriteInputHandler}
         />
    </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1, 
        justifyContent:'center',
        alignItems:"center"
    },
    fav:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-around'
        
    },
    input:{
        width:'80%',
        textAlign:'center'
    },
avatarContainer:{

alignItems:'center',
justifyContent:'center'
},
    button:{
        marginTop:15,
        width:'80%',
        textAlign:'center'
    }
});

export default AddContact;