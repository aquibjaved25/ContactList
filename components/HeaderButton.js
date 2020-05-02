import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';

import Colors from '../constants/Color';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeaderButton = props => {
    return <HeaderButton {...props}
        IconComponent={Icon}
        iconSize={23}
        color={Platform.OS === 'android' ?  Colors.primaryColor : Colors.accentColor}
    />


};

export default CustomHeaderButton;