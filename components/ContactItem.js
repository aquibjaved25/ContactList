import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';

const ContactItem = props => {

    return (
        <View style={styles.mainContainer} >

            <TouchableOpacity onPress= {props.onSelect} >
            <Image style={styles.avatarContainer}
            source={props.uri.length
                ? {uri: props.uri}                      // Use object with 'uri'
                : require('../assets/imgplaceholder.png')}/>
            <Text style={styles.textStyle}> {props.name}</Text>
            <Text style={styles.textStyle}> {props.mobile}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    mainContainer: {
        borderRadius:10,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex:1,
        marginTop:25,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
        
    },
    avatarContainer: {
        height: 32,
        width: 32,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center"
      },

    textStyle: {
        height:25,
        width:'80%',
        fontSize: 18,
        color: 'white'
        
    }
});

export default ContactItem;