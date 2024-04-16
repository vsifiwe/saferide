import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import TextInput from '../components/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isError, setIsError] = useState(false)
  const [messages, setMessages] = useState([])

  const isValidPhoneNumberAndFullName = (phone, fullname) => {
    setMessages([])
    let newMessages = messages
    if (/^(079|078|072|073)\d{7}$/.test(phone)) {
    } else {
      newMessages.push("Incorrect phone number")
    }
    if (fullname.length == 0) {
      newMessages.push("Name cannot be empty")
    }
    setMessages(newMessages)
    return messages.length == 0 ? true : false;
  }

  const saveData = async () => {
    // validate if phone number is 10 characters
    if (!isValidPhoneNumberAndFullName(phoneNumber, name)) {
      setIsError(true)
      return
    } else {
      setIsError(false)
      try {
        await AsyncStorage.setItem('userFullName', name);
        await AsyncStorage.setItem('userPhoneNumber', phoneNumber);
        navigation.navigate('Driver')
      } catch (error) {
        console.error(error)
      }
    }
  };

  async function checkData() {
    try {
      const value = await AsyncStorage.getItem('userPhoneNumber');
      if (value !== null) {
        navigation.navigate('Driver')
      }
      // If value is null, do nothing
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }
  useEffect(() => {
    checkData()
  }, [])


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Full Name"
        onValueChange={setName}
        value={name}
      />
      <TextInput
        placeholder="Phone Number"
        onValueChange={setPhoneNumber}
        value={phoneNumber}
        keyboard_type="phone-pad"
      />
      {
        isError ? (
          messages.map((message, index) => <Text style={styles.errorMessage} key={index}>{message}</Text>) // Display each message when not loading
      ) : <></>
      }
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>This phone number will only be used</Text>
        <Text style={styles.subtitle}>to call you when a driver is ready.</Text>
      </View>
      <Button title='Login' onPress={saveData} />
      <StatusBar style="auto" />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    color: 'gray',
    fontSize: 16
  },
  textContainer: {
    alignItems: 'flex-start',
    marginVertical: 20
  },
  errorMessage: {
    color: 'red'
  }
})