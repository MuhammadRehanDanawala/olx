import React, { useState } from 'react';
import axios from 'axios'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    Button,
    AsyncStorage,
    TouchableOpacity

} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import appSettings from '../appSettings';
import { Body, Left, Title,Header, Spinner } from 'native-base';
const image = { uri: "https://profit.pakistantoday.com.pk/wp-content/uploads/2018/11/OLX-Handshake.png" }

function SignUp({ navigation }) {
    let [name, setName] = useState('');
    let [emailId, setEmailId] = useState('');
    let [password, setPassword] = useState('');
    let [button, setButton] = useState(true)

    let attemptSignup = () => {
        setButton(false)
        let data = {
            name,
            emailId,
            password
        };
        axios.post(`${appSettings.serverbaseUrl}/users/signup`, data)
            .then(res => {
                setButton(true)
                AsyncStorage.setItem('singedInUser', res.data.newUser.emailId)
                navigation.navigate('home')
            })
            .catch(err => {
                console.log(err)
            })

    }
    return <>
        <Header style={styles.header}>
            <Left>
                <TouchableOpacity onPress={() => { navigation.navigate('signin') }}>
                    <Icons name={'arrow-back'} size={30} color='white' style={{ marginLeft: '3%' }} />
                </TouchableOpacity>
            </Left>
            <Body>
                <Title>
                    SIGN - UP
                </Title>
            </Body>
        </Header>
        <ImageBackground source={image} style={styles.image}>
            <View style={styles.container}>
                <Text>SignUp</Text>

                <View style={styles.inputContainer}>

                    <TextInput style={styles.inputs}
                        value={name}
                        placeholder="Name"
                        underlineColorAndroid='transparent'
                        onChangeText={(e) => setName(e)}
                        required  
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        value={emailId}
                        placeholder="Email"
                        underlineColorAndroid='transparent'
                        onChangeText={(e) => setEmailId(e)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(e) => setPassword(e)}
                    />
                </View>
                <View>
                    {button ? <Button
                        onPress={attemptSignup}
                        title={'Register'}
                        color={'blue'} />:<Spinner color='blue' />}
                </View>
            </View>
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
    header:{
        backgroundColor:'black'
    }

});
export default SignUp;