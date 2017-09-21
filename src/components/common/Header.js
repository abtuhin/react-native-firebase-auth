import React from 'react';
import {Text, View} from 'react-native';

const Header = (props) => {
  const {textStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = {
  viewStyle: {
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    elevation: 3,
    position: 'relative'
  },
  textStyle: {
    fontSize: 30
  }
}

export {Header};
