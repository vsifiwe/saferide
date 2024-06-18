import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import Button from '../components/Button';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather } from '@expo/vector-icons';
import { writeDataToFirestore } from '../firebase/config';

const width = Dimensions.get('window').width * 0.8;
const height = Dimensions.get('window').height * 0.3;

const Driver = ({ navigation }) => {

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isRequestMade, setIsRequestMade] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userFullName, setUserFullName] = useState('')

  useEffect(() => {
    ( async () => {
        const value = await AsyncStorage.getItem('userPhoneNumber');
        const fullName = await AsyncStorage.getItem('userFullName')
        setPhoneNumber(value)
        setUserFullName(fullName)
    })();
  }, []);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
    showConfirmationAlert(selectedDate);
  };

  const showTimepicker = () => {
    setShow(true);

  };

  const sendRequest = () => {
    setIsRequestMade(true)
    setIsLoading(true)

    writeDataToFirestore(userFullName, phoneNumber).then((result) => {
        console.log(result)
        setIsLoading(false)
    }).catch((error) => {
        console.error(error)
    })
  }

  const endOperation = () => {
    setIsRequestMade(!isRequestMade)
    navigation.navigate('Time')
  }

  const showConfirmationAlert = (selectedDate) => {
    Alert.alert(
      'Confirmation',
      `You have selected ${selectedDriver} and preferred pickup time is ${selectedDate.getHours()}:${selectedDate.getMinutes()}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: sendRequest,
        },
      ],
      { cancelable: false }
    );
  }

  const handleSelectDriver = (name) => {
    setSelectedDriver(name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityLabel="Choose Driver Title">
        Choose Driver
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <TouchableOpacity onPress={() => handleSelectDriver('Seleman M.')}>
        <View style={[styles.card, selectedDriver === 'Seleman M.' && styles.selectedCard]}>
          <Feather style={styles.profile} name="user" size={48} color="black" />
          <View style={styles.detailText}>
            <Text>Name: Seleman M.</Text>
            <Text>Quality: Punctual, Courteous</Text>
            <Text>Contact: 078****871</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectDriver('Dylan R.')}>
        <View style={[styles.card, selectedDriver === 'Dylan R.' && styles.selectedCard]}>
        <Feather style={styles.profile} name="user" size={48} color="black" />
          <View style={styles.detailText}>
            <Text>Name: Dylan R.</Text>
            <Text>Quality: Polyglot (French, English, Swahili, Kinyarwanda)</Text>
            <Text>Contact: 078****589</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectDriver('Elvis N.')}>
        <View style={[styles.card, selectedDriver === 'Elvis N.' && styles.selectedCard]}>
        <Feather style={styles.profile} name="user" size={48} color="black" />
          <View style={styles.detailText}>
            <Text>Name: Elvis N.</Text>
            <Text>Quality: Experienced (Many driving categories)</Text>
            <Text>Contact: 078****640</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={styles.floatingContainer}
      >
        <Button title='Select Time' onPress={
          selectedDriver != null ? showTimepicker : () => Alert.alert('Error', 'Please select a driver first')
        }
        />
      </View>

      <Modal
                animationType="slide"
                transparent={true}
                visible={isRequestMade}
                onRequestClose={() => {
                    setIsRequestMade(!isRequestMade);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            isLoading ?
                            <ActivityIndicator size="large"/>
                                : <>
                                    <AntDesign name="checkcircle" size={58} color="#06a103" />
                                    <Text style={styles.modalText}>Thank you, {userFullName}!</Text>
                                    <Text style={styles.modalText}>A driver will call you shortly on {phoneNumber}</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={endOperation}>
                                        <Text style={styles.textStyle}>Okay!</Text>
                                    </Pressable>
                                </>
                        }

                    </View>
                </View>
            </Modal>

    </View>
  );
};

export default Driver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 60,
  },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 20,
    marginHorizontal: 40,
    padding: 20,
    borderColor: '#000',
  },
  selectedCard: {
    borderColor: '#007bff',
    backgroundColor: '#e6f0ff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the position as needed
    right: 20, // Adjust the position as needed
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    width: '90%',
    height: 90
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
},
modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    height: height,
    width: width,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }, 
  button: {
    width: width * 0.7,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  profile: {
    marginRight: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#e6f0ff',
  }, 
  detailText: {
    flexShrink: 1
  }
});
