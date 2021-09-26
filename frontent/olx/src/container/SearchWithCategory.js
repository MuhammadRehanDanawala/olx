import { Body, Header, Left, View } from 'native-base'
import React, { useEffect, useState } from 'react'

import { Text, AsyncStorage, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';

import appSettings from '../appSettings'


function SearchWithCategory({ route, navigation }) {
    let [ads, setAds] = useState([])
    let [category, setcategory] = useState('')


    let gotoDetailScreen = (id) => {
        let findAd = ads.find(ad => ad._id === id)
        navigation.navigate('detailscreen', { ad: findAd })
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
        let { category, searchingAds } = route.params;
        let filteredAds = searchingAds.filter(ad => ad.category === category)

        setAds(filteredAds)
        setcategory(category.toUpperCase())

    }, [])
    return <>
        <View>
            <Header style={styles.header}>
                <Left>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }}>
                        <Icons name={'arrow-back'} size={30} color='white' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Title style={styles.title}>{`${category}'S`}</Title>
                </Body>
            </Header>

            <View style={styles.container}>
                <ScrollView>
                    <FlatList
                        data={ads}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => renderItems(item)}
                    />
                </ScrollView>
            </View>
        </View>
    </>
}
export default SearchWithCategory
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black'
    },
    container: {
        height: '92%',
    },
    card: {
        borderWidth: 1,
        borderColor: 'blue'
    },
    title:{
        color:'white'
    }

});
