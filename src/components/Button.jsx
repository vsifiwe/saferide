import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

import React from 'react'

const buttonWidth = Dimensions.get('window').width * 0.8;
const buttonHeight = Dimensions.get('window').height * 0.07;

const Button = ({title, onPress}) => {
  return (
    <View>
      <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    height: buttonHeight,
    width: buttonWidth,
    margin: 7,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
})