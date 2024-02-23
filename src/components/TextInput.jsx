import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width * 0.8;
const height = Dimensions.get('window').height * 0.07;

const MyTextInput = ({placeholder, value, onValueChange, keyboard_type = "default"}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onValueChange}
        value={value}
        keyboardType={keyboard_type}
      />
    </View>
  )
}

export default MyTextInput

const styles = StyleSheet.create({
    input: {
        height: height,
        width: width,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        paddingHorizontal: 10,
      }
})