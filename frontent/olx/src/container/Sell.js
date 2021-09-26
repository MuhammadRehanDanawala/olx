import { createStackNavigator } from '@react-navigation/stack'
// import DropDownPicker from 'react-native-dropdown-picker'
// import Icon from 'react-native-vector-icons/Feather';

import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    Button,
    AsyncStorage,
    ScrollView,
    TouchableOpacity

} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Header, Textarea, Left, Body, Right, Title, Spinner } from 'native-base';
import axios from 'axios';
import Icons from 'react-native-vector-icons/MaterialIcons';
import appSettings from '../appSettings';
const image = { uri: "https://profit.pakistantoday.com.pk/wp-content/uploads/2018/11/OLX-Handshake.png" }

const Stack = createStackNavigator();




function Sell({ navigation }) {


    let [companyName, setCompanyName] = useState('')
    let [model, setModel] = useState('')
    let [location, setLocation] = useState('')
    let [category, setCategory] = useState('car')
    let [email, setEmail] = useState('')
    let [mobileNumber, setMobileNumber] = useState('')
    let [discription, setDescription] = useState('')
    let [headerImage, setChooseImage] = useState('');
    let [checkImage, setCheckImage] = useState(false)
    let [button, setButton] = useState(false)



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test.${result.uri.split(".")[1]}`
            }
            setCheckImage(true)
            handleUpload(newFile)
        }
    };
    let submitAd = () => {
        setButton(true)
        console.log(category)
        let data = {
            companyName,
            model,
            location,
            mobileNumber,
            category,
            discription,
            email,
            headerImage
        }
        axios.post(`${appSettings.serverbaseUrl}/ads/new`, data)
            .then(res => {
                setButton(false)
                navigation.navigate('home')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'olxApp')
        data.append("cloud_name", "dhoxnbzqd")

        fetch("https://api.cloudinary.com/v1_1/dhoxnbzqd/image/upload", {
            method: "post",
            body: data,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.url)
                setCheckImage(false)
                setChooseImage(data.url)
            })
    }

    useEffect(() => {
        AsyncStorage.getItem('singedInUser')
            .then(res => {
                setEmail(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return <>

        <Header style={styles.header}>
            <Left>
                <TouchableOpacity onPress={() => { navigation.navigate('profile') }}>
                    <Icons name={'arrow-back'} size={30} color='white' style={{ marginLeft: '3%' }} />
                </TouchableOpacity>
            </Left>
            <Body>
                <Title>
                    Sell Form
                </Title>
            </Body>
            <Right />
        </Header>

        <ImageBackground source={image} style={styles.image}>
            <ScrollView>
                <View style={styles.container}>
                    {/* <View style={styles.home}><Button onPress={() => navigation.navigate('home')} title='Home' /></View>
                    <Text>Sell Form</Text> */}
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Company Name"
                            underlineColorAndroid='transparent'
                            value={companyName}
                            onChangeText={(e) => setCompanyName(e)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Model"
                            underlineColorAndroid='transparent'
                            value={model}
                            onChangeText={(e) => setModel(e)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Location"
                            underlineColorAndroid='transparent'
                            value={location}
                            onChangeText={(e) => setLocation(e)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Mobile Number"
                            numeric
                            keyboardType={'numeric'}
                            value={mobileNumber}
                            onChangeText={(e) => setMobileNumber(e)}
                        />
                    </View>


                    <Text>Choose An Category</Text>
                    <View style={styles.inputContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={category}
                            onValueChange={(item) => setCategory(item)}

                        >
                            <Picker.Item label='Car' value='car' />
                            <Picker.Item label='Mobile' value='mobile' />
                            <Picker.Item label='Bike' value='bike' />
                        </Picker>

                    </View>
                        {checkImage ? <><Spinner color='blue' /></> :<>{headerImage ? <><Text>You Have Already Select Your Image</Text><Button onPress={() => {setChooseImage('')}} title='Reselect Image' /></>:<Button title="Pick an image from Gallery" onPress={pickImage} />}
</> }
                    <View style={styles.textArea}>
                        <Textarea rowSpan={5} bordered placeholder="Description" value={discription} onChangeText={(e) => setDescription(e)} />
                    </View>

                    <View>
                        {button ? <><Spinner color='blue' /></> : <Button
                            onPress={submitAd}
                            title={'Submit'}
                            color={'blue'} />}
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    </>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    picker: {
        width: 250,
        height: 45,
        borderColor: 'blue',
        borderWidth: 1
    },
    textArea: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 130,
        marginBottom: 20,
        marginTop: 15,
        flexDirection: 'column',
    },
    home: {
        left: 6,
        position: 'absolute',
        top: 2
    },
    header:{
        backgroundColor:'black'
    }

});
export default Sell




// ImagePicker.launchImageLibrary(options, response => {
//     if (response.didCancel) {
//         console.log('User cancelled photo picker');
//         Alert.alert('You did not select any image');
//     } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//     } else {
//         let source = { uri: response.uri };

//         // // ADD THIS
//         // setImageSource(source.uri);
//     }
// });