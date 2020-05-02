import React, { useState , useEffect} from 'react';
import {View,StyleSheet, Text, AsyncStorage,FlatList, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import ContactItem from '../components/ContactItem';


const ContactList = props => {

    var initialVal = [];
    const [contacts, setContacts] = useState([]);

   
    const actionButtonHandler = () => {

        props.navigation.navigate({ routeName: 'AddContact',params:{
            
        onSelect:this.onSelect
        } })
    };


const getkey = item => item.mobile;

    async function fetchData(){
        
        AsyncStorage.getAllKeys((err,keys) =>{
            AsyncStorage.multiGet(keys,(error,stores) => {
            stores.map((result, i , store) => {
                    initialVal.push(JSON.parse(store[i][1]));
                    return true;
            });
            initialVal.sort((a,b) => (a.name > b.name) ? 1 : -1 )
            console.log(initialVal);
            setContacts(initialVal)
            });
        });
    };

    useEffect(() => {
        
       const willFocusSub = props.navigation.addListener('willFocus',fetchData);
       return() =>{ willFocusSub.remove();};
       
      }, [fetchData]);


if(contacts.length>0){
    return (

 <View style = {styles.screen}>

 <View style = {styles.lisContainer}>
    <FlatList
    data = {contacts}
    keyExtractor = {getkey}
    renderItem={({ item }) =>
              <ContactItem
              uri={item.uri}
              name={item.name}
              mobile={item.mobile}
              landline = {item.landline}

              onSelect= {()=>{
                  props.navigation.navigate({
                      routeName:'AddContact'
                      ,params:{
                        name:item.name,
                        mobile:item.mobile,
                        landline:item.landline,
                        uri:item.uri
                        
                    }
                  });
              } }

              />}/>
            </View> 

            <ActionButton buttonColor="rgba(231,76,60,1)"
            onPress = {actionButtonHandler}  />

        </View>
    );}
    else{
        return(
            <View style={styles.container}>
      <Text>Please Add Contacts</Text>
    </View>
        );
    }
};

ContactList.navigationOptions = navData => {

    return{
        headerTitle:'Contact List',
        headerLeft: () => <HeaderButtons HeaderButtonComponent  =  {HeaderButton}>
            <Item title = "Menu" iconName='ios-menu' onPress={()=>{
                navData.navigation.toggleDrawer();
            } }
            
            />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'90%'
    },
    lisContainer: {
        padding: 15,
        width:'90%'
      }
});

export default ContactList;