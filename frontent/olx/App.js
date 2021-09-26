import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Body, Footer, Header, Left, Title, Text, Container, Right } from 'native-base'
import Home from './src/container/Home'
import SignUp from './src/container/SignUp'
import SignIn from './src/container/SignIn'
import Profile from './src/container/Profile'
import Sell from './src/container/Sell'
import { AsyncStorage, Button } from 'react-native'
import Category from './src/container/Category'
import SearchWithCategory from './src/container/SearchWithCategory'
import DetailScreen from './src/container/DetailScreen'

const Stack = createStackNavigator();

function App () {

  
 
  return <>
    <Container>
     
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home' headerMode='none'>
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='profile' component={Profile} />
          <Stack.Screen name='signin' component={SignIn} />
          <Stack.Screen name='signup' component={SignUp} />
          <Stack.Screen name='sell' component={Sell} />
          <Stack.Screen name='category' component={Category} />
          <Stack.Screen name='searchwithcategory' component={SearchWithCategory} />
          <Stack.Screen name='detailscreen' component={DetailScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>

    </Container>
  </>

}
export default App;