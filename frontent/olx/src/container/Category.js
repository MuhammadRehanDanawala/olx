import axios from 'axios'
import { Body, Header, Left, View } from 'native-base'
import React, { useEffect, useState } from 'react'

import { Text, AsyncStorage, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import appSettings from '../appSettings'
function Category({ route, navigation }) {
    let [category, setCategory] = useState('')
    let [categoryAds, setCategoryAds] = useState([])


    let categoryName = () => {
        let { category } = route.params
        getCategoryItems(category)
        var res = category.toUpperCase();
        setCategory(res)
        console.log('category')
        console.log(category)
        console.log(res)
    }
    let getCategoryItems = (name) => {
        let data = {
            name
        }
        axios.post(`${appSettings.serverbaseUrl}/ads/category`, data)
            .then(res => {
                console.log(res)
                setCategoryAds(res.data.result)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let gotoDetailScreen = (id) => {
        let findAd = categoryAds.find(ad => ad._id === id)
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
        categoryName()
        // getCategoryItems()

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
                        data={categoryAds}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => renderItems(item)}
                    />
                </ScrollView>
            </View>
        </View>
    </>
}
export default Category;
const styles = StyleSheet.create({
    container: {
        height: '92%',
    },
    card: {
        borderWidth: 1,
        borderColor: 'blue'
    },
    title:{
        color:'white'
    },
    header:{
        backgroundColor:'black'
    }

});
