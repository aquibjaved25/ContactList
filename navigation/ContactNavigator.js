import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import { createDrawerNavigator } from 'react-navigation-drawer'; 
import ContactListScreen from '../screens/ContactList';
import AddContactScreen from '../screens/AddContact';
import FavoriteList from '../screens/FavoriteList';




const ContactNavigator = createStackNavigator({
    ContactList:ContactListScreen,
    AddContact:AddContactScreen,
});

const FavNav = createStackNavigator({
    Fav:FavoriteList
})

const MainNavigator = createDrawerNavigator({
     contactNav:{
         screen: ContactNavigator,
         
     },
     Favorite:FavNav
});

export default createAppContainer(MainNavigator);