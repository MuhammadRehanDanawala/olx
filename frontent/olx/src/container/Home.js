import React, { useEffect, useState } from 'react'
import { Body, Header, Left, Right, Item, Input, Icon, Spinner, Button } from 'native-base'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import {
    View, Text, FlatList, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import appSettings from '../appSettings'
import { Picker } from '@react-native-picker/picker';
import Icons from 'react-native-vector-icons/MaterialIcons';
const image = { uri: "https://profit.pakistantoday.com.pk/wp-content/uploads/2018/11/OLX-Handshake.png" }






function Home({ navigation }) {
    let [storedItem, setStoredItem] = useState('')
    let [list, setList] = useState(null)
    let [category, setCategory] = useState('')
    let [searchbar, setSearchbar] = useState('')
    let [searchAds, setSearchingAds] = useState(null)
    // let [categoryItem, setCategoryItem] = useState()
    // let [user, setUser] = useState('')


    let getUser = () => {
        AsyncStorage.getItem('singedInUser')
            .then(res => {
                setStoredItem(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    let gotoDetailScreen = (id) => {
        let findAd = list.find(ad => ad._id === id)
        navigation.navigate('detailscreen', { ad: findAd })
    }

    let searchButton = () => {
        if (searchbar && category) {
            console.log(searchbar + category)
            let mathingAds = list.filter((ad) => {
                let regexp = new RegExp(searchbar, 'ig');
                if (ad.discription.match(regexp)) {
                    return true
                }
                return false
            })
            console.log(mathingAds)
            navigation.navigate('searchwithcategory', {
                category: category,
                searchingAds: mathingAds,
            });
        }

        else if (searchbar) {
            console.log(searchbar)
            let mathingAds = list.filter((ad) => {
                let regexp = new RegExp(searchbar, 'ig');
                if (ad.discription.match(regexp)) {
                    return true
                }
                return false
            })
            setSearchingAds(mathingAds)
        }

        else if (category) {

            navigation.navigate('category', { category: category })

        }
    }
    const renderItems = (item) => {
        return (
            <Card onPress={() => { gotoDetailScreen(item._id) }} style={styles.card}>
                <Card.Title title={`${item.companyName} ${item.model}`} />
                <Card.Cover source={{ uri: item.headerImage }} />
                <Card.Content>
                    <Paragraph>{item.location}</Paragraph>
                </Card.Content>
            </Card>
        )
    }
    let allAds = () => {
        axios.get(`${appSettings.serverbaseUrl}/ads/list`)
            .then(res => {
                console.log('res.data.list')
                console.log(res)
                setList(res.data.list)
            })
            .catch(err => {
                console.log('err in List All Item Page')
                console.log(err)
            })
    }
    let backToHome = () => {
        setSearchingAds(null)
        setSearchbar('')
    }




    useEffect(() => {
        navigation.addListener('focus', () => {
            getUser()
            allAds()
            setCategory('')
            setSearchbar('')

        })
    }, [])



    return <>
        <View>
            <Header style={styles.header}>
                <Left>{searchAds ? <><TouchableOpacity onPress={backToHome}>
                    <Icons name={'arrow-back'} size={30} color='white' style={{ marginLeft: '3%' }} />
                </TouchableOpacity></> : <></>}</Left>
                <Body>
                    <Title style={styles.title}>
                        OLX
                </Title>
                </Body>
                <Right>
                    {list ? <>{storedItem ? <Button style={styles.header} onPress={() => navigation.navigate('profile', { userId: storedItem, ads: list })}><Text style={styles.title}>Profile</Text></Button> : <Button style={styles.header} onPress={() => navigation.navigate('signin')}><Text style={styles.title}>Sign In</Text></Button>}</> : <><Spinner color='blue' /></>}
                </Right>
            </Header>
            <View style={styles.container}>
                <ScrollView>

                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" value={searchbar} onChangeText={(text) => setSearchbar(text)} />
                        <Icon name="ios-people" />
                    </Item>

                    <Picker
                        prompt="Choose Category"
                        style={styles.picker}
                        selectedValue={category}
                        onValueChange={(item) => setCategory(item)}

                    >
                        <Picker.Item label='Select Category' value='' />
                        <Picker.Item label='Car' value='car' />
                        <Picker.Item label='Mobile' value='mobile' />
                        <Picker.Item label='Bike' value='bike' />
                    </Picker>



                    <Button onPress={searchButton} success style={styles.search}><Text>      Search</Text></Button>



                    {searchAds ? <><FlatList
                        data={searchAds}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => renderItems(item)}
                    /></>
                        :
                        <><FlatList
                            data={list}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => renderItems(item)}
                        /></>}

                </ScrollView>
            </View>
        </View>
    </>
}

export default Home;
const styles = StyleSheet.create({
    container: {
        height: '92%',
    },
    header: {
        backgroundColor: 'black'
    },
    picker: {
        left: 10,
        width: 200,
        height: 45,
        borderColor: 'blue',
        borderWidth: 1
    },
    card: {
        // backgroundColor:'#CAFFB3',
        borderWidth: 1,
        borderColor: 'blue'
    },
    search: {
        width: 100,
        position: 'absolute',
        top: 50,
        right: 5,

    },
    title:{
        color:'white'
    }

});