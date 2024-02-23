import { StyleSheet, View, Modal, Text, Pressable, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Button from '../components/Button';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get('window').width * 0.8;
const height = Dimensions.get('window').height * 0.3;

const RequestDriver = ({ navigation }) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isRequestMade, setIsRequestMade] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userFullName, setUserFullName] = useState('')

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            const value = await AsyncStorage.getItem('userPhoneNumber');
            const fullName = await AsyncStorage.getItem('userFullName')
            setPhoneNumber(value)
            setUserFullName(fullName)
        })();
    }, []);

    const sendMail = () => {
        setIsRequestMade(true)
        setIsLoading(true)
        axios.post('https://webhook.site/a7dd393e-e40a-4a3b-8741-7f720035cc18', {
            phone: phoneNumber,
            fullname: userFullName
        })
            .then(function (response) {
                console.log(response.data);
                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const clearData = async () => {
        try {
            await AsyncStorage.removeItem('userFullName');
            await AsyncStorage.removeItem('userPhoneNumber');
            console.log('done clearing')
            navigation.navigate('Login')
        } catch (error) {
            console.error(error)
        }
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title={"Your Location"}
                    />

                </MapView>
            )}

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
                                        onPress={() => setIsRequestMade(!isRequestMade)}>
                                        <Text style={styles.textStyle}>Okay!</Text>
                                    </Pressable>
                                </>
                        }

                    </View>
                </View>
            </Modal>

            <View
                style={styles.floatingContainer}
            >
                <Button title='Request Driver' onPress={sendMail} />
                {/* <Button title='Clear Data' onPress={clearData} /> */}
            </View>
        </View>
    )
}

export default RequestDriver

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
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
})