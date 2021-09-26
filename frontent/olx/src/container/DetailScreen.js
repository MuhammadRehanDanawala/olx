import React from 'react'
// import { Card, Paragraph, Title, Divider } from 'react-native-paper';
import { Body, Header, Left, Text, View, Card, CardItem, Right, Icon, Title } from 'native-base'
import { TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons';

function DetailScreen({ route, navigation }) {

    let { ad } = route.params
    console.log('details screen')
    console.log(ad)


    return <>
        <View>
            <Header style={styles.header}>
                <Left>
                    <TouchableOpacity onPress={() => { navigation.navigate('home') }}>
                        <Icons name={'arrow-back'} size={30} color='white' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Title style={styles.title}>
                        {`${ad.model}`}
                    </Title>
                </Body>
            </Header>
            <View style={styles.container}>
                <ScrollView>

                    <Card>
                        <CardItem>
                            <Image source={{ uri: ad.headerImage }} style={{ height: 300, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Text>{`${ad.companyName} ${ad.model}`}</Text>
                        </CardItem>
                    </Card>
                    <Card>

                        <CardItem>
                            <Text style={styles.bold}>Make</Text>
                            <Right>
                                <Text>{ad.companyName}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.bold}>Model</Text>
                            <Right>
                                <Text>{ad.model}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.bold}>Address</Text>
                            <Right>
                                <Text>{ad.location}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.bold}>Contact Number</Text>
                            <Right>
                                <Text>{ad.mobileNumber}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.description}>Desciption</Text>
                        </CardItem>
                        <Card>
                            <CardItem>
                                <Text>{ad.discription}</Text>
                            </CardItem>
                        </Card>
                    </Card>
                </ScrollView>
            </View>
        </View>
    </>
}
export default DetailScreen
const styles = StyleSheet.create({
    container: {
        height: '92%'
    },
    bold: {
        fontWeight: 'bold',
    },
    description: {
        left: 100,
        fontWeight: 'bold'

    },
    header:{
        backgroundColor:'black'
    },
    title:{
        color:'white'
    }
    
})