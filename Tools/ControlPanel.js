import React, { Component } from 'react'
import { View, FlatList, Image, Dimensions, Platform, ImageBackground, Linking } from 'react-native'
import { Container, Header, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Cards, Item, CardItem } from 'native-base'
import firebaseSvc from '../firebaseSvc'
import moment from 'moment'

export default class ControlPanel extends Component {
    constructor(props) {
        super(props)

    }
    state = {
        CloseDrawerFunction: this.props.CloseDrawerFunction,
        Navigator: this.props.Navigator,
        Childrens: React.Children.toArray(this.props.children),
        userid: this.props.userid,
        Notification: []
    }
    componentWillReceiveProps(props) {
        this.setState({ userid: props.userid })
    }
    componentDidMount() {
        firebaseSvc.refOnNotification((data) => { this.setState({ Notification: data }) })
    }
    componentWillUnmount() {
        firebaseSvc.refOffNotification()
    }
    render() {
        if (this.state.Childrens == null) {
            return (
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.state.CloseDrawerFunction()}>
                                <Icon name='ios-close' />
                            </Button>
                        </Left>
                    </Header>
                    <Content bounces={false}>

                    </Content>
                </Container>
            )
        } else {
            return (
                <Container style={{ borderRightWidth: 1, borderRightColor: 'rgba(0,0,0,.2)' }}>
                    <Content bounces={false} scrollEnabled={false} contentContainerStyle={{
                        //height:Dimensions.get('window').height-Platform.OS=='ios'?64:56,
                        flex: 1,
                        flexGrow: 1
                    }}>
                        <View style={{ flex: 2 }}>
                            <ImageBackground resizeMode='cover' style={{ width: "100%", height: "100%" }} opacity={0.6} source={require('../assets/objblocks.jpeg')}>
                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <View
                                        style={{ padding: 20 }}
                                    >
                                        <Button
                                            rounded
                                            style={{
                                                width: 40,
                                                height: 40,
                                                color: Platform.OS == 'ios' ? '#007aff' : '#3F51B5',
                                                backgroundColor: 'white',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,

                                                elevation: 5,
                                            }} onPress={() => this.state.CloseDrawerFunction()}>
                                            <Icon style={{ color: Platform.OS == 'ios' ? '#007aff' : '#3F51B5', }} name='ios-close' />
                                        </Button>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20, marginBottom: 30 }}>
                                        
                                        <Button
                                            rounded
                                            style={{
                                                width: 80,
                                                height: 40,
                                                color: Platform.OS == 'ios' ? '#007aff' : '#3F51B5',
                                                backgroundColor: 'white',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,

                                                elevation: 5,
                                            }} onPress={() => this.state.Navigator.navigate("UserIdScreen", { userid: this.state.userid })}>
                                            <Text style={{ color: Platform.OS == 'ios' ? '#007aff' : '#3F51B5', fontSize:Platform.OS == 'ios' ? undefined : 12 }}>User ID</Text>
                                        </Button>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{ flex: 1, }}>
                            <View style={{
                                width: '90%',
                                height: '120%',
                                position: "absolute",
                                left: (Dimensions.get('window').width * 0.7 - Dimensions.get('window').width * 0.7 * 0.9) / 2,
                                top: -15,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,

                                elevation: 5,
                                zIndex: 10,
                                backgroundColor: 'rgba(244,244,244,1)',

                            }}>
                                <View style={{ flex: 1, padding: 10, backgroundColor: 'white', flexDirection:'row', justifyContent:'space-between' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>News</Text>
                                    <Text>LTE Booth: F34</Text>
                                </View>
                                <View style={{ flex: 4, padding: 10 }}>
                                    <FlatList
                                        inverted={true}
                                        data={this.state.Notification}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ flexDirection: "row", padding: 5, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,.2)' }}>
                                                    <View style={{ flex: 2 }}>
                                                        <Text>{item.message}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
                                                        <Text note>{moment(item.createdAt).format('lll')}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 2, paddingTop: 20 }}>
                            <FlatList
                                scrollEnabled={false}
                                data={this.state.Childrens}
                                renderItem={({ item }) => item}
                                ListFooterComponent={() => {
                                    return (
                                        <View style={{ paddingLeft:15, flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View style={{ flex: 1, padding: 5 }}>
                                                <Button
                                                    rounded
                                                    style={{ backgroundColor: '#3b5998', height: 50, width: 50, alignItems:'center' }}
                                                    onPress={() => Linking.openURL('https://www.facebook.com/coding101.hk/')}
                                                >
                                                    <Icon name="logo-facebook" style={{ color: 'white',fontSize:23 }} />
                                                </Button>
                                            </View>
                                            <View style={{ flex: 1, padding: 5 }}>
                                                <Button
                                                    rounded
                                                    style={{ backgroundColor: '#FF0000', height: 50, width: 50, alignItems:'center' }}
                                                    onPress={() => Linking.openURL('https://www.youtube.com/channel/UCIV0Wm7YeNI2_s-XJwoTdLA')}
                                                >
                                                    <Icon name="logo-youtube" style={{ color: 'white', fontSize:18 }} />
                                                </Button>
                                            </View>
                                            <View style={{ flex: 1, padding: 5 }}>
                                                <Button
                                                    rounded
                                                    style={{ backgroundColor: '#176BEF', height: 50, width: 50, alignItems:'center' }}
                                                    onPress={() => Linking.openURL('https://www.coding101.hk/')}
                                                >
                                                    <Icon name="ios-globe" style={{ color: 'white', fontSize:23 }} />
                                                </Button>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                        <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'flex-end', alignContent: 'flex-end', zIndex:-1 }}>
                            <Text style={{
                                padding: 3,
                                height: 20,
                                bottom: 0,
                                fontStyle: 'italic',
                                fontSize: 11,
                                color: "rgba(0,0,0,.2)"
                            }}>Created by Edward Wong, Powered by Coding101</Text>
                        </View>
                    </Content>
                </Container>


            )
        }

    }
}
/**
 * <View style={{
                    height: Dimensions.get('window').height
                }}>
                    <View style={{ flex: 1 }}>
                        <Image resizeMode='cover' source={require('../assets/64c95c_9e9740e1b30c4d8fbb2a89bf63d60d23_mv2_d_1200_1600_s_2.jpg')}>

                        </Image>
                        <Left>
                            <Button transparent onPress={() => this.state.CloseDrawerFunction()}>
                                <Icon name='ios-close' />
                            </Button>
                        </Left>
                    </View>
                    <View style={{ flex: 2 }}>
                        <FlatList
                            scrollEnabled={false}
                            data={this.state.Childrens}
                            renderItem={({ item }) => item}
                        />
                    </View>
                </View>
 */