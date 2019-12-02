import React, { Component } from 'react'
import { Container, Header, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Card, Item, CardItem, Label, Input } from 'native-base'
import firebaseSvc from '../firebaseSvc'
import { AsyncStorage, Alert, View, Dimensions, SafeAreaView, ScrollView, Animated } from 'react-native'
import QuickStorageSvc from '../Tools/QuickStorage'
import LegalStatementSvc from '../Tools/LegalStatement'
import Modal, { ModalContent, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals'

export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        item: this.props.navigation.getParam('event'),
        userid: '',
        registered: this.props.navigation.getParam('event').registered,
        name: QuickStorageSvc.getName(),
        email: QuickStorageSvc.getEmail(),
        school: QuickStorageSvc.getSchool(),
        phone: QuickStorageSvc.getPhone(),
        TermsVisible: false,
        visible: false

    }
    componentWillReceiveProps(props) {
        this.setState({ item: props.navigation.getParam('event') })
    }
    async componentDidMount() {
        try {
            const id = await AsyncStorage.getItem('userid')
            if (id !== null) {
                this.setState({ userid: id })
            }
        } catch (err) {
            alert("there is an error occur while setting up registration")
        }
    }
    handleRegister = () => {
        Alert.alert(
            'Confirmation',
            'Confirm making reservation?',
            [
                { text: 'Cancel', style: 'cancel', },
                {
                    text: 'Confirm', onPress: async () => {
                        try {
                            const partidata = await AsyncStorage.getItem("jointedEventId")
                            var mutablepartidata = []
                            console.log(partidata)
                            if (partidata != null) {
                                mutablepartidata = JSON.parse(partidata)
                            }
                            mutablepartidata.push(this.state.item.id)
                            console.log(mutablepartidata)
                            await AsyncStorage.setItem('jointedEventId', JSON.stringify(mutablepartidata))
                            const user = {
                                name: this.state.name,
                                phone: this.state.phone,
                                email: this.state.email,
                                school: this.state.school
                            }
                            firebaseSvc.registerForEvent(
                                this.state.item.id,
                                this.state.userid,
                                user,
                                () => {//success callback
                                    alert('successfully register')
                                    this.props.navigation.goBack()
                                },
                                async (errmsg) => {
                                    const partidata = await AsyncStorage.getItem("jointedEventId")
                                    var mutablepartidata = []
                                    console.log(partidata)
                                    if (partidata != null) {
                                        mutablepartidata = JSON.parse(partidata)
                                    }
                                    mutablepartidata = mutablepartidata.filter(item => { return item != this.state.item.id })
                                    console.log(mutablepartidata)
                                    await AsyncStorage.setItem('jointedEventId', JSON.stringify(mutablepartidata))
                                    alert(errmsg)
                                }
                            )
                        } catch (err) {
                            alert('Error in saving user credentials')
                        }
                    }
                },
            ],
            { cancelable: false },
        );
    }
    handleWithdraw = () => {
        Alert.alert(
            'Confirmation',
            'Confirm withdraw reservation?',
            [
                { text: 'Cancel', style: 'cancel', },
                {
                    text: 'Confirm', onPress: async () => {
                        try {
                            const partidata = await AsyncStorage.getItem("jointedEventId")
                            var mutablepartidata = []
                            //console.log(partidata)
                            if (partidata != null) {
                                mutablepartidata = JSON.parse(partidata)
                            }
                            mutablepartidata = mutablepartidata.filter(item => { return item != this.state.item.id })
                            //console.log(mutablepartidata)
                            await AsyncStorage.setItem('jointedEventId', JSON.stringify(mutablepartidata))
                            firebaseSvc.withdrawFromEvent(
                                this.state.item.id,
                                this.state.userid,
                                () => {//success callback
                                    alert('successfully withdraw')
                                    this.props.navigation.goBack()
                                },
                                async (errmsg) => {
                                    const partidata = await AsyncStorage.getItem("jointedEventId")
                                    var mutablepartidata = []
                                    //console.log(partidata)
                                    if (partidata != null) {
                                        mutablepartidata = JSON.parse(partidata)
                                    }
                                    mutablepartidata.push(this.state.item.id)
                                    //console.log(mutablepartidata)
                                    await AsyncStorage.setItem('jointedEventId', JSON.stringify(mutablepartidata))
                                    alert(errormsg)
                                }
                            )
                        } catch (err) {
                            alert('Error in saving user credentials')
                        }
                    }
                },
            ],
            { cancelable: false },
        );
    }
    renderButton = () => {
        if (this.state.registered) {
            return (
                <CardItem footer bordered>
                    <Left>
                        <Button
                            disabled={!this.state.registered}
                            onPress={() => { this.handleWithdraw() }}
                        >
                            <Text>Withdraw</Text>
                        </Button>
                    </Left><Right />
                </CardItem>
            )
        } else {
            if (this.state.item.quota == this.state.item.joint) {
                return (
                    <CardItem footer bordered>
                
                        <Body>
                            <Text note style={{textAlign:'justify'}}>The hands-on session is full, you may consider register another session or come by the counter during the session for walk-in if there are 
absentees</Text>
                        </Body>
                        
                    </CardItem>)
            } else {
                return (
                    <CardItem footer bordered>
                        <Left />
                        <Right>

                            <Button
                                disabled={this.state.registered}
                                onPress={() => { this.setState({ visible: true }) }}
                            >
                                <Text>Register</Text>
                            </Button>
                        </Right>
                    </CardItem>
                )
            }
        }
    }
    render() {
        return (
            <Container>
                <Content>
                    <Card style={{ width: Dimensions.get('window').width * 0.9, left: Dimensions.get('window').width * 0.1 / 2 }}>
                        <CardItem header bordered>
                            <Left><Title style={{ color: 'black' }}>{this.state.item.topic}</Title></Left>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <View style={{ flex: 1, padding: 20, borderRightWidth: 1, borderColor: 'rgba(0,0,0,.1)' }}>
                                <Text>Quota Left:</Text>
                                <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'rgba(0,0,0,.7)', textAlign: 'center' }}>{this.state.item.quota - this.state.item.joint}</Text>
                            </View>
                            <View style={{ flex: 3, padding: 20 }}>
                                <Text>Time: {this.state.item.startTime}-{this.state.item.endTime}</Text>
                                <Text>Venue: {this.state.item.venue}</Text>
                                <Text>Date: {this.state.item.date}</Text>
                            </View>
                        </CardItem>

                        {this.renderButton()}

                    </Card>
                    {
                        //modal start
                    }
                    <Modal
                        width={0.9}
                        visible={this.state.TermsVisible}
                        rounded
                        actionsBordered
                        onTouchOutside={() => {
                            this.setState({ TermsVisible: false });
                        }}
                        modalTitle={
                            <ModalTitle
                                title="Privacy Policy"
                                align="left"
                            />
                        }
                        footer={
                            <ModalFooter>
                                <ModalButton
                                    text="OK"
                                    bordered
                                    onPress={() => {
                                        this.setState({ TermsVisible: false });
                                    }}
                                    key="button-2"
                                />
                            </ModalFooter>
                        }
                    >
                        <ModalContent
                            style={{ backgroundColor: '#fff' }}
                        >
                            <SafeAreaView Style={{ height: Dimensions.get('window').height * 0.5 }}>

                                <View>
                                    <Text style={{ fontSize: 10 }}>
                                        {LegalStatementSvc.getPrivacyPolicy()}
                                    </Text>
                                </View>

                            </SafeAreaView>
                        </ModalContent>
                    </Modal>

                    <Modal.BottomModal
                        visible={this.state.visible}
                        onTouchOutside={() => this.setState({ visible: false })}
                        height={0.8}
                        width={1}
                        onSwipeOut={() => this.setState({ visible: false })}
                        modalTitle={<ModalTitle title='Further Info'></ModalTitle>}
                    >
                        <ModalContent
                            style={{
                                paddingTop: 15,
                                flex: 1,
                                backgroundColor: 'fff',
                            }}
                        >
                            {
                                //form of know more
                            }
                            <View style={{ maxHeight: Dimensions.get('window').height * 0.8 }}>
                                <ScrollView>
                                    <Animated.View style={{ height: Dimensions.get('window').height, paddingBottom: this.keyboardHeight }}>
                                        <Title style={{ color: 'black' }} >Let us know your needs</Title>

                                        <Form style={{ padding: 10, paddingLeft: 0 }}>
                                            <Item floatingLabel>
                                                <Label>Name*</Label>
                                                <Input value={this.state.name}
                                                    onChangeText={val => {
                                                        //console.log(val)
                                                        this.setState({ name: val })
                                                    }}
                                                />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label>Email</Label>
                                                <Input value={this.state.email}
                                                    onChangeText={val => {
                                                        //console.log(val)
                                                        this.setState({ email: val })
                                                    }}
                                                />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label>School / Organization</Label>
                                                <Input value={this.state.school}
                                                    onChangeText={val => {
                                                        //console.log(val)
                                                        this.setState({ school: val })
                                                    }}
                                                />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label>Phone*</Label>
                                                <Input value={this.state.phone}
                                                    onChangeText={val => {
                                                        //console.log(val)
                                                        this.setState({ phone: val })
                                                    }}
                                                />
                                            </Item>
                                        </Form>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>

                                            <View style={{ flex: 1, padding: 10 }}>
                                                <Button style={{ alignSelf: 'center' }}
                                                    onPress={() => {
                                                        if (this.state.phone == '') {
                                                            alert("You must fill in your phone number")
                                                        }
                                                        else if (this.state.name == '') {
                                                            alert("You must fill in your name")
                                                        }

                                                        else {
                                                            this.handleRegister()
                                                            QuickStorageSvc.setEmail(this.state.email)
                                                            QuickStorageSvc.setName(this.state.name)
                                                            QuickStorageSvc.setSchool(this.state.school)
                                                            QuickStorageSvc.setPhone(this.state.phone)
                                                            QuickStorageSvc.storeAsync(() => {
                                                                this.setState({ visible: false })
                                                            }
                                                            )
                                                        }

                                                    }}
                                                >
                                                    <Text style={{ textAlign: 'center', alignSelf: 'center' }}>Submit</Text>
                                                </Button>
                                            </View>
                                            <View style={{ flex: 2 }}>
                                                <Text note style={{ fontSize: 11, marginTop: 10 }}>By clicking the submit button you are accepting our <Text onPress={() => this.setState({ TermsVisible: true })} style={{ color: '#00f', fontSize: 11 }}>Privacy Policy.</Text></Text>
                                            </View>
                                        </View>
                                    </Animated.View>
                                </ScrollView>
                            </View>
                        </ModalContent>
                    </Modal.BottomModal>

                </Content>
            </Container>
        )
    }
}