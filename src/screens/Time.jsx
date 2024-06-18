import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';



const Time = () => {

  

  return (
    <View style={styles.container}>
      <AntDesign name="checkcircle" size={58} color="#06a103" />
      <Text style={styles.textStyle}>Thank you!</Text>
    </View>
  )
}

export default Time

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 20
  }
})