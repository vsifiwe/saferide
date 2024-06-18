import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/Button';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const Driver = ({ navigation }) => {

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
    showConfirmationAlert(selectedDate);
  };

  const showTimepicker = () => {
    setShow(true);

  };

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
          onPress: () => navigation.navigate('Time'),
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
          <Text>Profile</Text>
          <View>
            <Text>Name: Seleman M.</Text>
            <Text>Quality: Punctual, Courteous</Text>
            <Text>Contact: 078****871</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectDriver('Dylan R.')}>
        <View style={[styles.card, selectedDriver === 'Dylan R.' && styles.selectedCard]}>
          <Text>Profile</Text>
          <View>
            <Text>Name: Dylan R.</Text>
            <Text>Quality: Polyglot (French, English, Swahili, Kinyarwanda)</Text>
            <Text>Contact: 078****589</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectDriver('Elvis N.')}>
        <View style={[styles.card, selectedDriver === 'Elvis N.' && styles.selectedCard]}>
          <Text>Profile</Text>
          <View>
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

          // () => { navigation.navigate('Time') }
          selectedDriver != null ? showTimepicker : () => Alert.alert('Error', 'Please select a driver first')

        }
        />
      </View>
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
});
