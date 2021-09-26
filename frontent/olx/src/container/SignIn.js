import { createStackNavigator } from '@react-navigation/stack'



import React, { Component, useState } from 'react';
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
import { Body, Header, Left, Spinner, Title } from 'native-base';
import axios from 'axios';
import appSettings from '../appSettings';
import Icons from 'react-native-vector-icons/MaterialIcons';

const image = { uri: "https://profit.pakistantoday.com.pk/wp-content/uploads/2018/11/OLX-Handshake.png" }

const Stack = createStackNavigator();

function SignIn({ navigation }) {
    let [emailId, setEmailId] = useState('')
    let [password, setPassword] = useState('')
    let [button, setButton] = useState(true)



    let signIn = () => {
        setButton(false)
        let data = {
            emailId,
            password
        }
        axios.post(`${appSettings.serverbaseUrl}/users/signin`, data)
            .then(res => {
                setButton(true)
                AsyncStorage.setItem('singedInUser', res.data.signedInUser.emailId)
                navigation.navigate('home')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return <>
        <Header style={styles.header}>
            <Left>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Icons name={'arrow-back'} size={30} color='white' style={{ marginLeft: '3%' }} />
                </TouchableOpacity>
            </Left>
            <Body>
                <Title>
                    SIGN - IN
                </Title>
            </Body>

        </Header>
        <ImageBackground source={image} style={styles.image}>
            <View style={styles.container}>
                <Text>Sign In</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        underlineColorAndroid='transparent'
                        value={emailId}
                        onChangeText={(e) => setEmailId(e)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                    />
                </View>
                <View>
                    {button ? <Button
                        onPress={signIn}
                        title={'signin'}
                        color={'blue'} /> : <Spinner color='blue' />}
                </View>
                <Text>Do you want to create an account?</Text>
                <View>
                    <Button
                        onPress={() => navigation.navigate('signup')}
                        title={'Go To SignUp'}
                        color={'green'} />
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
export default SignIn
    // <Root>
    //     <Container >
    //         <Form>
    //             <FormItem floatingLabel>
    //                 <Label>Email</Label>
    //                 <Input />
    //             </FormItem>
    //             <FormItem floatingLabel last>
    //                 <Label>Password</Label>
    //                 <Input secureTextEntry={true} />
    //             </FormItem>

    //             <Button full primary style={{ paddingBottom: 4 }}>
    //                 <Text> Login </Text>
    //             </Button>
    //             
    //             <Button full success ><Text> Sign Up </Text></Button>
    //         </Form>


    //     </Container>
    // </Root>