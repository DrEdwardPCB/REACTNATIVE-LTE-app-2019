import React, { Component } from 'react'
import { Container, Header, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Cards, Item, CardItem, Accordion } from 'native-base'
import { View, StyleSheets, AsyncStorage, Platform, Image, ImageBackground, Dimensions, SafeAreaView } from 'react-native'
import registerForPushNotificationsAsync from '../Tools/expoNotification'
import { Notifications } from 'expo'
import ScreenWrapper from '../Tools/ScreenWrapper'
import { Video } from 'expo-av'
import QuickStorageSvc from '../Tools/QuickStorage'
import Modal, { ModalContent, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals'
import Lightbox from 'react-native-lightbox';

export default class HomeScreen extends Component {
    state = {
        userid: 1,
    }
    setUserId = (id) => {
        console.log("settinguserid")
        console.log(id)
        QuickStorageSvc.setUserid(id)
        this.setState({ userid: id })
    }
    render() {
        return (
            <ScreenWrapper Screen="HomeScreen" navigation={this.props.navigation} userid={this.state.userid}>
                <HomeScreenContent passUpToken={this.setUserId} navigation={this.props.navigation} />
            </ScreenWrapper>
        )
    }

}
class HomeScreenContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMap: false,
            navigation: this.props.navigation
        }
    }
    dataArray = [
        { title: "Booth Info", content: 'Exhibitor Name: Binary Creation Limited\nBooth Number: F34' },
        { title: "Company Info", content: 'Binary Creation Limited (Coding101) is established by a group of IT and education professionals who aim at providing the best quality STEM education to school children and being a trusted and reliable STEM and Coding Education Partner. We provide one-stop STEM solution for schools including courses, teaching materials and training, STEM Lab ideas, other activities and workshops support and also different competitions. \n\nWe have instructed over 50000 student hours in STEM and coding education and serviced over 250 Schools in Hong Kong and Macau. Moreover, being one of the start up company in Hong Kong Science Park, we own our own development -- ObjectBlocks programming platform and advocating universal maker education.\n\nCoding101 由一群從事科技及教育事業的專才所創立，一直致力成為值得信賴的STEM和編程教育合作夥伴，為學校提供一站式方案，可配合要求訂製所需課程、教學配套、設計Lab、課程及其他活動支援，亦不時舉辨教師工作坊及比賽。為本港學生提供優質的教育課程及配套資源。現已服務了超過250間中小學，50000個教學小時。作為本地初創公司之一，我們亦有自家產品研發（Objectblocks編程平台）及推崇普及創客教育。' }
    ]
    componentDidMount() {
        this.executeNotification()
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        this.getUserCredential()
    }
    async getUserCredential() {
        try {
            const rawdata = await AsyncStorage.getItem('usercredential')
            if (rawdata != null) {
                const data = JSON.parse(rawdata)
                QuickStorageSvc.setName(data.name)
                QuickStorageSvc.setEmail(data.email)
                QuickStorageSvc.setPhone(data.phone)
                QuickStorageSvc.setSchool(data.school)
            }
        } catch (err) {

        }
    }
    _handleNotification = (notification) => {
        this.setState({ notification: notification });
    };
    executeNotification = async () => {
        const hasNotification = await this.getToken()
        var userid = await this.getUserid()
        if (userid == 0) {
            userid = Math.round(Math.random() * 100000000).toString()
        }
        console.log(hasNotification)
        if (!hasNotification) {
            const token = await registerForPushNotificationsAsync(userid)
            console.log(token)
            await this.storeToken(token, userid)

        }
        this.props.passUpToken(userid)
    }
    getToken = async () => {
        console.log("getting token")
        try {
            const data = await AsyncStorage.getItem("expoNotificationToken")
            console.log(data)
            if (data != null) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }
    getUserid = async () => {
        console.log("getting userid")
        try {
            const data = await AsyncStorage.getItem("userid")
            console.log(data)
            if (data != null) {
                return (data)
            }
            return 0
        } catch (err) {
            return 0
        }
    }
    storeToken = async (token, id) => {
        try {
            await AsyncStorage.setItem("expoNotificationToken", token)
            await AsyncStorage.setItem("userid", id)
            //alert("successfully saved data")
        } catch (err) {
            alert("there is an error occur while setting up notification")
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.openControlPanel()}>
                            <Icon name="md-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Coding101</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    <View style={{ height: Dimensions.get('window').height * 0.3 }}>{/** this is the picture */}

                        <Video
                            source={require('../assets/homepage/coding101_app.mp4')}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="contain"
                            shouldPlay
                            isLooping
                            style={{ width: '100%', height: '100%' }}
                        />

                        {/*}
                        <ImageBackground
                            style={{ width: '100%', height: '100%' }}
                            source={require('../assets/homepage/Photo.png')}
                            resizeMode='cover'
                        >
                        </ImageBackground>
                        {*/}
                    </View>
                    <View style={{ height: Dimensions.get('window').height }}>{/** this is the info */}
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <View style={{ flex: 3, paddingTop: 20 }}>{/**booth */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>LTE Booth: F34</Text>
                            </View>
                            <View style={{ flex: 2, padding: 10 }}>{/**floorplan button */}
                                <Button
                                    onPress={() => { this.setState({ showMap: true }) }}
                                >
                                    <Text>Floor Plan</Text>
                                    <Modal
                                        width={0.9}
                                        visible={this.state.showMap}
                                        rounded
                                        actionsBordered
                                        onTouchOutside={() => {
                                            this.setState({ showMap: false });
                                        }}
                                        modalTitle={
                                            <ModalTitle
                                                title="Floor Plan"
                                                align="left"
                                            />
                                        }
                                        footer={
                                            <ModalFooter>
                                                <ModalButton
                                                    text="OK"
                                                    bordered
                                                    onPress={() => {
                                                        this.setState({ showMap: false });
                                                    }}
                                                    key="button-2"
                                                />
                                            </ModalFooter>
                                        }
                                    >
                                        <ModalContent
                                            style={{ backgroundColor: '#fff', height: Dimensions.get('window').height * 0.5 }}
                                        >


                                            <Lightbox>
                                                <Image
                                                    style={{ width: '100%', height: '100%' }}
                                                    source={require('../assets/homepage/floorplan.png')}
                                                />
                                            </Lightbox>

                                        </ModalContent>
                                    </Modal>
                                </Button>
                            </View>


                            <View style={{ flex: 2, padding: 10 }}>{/**workshop shortcut */}
                                <Button
                                    onPress={() => { this.state.navigation.navigate('WorkShopScreen') }}
                                >
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>Hands-on session</Text>
                                </Button>
                            </View>
                        </View>


                        <View style={{
                            flex: 3, margin: 10,
                            padding: 10,
                            marginTop: 0,
                            flexDirection: "row"
                        }}>
                            <View style={{ flex: 4, borderColor: 'black', borderRightWidth: 1, padding: 20 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/Coding101logo.png')}
                                />
                            </View>
                            <View style={{ flex: 5, justifyContent: 'center', paddingLeft: 20 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left' }}>{"Trusted STEM\nand Coding\nEducation Partner"}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 3, margin: 10, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            borderRadius: 5,
                            backgroundColor: 'rgb(230,230,230)',
                            flexDirection: "row"
                        }}>
                            <View style={{ flex: 1, padding: 20 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/icons8-data-96.png')}
                                />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' }}>Established in 2014</Text>
                            </View>
                        </View>


                        <View style={{
                            flex: 3, margin: 10, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            borderRadius: 5,
                            backgroundColor: 'rgb(230,230,230)',
                            flexDirection: "row"
                        }}>
                            <View style={{ flex: 1, padding: 20 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/icons8-timetable-96.png')}
                                />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' }}>{"Instructed over 50000\nstudent hours in STEM\nand coding education"}</Text>
                            </View>

                        </View>

                        <View style={{
                            flex: 3, margin: 10, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                            borderRadius: 5,
                            backgroundColor: 'rgb(230,230,230)',
                            flexDirection: "row"
                        }}>
                            <View style={{ flex: 1, padding: 20 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/icons8-classroom-96.png')}
                                />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' }}>{"Serviced 250+ Schools\nin Hong Kong"}</Text>
                            </View>
                        </View>


                        <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' }}>{"*Coding101 is a HONG Kong Science and\nTechnology Park Partner Company"}</Text>
                        </View>


                    </View>
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>More on our company</Text>

                        <Accordion dataArray={this.dataArray} />
                    </View>

                    <View style={{ height: Dimensions.get('window').height * 0.4 }}>{/** this is the Education partner */}
                        <View style={{ flex: 1, paddingLeft: 20, paddingBottom: 10, justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Our Education Partner</Text>
                        </View>
                        <View style={{ flex: 3, flexWrap: 'wrap', flexDirection: 'row' }}>{/**education partner */}
                            <View style={{ width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4 / 3447 * 737, padding: 2 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/Partnericon/microsoft_PNG16.png')}
                                />
                            </View>
                            <View style={{ width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4 / 4421 * 1135, padding: 2 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/Partnericon/makeblock.png')}
                                />
                            </View>
                            <View style={{ width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4 / 1714 * 983, padding: 2 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/Partnericon/Metas-邁特思-Logo-2.png')}
                                />
                            </View>
                            <View style={{ width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4 / 829 * 309, padding: 2 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/Partnericon/Untitled-1.png')}
                                />
                            </View>
                            <View style={{ width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4 / 400 * 175, padding: 2 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/Partnericon/codingGalaxy_logotype.png')}
                                />
                            </View>
                            <View style={{ width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4, padding: 2 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/Partnericon/codekingdoms.png')}
                                />
                            </View>
                            <View style={{ width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4 / 1200 * 538, padding: 2 }}>
                                <Image
                                    resizeMode='contain'
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../assets/homepage/Partnericon/logo.png')}
                                />
                            </View>
                        </View>
                    </View>
                </Content>
                {/*<Footer>
                    <Button
                        onPress={async()=>{
                            AsyncStorage.removeItem("expoNotificationToken")
                            AsyncStorage.removeItem("userid")
                            AsyncStorage.removeItem("jointedEventId")
                        }}
                    >
                        <Text>clear async storage</Text>
                    </Button>
                    </Footer>*/}
            </Container >
        )
    }
}