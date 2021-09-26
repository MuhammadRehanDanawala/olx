import { Header, Left, Body, Right, View, Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { AsyncStorage, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

import Icons from 'react-native-vector-icons/MaterialIcons';

function Profile({ route, navigation }) {
    let [list, setList] = useState(null)
    let signOut = () => {
        AsyncStorage.removeItem('singedInUser')
        navigation.navigate('home')
    }

    let gotoDetailScreen = (id) => {
        let findAd = list.find(ad => ad._id === id)
        navigation.navigate('detailscreen', {ad: findAd})
    }


    const renderItems = (item) => {
        return (
            <Card onPress={() => { gotoDetailScreen(item._id) }} style={styles.card}>
            <Card.Title title={item.companyName + item.model} />
            <Card.Cover source={{ uri: item.headerImage }} />
            <Card.Content>
                <Paragraph>{item.location}</Paragraph>
            </Card.Content>
        </Card>
        )
    }

    useEffect(() => {
            let { userId, ads } = route.params;
            let filteredAds = ads.filter(ad => ad.email === userId)
            setList(filteredAds)
       
    }, [])
    return <>
        <Header style={styles.header}>
            <Left>
                <TouchableOpacity onPress={() => { navigation.navigate('home') }}>
                    <Icons name={'arrow-back'} size={30} color='white' style={{ marginLeft: '3%' }} />
                </TouchableOpacity>
            </Left>
            <Body>
                <Title style={styles.title} >
                    Profile
                </Title>
            </Body>
            <Right>
                <Button transparent onPress={signOut}>
                    <Text style={styles.title}>Sign Out</Text>
                </Button>
            </Right>
        </Header>
        <View style={styles.container}>
        <FlatList
            data={list}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => renderItems(item)}
        />
        </View>

        <View style={styles.sell}>
            <Button style={styles.sell} info small onPress={() => navigation.navigate('sell')} ><Text>Sell</Text></Button>
        </View>
    </>
}
const styles = StyleSheet.create({
   
    sell: {
        height: 50,
        width: 100,
        justifyContent: 'center',
        borderRadius: 50,
        bottom: 10,
        position: 'absolute',
        right: 15,
        zIndex: 2

    },
    button:{
        marginLeft:10
    },
    container: {
        height: '92%',
    },
    header: {
        backgroundColor: 'black',

    },
    title: {
        color: 'white'
    },
    card:{
        borderWidth:2,
        borderColor:'black'
    }

})

export default Profile;