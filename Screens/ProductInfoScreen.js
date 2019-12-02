import React, { Component } from 'react'
import { Container, Header, Input, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Cards, Item, CardItem, Label, Tab, Tabs, ScrollableTab, Card, Picker, Textarea } from 'native-base'
import { View, StyleSheet, AsyncStorage, Image, Linking, Dimensions, ImageBackground, TextInput, ScrollView, SafeAreaView, Keyboard, Animated } from 'react-native'
import ScreenWrapper from '../Tools/ScreenWrapper'

import Lightbox from 'react-native-lightbox';
import QuickStorageSvc from '../Tools/QuickStorage'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal, { ModalContent, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals'
import firebaseSvc from '../firebaseSvc'
import LegalStatementSvc from '../Tools/LegalStatement'
import { Platform } from '@unimodules/core'
export default class ProductInfoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navigation: props.navigation
        }
        //console.log(this.props.navigation)
    }
    render() {
        return (
            <ScreenWrapper Screen="ProductInfoScreen" navigation={this.state.navigation}>
                <ProductInfoScreenContent navigation={this.state.navigation} />
            </ScreenWrapper>
        )
    }
}
class ProductInfoScreenContent extends Component {
    constructor(props) {
        super(props)
        //console.log(this.props.navigation)
    }
    state = {
        navigation: this.props.navigation,
        entries: [
            {
                title: 'ObjectBlocks',
                text: 'ObjectBlocks is designed and ideal for all stages in IoT Projects. Including a hardware micro-controller board that simplifies Arduino interfaces to components, a block-based plus syntax-based programming interface and a real-time data dashboard for Arduino and Raspberry Pi. Students and makers might construct their DIY projects by easing the learning curve of hardware and coding.',
                imageurl: require('../assets/productinfo/ob.png'),
                that: this
            },
            {
                title: 'Google AIY Kits',
                text: ' With the Google AIY Voice/Vision Kits, students could build the artificial intelligence project with a standalone voice or vision recognition system using the Google Assistant. Moreover, Python is a popular programming language for Machine Learning as it is comparatively easier to learn than most of the other languages.',
                imageurl: require('../assets/productinfo/GoogleAIYKit.png'),
                that: this
            },
            {
                title: 'Meowbit',
                text: "Meowbit is a card-sized graphical retro game computer with allows you coding with Makecode arcade and Python. Creating video games with Makecode's unique block programming interfaces and download students’ own games to a game-boy like console to play offline. Students may show their work to their friends and family offline.",
                imageurl: require('../assets/productinfo/Meowbit.png'),
                that: this
            },
            {
                title: 'Minecraft',
                text: ' Minecraft is a multiplayer 3D online game creation platform that promotes creativity, collaboration, and problem-solving in an immersive environment. Partnered with Minecraft Education Edition and Code Kingdom, students will learn how to program a Minecraft mod for their own mini games with block programming interface.',
                imageurl: require('../assets/productinfo/MinecraftHeader.png'),
                that: this
            },
            {
                title: 'Paper Craft',
                text: '*Suitable for Primary School students\n \n~Service:\n- Hand-crafted Course\n- Hand-crafted Workshop\n \nHand-crafted Kits are unplugged learning materials which is suitable for younger age children. Students are asked to build their own DIY model with their knowledge and creativity based on different science topics such as Balance and Pivot, Center of gravity and Closed circuit etc. After the class, students can bring their work home. Through the process of “trial and error”, students must test and modify their own model with the science concepts. We encourage students to think out of the box and thus increase their motivation in learning.',
                imageurl: require('../assets/productinfo/Papercraft.png'),
                that: this
            },
            {
                title: 'Coding Galaxy',
                text: "*Suitable for Primary School students\n \n~Service:\n- Coding Galaxy Course\n- Coding Galaxy Workshop\n \nCoding Galaxy is a comprehensively designed curriculum combined with unplugged classroom activities and a gamified learning app enables teachers to create interactive teaching in a fun and immersive learning environment. There is a collaboration mode for students solve missions together through teamwork. Also, the monitor and evaluate help teacher to trace and control students' progress with ease.",
                imageurl: require('../assets/productinfo/codinggalaxy.png'),
                that: this
            },
            {
                title: 'AR/VR courseware',
                text: '*Suitable for Primary School and Secondary School students\n \n~Service:\n- AR/VR Course\n- AR/VR Workshop\n- AR/VR Course guidelines \n \nIntegrating Virtual Reality (VR) and Augmented Reality (AR) technology with learning and teaching, AR/VR courseware allows 360° observation of 3D objects to aid students get a better grasp of understanding various topics and subjects while being immersed in VR scenes without geographical or time boundaries to provide a greater visual impact, direct sensory imagery and deeper impression of knowledge points.',
                imageurl: require('../assets/productinfo/vr.png'),
                that: this
            },
            {
                title: 'micro:bit',
                text: '*Suitable for Primary School and Secondary School students\n \n~Service:\n- Programming / project develop Course\n- Programming / project develop Workshop\n- Creative Competition\n \nThe Micro:bit is an open source hardware ARM-based embedded system which is suitable for students learning primary coding and programming concept, is very famous STEM education tool in Hong Kong. ',
                imageurl: require('../assets/productinfo/microbit.png'),
                that: this
            },
            {
                title: 'Makeblock',
                text: 'mBot is an easy-to-run robot kit for kids to get hands-on experience about graphical programming, electronics, robotics. It is an all-in-one solution for robotics learning and designed for STEM education. Being the first partner of Makeblock, we have accumulated rich experience in teaching mBot courses.\nHaloCode is a wireless single board computer. With its built-in Wi-Fi support and microphone, the students can easily bring your board into the IoT projects and add speech recognition ability to it.',
                imageurl: require('../assets/productinfo/makeblock.png'),
                that: this
            },

        ],
        activeSlide: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        selected: 'ObjectBlocks',
        name: QuickStorageSvc.getName(),
        email: QuickStorageSvc.getEmail(),
        remarks: '',
        school: QuickStorageSvc.getSchool(),
        phone: QuickStorageSvc.getPhone(),
        TermsVisible: false,
        visible: false
    }
    _renderItem({ item, index }) {
        //console.log(item.that.state.selected)
        return (<CarouselItem
            data={item}
            index={index}
            onPressLearnMore={item.that.onPressLearnMore}
        />)
    }
    onPressLearnMore = () => {
        this.setState({ visible: true })
    }
    parseText = (text) => {
        return text.split('\n').reduce((accum, val) => {
            var value = val
            if (val.charAt(0) == "~") {
                value = <Text style={{ fontWeight: 'bold' }}>{val.substring(1)}</Text>
            }
            accum.push(<Text style={{ textAlign: 'justify' }}>{value}</Text>)
            //accum.push(<Text style={{ textAlign: 'justify' }}>{'\n'}</Text>)
            return accum
        }, [])

    }
    renderBottom = (id) => {
        if (id == 0) {
            return (<ObjectBlocks navigation={this.state.navigation} />)
        } else if (id == 1) {
            return (<GoogleAIYKits navigation={this.state.navigation} />)
        } else if (id == 2) {
            return (<Meowbit navigation={this.state.navigation} />)
        } else if (id == 3) {
            return (<Minecraft navigation={this.state.navigation} />)
        } else if (id == 8) {
            return (<Makeblock navigation={this.state.navigation} />)
        }
        else {
            return (
                <View style={{ padding: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>{this.state.entries[id].title}</Text>
                    {this.parseText(this.state.entries[id].text)}
                </View>)
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
                        <Title>Product Info</Title>
                    </Body>
                    <Right />
                </Header>
                <Content scrollEnabled={false}>

                    <View style={{ height: this.state.height * 0.4 }}>{//carousell
                    }
                        <Carousel
                            data={this.state.entries}
                            renderItem={this._renderItem}
                            onSnapToItem={(index) => {
                                this.setState({ activeSlide: index, selected: this.state.entries[index].title })
                            }}
                            sliderWidth={this.state.width}
                            itemWidth={this.state.width * 0.8}
                            loop={true}
                        />
                        <Pagination
                            dotsLength={this.state.entries.length}
                            activeDotIndex={this.state.activeSlide}
                            containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.92)'
                            }}
                            inactiveDotStyle={{
                                // Define styles for inactive dots here
                            }}


                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />

                    </View>

                    <View style={{ borderBottomWidth: 1, margin: 10, borderColor: 'rgba(10,10,10,.2)' }}></View>
                    <View style={{ height: this.state.height * 0.5, padding: 10 }}>{//contact us request for further info form
                    }
                        <ScrollView>
                            {this.renderBottom(this.state.activeSlide)}
                        </ScrollView>
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
                    </View>
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
                                            <Item>
                                                <View style={{ flex: 1 }}>
                                                    <Text>
                                                        Topics:
                                    </Text>
                                                    <Text note>
                                                        The thing that you are interested
                                    </Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Picker
                                                        mode="dropdown"
                                                        iosHeader="Topics"
                                                        iosIcon={<Icon name="arrow-down" />}
                                                        selectedValue={this.state.selected}
                                                        onValueChange={value => this.setState({ selected: value })}
                                                    >
                                                        <Picker.Item label="ObjectBlocks" value="ObjectBlocks" />
                                                        <Picker.Item label="Google AIY Kits" value="Google AIY Kits" />
                                                        <Picker.Item label="Meowbit" value="Meowbit" />
                                                        <Picker.Item label="Minecraft" value="Minecraft" />
                                                        <Picker.Item label="Paper Craft" value="Paper Craft" />
                                                        <Picker.Item label="Coding Galaxy" value="Coding Galaxy" />
                                                        <Picker.Item label="VR courseware" value="VR courseware" />
                                                        <Picker.Item label="Micro:bit" value="Micro:bit" />
                                                        <Picker.Item label="Makeblock" value="Makeblock" />
                                                        <Picker.Item label="Others" value="Others" />
                                                    </Picker>
                                                </View>

                                            </Item>
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
                                                <Label>Email*</Label>
                                                <Input value={this.state.email}
                                                    onChangeText={val => {
                                                        //console.log(val)
                                                        this.setState({ email: val })
                                                    }}
                                                />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label>School / Organization*</Label>
                                                <Input value={this.state.school}
                                                    onChangeText={val => {
                                                        //console.log(val)
                                                        this.setState({ school: val })
                                                    }}
                                                />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label>Phone</Label>
                                                <Input value={this.state.phone}
                                                    onChangeText={val => {
                                                        //console.log(val)
                                                        this.setState({ phone: val })
                                                    }}
                                                />
                                            </Item>
                                            <Textarea value={this.state.remarks}
                                                onChangeText={val => {
                                                    //console.log(val)
                                                    this.setState({ remarks: val })
                                                }}
                                                style={{ marginLeft: 10 }} rowSpan={2} bordered placeholder="Remarks" />
                                        </Form>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>

                                            <View style={{ flex: 1, padding: 10 }}>
                                                <Button style={{ alignSelf: 'center' }}
                                                    onPress={() => {
                                                        if (this.state.email == '') {
                                                            alert("You must fill in your email address")
                                                        } else if (this.state.name == '') {
                                                            alert("You must fill in your name")
                                                        } else if (this.state.school == '') {
                                                            alert("You must fill in your school or organization")
                                                        }
                                                        else {
                                                            firebaseSvc.RequestForInformation(QuickStorageSvc.getUserid(), this.state.name, this.state.email, this.state.school, this.state.phone, this.state.remarks, this.state.selected, (status) => {
                                                                //console.log(status)
                                                                if (status !== 'fail') {
                                                                    QuickStorageSvc.setEmail(this.state.email)
                                                                    QuickStorageSvc.setName(this.state.name)
                                                                    QuickStorageSvc.setSchool(this.state.school)
                                                                    QuickStorageSvc.setPhone(this.state.phone)
                                                                    QuickStorageSvc.storeAsync(() => {
                                                                        alert("Successfully submit request, we shall contact you soon")
                                                                    },
                                                                        () => { alert("An error has occured") }
                                                                    )

                                                                } else {
                                                                    alert("An error has occured")
                                                                }
                                                            })
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
class CarouselItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: props.data,
            index: props.index,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            status: props.status,
            visible: false,
        }

    }

    //keyboard stuff


    render() {
        return (
            <Card style={{
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                height: '90%',
                padding: 0
            }}

            >
                <CardItem cardBody style={{ height: '100%', width: '100%', margin: 0, borderWidth: 0, padding: 0, borderRadius: 10, }}>
                    <ImageBackground style={{ height: '100%', width: '100%', margin: 0, borderRadius: 10, borderWidth: 0, flexDirection: 'row-reverse' }} imageStyle={{ borderRadius: 10 }} resizeMode='cover' source={this.state.item.imageurl}>
                        <View style={{ width: '50%', height: '100%', backgroundColor: 'rgba(50,50,50,.75)', borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 15 }}>
                            <Text style={{ color: 'white', fontSize: Platform.OS == 'ios' ? 21 : 18, fontWeight: 'bold', paddingBottom: 20, borderBottomWidth: 1, marginHorizontal: 1, borderColor: 'rgba(255,255,255,.9)' }}>{this.state.item.title}</Text>
                            <Button
                                primary
                                style={{ margin: 5, alignSelf: 'center' }}
                                onPress={() => { this.props.onPressLearnMore() }}
                            >
                                <Body>
                                    <Text style={{ color: 'white' }}>Learn More</Text>
                                </Body>
                            </Button>
                        </View>
                    </ImageBackground>
                </CardItem>


            </Card>
        )
    }
}


class ObjectBlocks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navigation: props.navigation,
            modal1: false,
            modal2: false,
            modal3: false,
        }
        //console.log(this.state.navigation)
    }
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>ObjectBlocks</Text>
                    </View>

                    <Button
                        style={{ flex: 1.5 }}
                        onPress={() => { this.state.navigation.navigate('WorkShopScreen') }}
                    >
                        <Text style={{ fontSize: 12 }}>Hands-on session available</Text>
                        <Icon name='ios-arrow-forward'></Icon>
                    </Button>
                </View>
                <View style={{ flexDirection: 'row' }}>{/**press to youtube */}
                    <View style={{ flex: 1, marginBottom: 15, marginLeft: 30, alignSelf: 'center' }}>
                        <Button
                            rounded
                            style={{ backgroundColor: '#FF0000', height: 50, width: 50, alignItems: 'center' }}
                            onPress={() => Linking.openURL('https://www.youtube.com/watch?v=r6rHKXY0o3g')}
                        >
                            <Icon name="logo-youtube" style={{ color: 'white', fontSize: 18 }} />
                        </Button>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Short introduction on Youtube</Text>
                    </View>
                </View>

                <Text style={{ marginBottom: 10 }}>*Suitable for Secondary School to Teritary students</Text>
                <Text style={{ flex: 1, color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: Platform.OS == 'ios' ? 15 : 0 }}>ObjectBlocks x Partners(Click to learn more)</Text>
                <View style={{ height: Dimensions.get('window').height * 0.3, marginBottom: 10 }}>{/** */}


                    <View style={{
                        flex: 3, margin: 3, shadowColor: "#000",
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
                    }}

                    >
                        <View style={{ flex: 1, padding: 5 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/thinkxtra.png')}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ flex: 2, fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>ThinkXtra</Text>
                            <Button
                                transparent
                                style={{ flex: 1 }}
                                onPress={() => this.setState({ modal1: true })}
                            >
                                <Icon name='ios-arrow-forward'></Icon>
                            </Button>
                        </View>

                        <Modal
                            width={0.9}
                            visible={this.state.modal1}
                            rounded
                            actionsBordered
                            onTouchOutside={() => {
                                this.setState({ modal1: false });
                            }}
                            modalTitle={
                                <ModalTitle
                                    title="ThinkXtra - Sigfox application case"
                                    align="left"
                                />
                            }
                            footer={
                                <ModalFooter>
                                    <ModalButton
                                        text="OK"
                                        bordered
                                        onPress={() => {
                                            this.setState({ modal1: false });
                                        }}
                                        key="button-2"
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent
                                style={{ backgroundColor: '#fff' }}
                            >
                                <View style={{ padding: 5 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>ObjectBlocks</Text>
                                    <Text style={{textDecorationLine:'underline'}}>{'United Christian College’s Campus Environment'}</Text>
                                    <View style={{width:'100%', height:170,marginBottom: 10, marginTop: 10}}>
                                    <Lightbox>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width:null, height:"100%"  }}
                                            source={require('../assets/productinfo/sigfoxcase.png')}
                                        />
                                    </Lightbox>
                                    </View>
                                    <Text>{'IoT WAN technology with wider wireless coverage\nUsing Sigfox (Low Power Band IoT), schools are allowed to build a customized dashboard to overview the campus environment in a big screen.\n \nUsing Sigfox, a simulated 5G environment can be built for students to create more Smart Campus Projects.'}</Text>
                                </View>
                            </ModalContent>
                        </Modal>
                    </View>
                    <View style={{
                        flex: 3, margin: 3, shadowColor: "#000",
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
                    }}

                    >
                        <View style={{ flex: 1, padding: 5 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/abtitu.png')}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ flex: 2, fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Abtitu</Text>
                            <Button
                                transparent
                                style={{ flex: 1 }}
                                onPress={() => this.setState({ modal2: true })}
                            >
                                <Icon name='ios-arrow-forward'></Icon>
                            </Button>
                        </View>

                        <Modal
                            width={0.9}
                            visible={this.state.modal2}
                            rounded
                            actionsBordered
                            onTouchOutside={() => {
                                this.setState({ modal2: false });
                            }}
                            modalTitle={
                                <ModalTitle
                                    title="abtitu"
                                    align="left"
                                />
                            }
                            footer={
                                <ModalFooter>
                                    <ModalButton
                                        text="OK"
                                        bordered
                                        onPress={() => {
                                            this.setState({ modal2: false });
                                        }}
                                        key="button-2"
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent
                                style={{ backgroundColor: '#fff' }}
                            >
                                <View style={{ padding: 5 }}>
                                    <Text>
                                        {'Create iOS & Android app without coding. Abtitu is a mobile app builder where students can custom their app by drag & drop and also connect to IoT in a minute. It runs on the latest internet browsers.\n \nDeveloper could build a Smart Campus using ObjectBlocks and apps to control or monitor the environment of the school. For example, turn on the light and air conditioner remotely before the class starts. Students could learn more through daily life.'}
                                    </Text>
                                    <View style={{ margin: 15, marginBottom: 30 }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Service:</Text>
                                        <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Course</Text></View></View>
                                        <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Workshop</Text></View></View>
                                        <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Develop customized project</Text></View></View>
                                    </View>
                                </View>
                            </ModalContent>
                        </Modal>
                    </View>
                    <View style={{
                        flex: 3, margin: 3, shadowColor: "#000",
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
                    }}

                    >
                        <View style={{ flex: 1, padding: 5 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/kuju.png')}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ flex: 2, fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>KUJU</Text>
                            <Button
                                transparent
                                style={{ flex: 1 }}
                                onPress={() => this.setState({ modal3: true })}
                            >
                                <Icon name='ios-arrow-forward'></Icon>
                            </Button>
                        </View>

                        <Modal
                            width={0.9}
                            visible={this.state.modal3}
                            rounded
                            actionsBordered
                            onTouchOutside={() => {
                                this.setState({ modal3: false });
                            }}
                            modalTitle={
                                <ModalTitle
                                    title="KUJU"
                                    align="left"
                                />
                            }
                            footer={
                                <ModalFooter>
                                    <ModalButton
                                        text="OK"
                                        bordered
                                        onPress={() => {
                                            this.setState({ modal3: false });
                                        }}
                                        key="button-2"
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent
                                style={{ backgroundColor: '#fff' }}
                            >
                                <View style={{ padding: 5 }}>
                                    <View style={{ flexDirection: 'row', margin: 10 }}>{/**press to youtube */}
                                        <View style={{ flex: 1 }}>
                                            <Button
                                                rounded
                                                style={{ backgroundColor: '#FF0000', height: 50, width: 50, alignItems: 'center' }}
                                                onPress={() => Linking.openURL('https://www.youtube.com/watch?v=lZj7OsWEuFU&t=12s')}
                                            >
                                                <Icon name="logo-youtube" style={{ color: 'white', fontSize: 18 }} />
                                            </Button>
                                        </View>
                                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: 'bold' }}>Short introduction on Youtube</Text>
                                        </View>
                                    </View>
                                    <Text>
                                        {'Cooperating with KUJU, IoT projects build with ObjectBlocks can be used in classes as well as in real life. KUJU Smart Plug is now controllable with ObjectBlocks, which is the very first step to start a Smart home, Smart campus or Smart city project in real life.'}
                                    </Text>
                                    <View style={{ margin: 15, marginBottom: 30 }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Service:</Text>
                                        <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Course</Text></View></View>
                                        <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Workshop</Text></View></View>
                                        <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Develop customized project</Text></View></View>
                                    </View>
                                </View>
                            </ModalContent>
                        </Modal>
                    </View>
                </View>
                <Text>ObjectBlocks is designed and ideal for all stages in IoT projects which features the followings:</Text>
                <View style={{ margin: 15 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>✓ </Text></View><View style={{ flex: 11 }}><Text><Text style={{ fontWeight: 'bold' }}>wireless code upload</Text> to Arduino and Raspberry Pi;</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>✓ </Text></View><View style={{ flex: 11 }}><Text><Text style={{ fontWeight: 'bold' }}>Block programming </Text> (Arduino C and Python codes);</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>✓ </Text></View><View style={{ flex: 11 }}><Text>Highly <Text style={{ fontWeight: 'bold' }}>customisable data dashboard</Text> with real-time and historical data and controls;</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>✓ </Text></View><View style={{ flex: 11 }}><Text><Text style={{ fontWeight: 'bold' }}>Google AIY Voice / Vision kits</Text> for AI projects;</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>✓ </Text></View><View style={{ flex: 11 }}><Text><Text style={{ fontWeight: 'bold' }}>external IOT devices through IFTTT</Text> and <Text style={{ fontWeight: 'bold' }}>KUJU smart devices;</Text></Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>✓ </Text></View><View style={{ flex: 11 }}><Text><Text style={{ fontWeight: 'bold' }}>Inter-board communications;</Text></Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>✓ </Text></View><View style={{ flex: 11 }}><Text>Compatible with <Text style={{ fontWeight: 'bold' }}>PC, tablets and</Text><Text style={{ fontWeight: 'bold' }}> any devices</Text> to Arduino and Raspberry Pi;</Text></View></View>

                </View>
                <Text>Students and makers might construct their DIY projects by easing the learning curve of hardware and coding.</Text>
                <View style={{ margin: 15, marginBottom: 30 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Service:</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>IoT / Robotic / AIoT Course: With available kit set</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>IoT / AIoT Workshop</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>IoT / AIoT Competition</Text></View></View>
                </View>
                <View style={{ height: Dimensions.get('window').height * 0.3, marginBottom: 30 }}>
                    <Text style={{ flex: 1, color: 'black', fontWeight: 'bold', fontSize: 18, }}>Our Dealer:</Text>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/gcr-logo.png')}
                            />
                        </View>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/Gravitylink.png')}
                            />
                        </View>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/hkbroadband.png')}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/supertrack.png')}
                            />
                        </View>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/wecl.png')}
                            />
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}
class GoogleAIYKits extends Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Google AIY Kits</Text>
                    </View>

                    <Button
                        style={{ flex: 1.5 }}
                        onPress={() => { this.props.navigation.navigate('WorkShopScreen') }}
                    >
                        <Text style={{ fontSize: 12 }}>Hands-on session available</Text>
                        <Icon name='ios-arrow-forward'></Icon>
                    </Button>
                </View>

                <Text>*Suitable for Secondary School to Teritary students</Text>
                <View style={{ margin: 15, marginBottom: 30 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Service:</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>AIoT / Python Course: With package</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>AIoT / Python Workshop</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>AIoT / Python Competition</Text></View></View>
                </View>
                <Text style={{ margin: 15, marginBottom: 30 }}>With the Google AIY Voice/Vision Kits, students could build the artificial intelligence(AI) project with a standalone voice or vision recognition system using the Google Assistant and Raspberry Pi. </Text>
                <Text style={{ margin: 15, marginBottom: 30 }}>*Supported by ObjectBlocks Platform </Text>
                <View style={{ height: Dimensions.get('window').height * 0.15, marginBottom: 30 }}>
                    <Text style={{ flex: 1, color: 'black', fontWeight: 'bold', fontSize: 18, }}>Our Partner:</Text>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/Gravitylink.png')}
                            />
                        </View>

                    </View>
                </View>

            </View>
        )
    }
}
class Meowbit extends Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Meowbit</Text>
                    </View>

                    <Button
                        style={{ flex: 1.5 }}
                        onPress={() => { this.props.navigation.navigate('WorkShopScreen') }}
                    >
                        <Text style={{ fontSize: 12 }}>Hands-on session available</Text>
                        <Icon name='ios-arrow-forward'></Icon>
                    </Button>
                </View>

                <Text>*Suitable for Secondary School to Teritary students</Text>
                <View style={{ margin: 15, marginBottom: 30 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Service:</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Game Design Course</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Game Design Workshop</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Game Design Competition</Text></View></View>
                </View>
                <Text style={{ margin: 15, marginBottom: 30 }}>Meowbit is a card-sized graphical retro game computer with allows you coding with Makecode arcade and Python. Students are allowed to show their self-made video to their friends and family offline. </Text>

                <View style={{ height: Dimensions.get('window').height * 0.15, marginBottom: 30 }}>
                    <Text style={{ flex: 1, color: 'black', fontWeight: 'bold', fontSize: 18, }}>Our Partner:</Text>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/kittenbot.png')}
                            />
                        </View>

                    </View>
                </View>

            </View>
        )
    }
}
class Minecraft extends Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Minecraft</Text>
                    </View>
                </View>

                <Text>*Suitable for Secondary School to Teritary students</Text>
                <View style={{ margin: 15, marginBottom: 30 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Service:</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>World Design / Programming Course</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>World Design / Programming Workshop</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>World Design / Programming Competition</Text></View></View>
                </View>
                <Text style={{ margin: 15, marginBottom: 30 }}>Minecraft is a multiplayer 3D online game creation platform that promotes creativity, collaboration, and problem-solving in an immersive environment. Partnered with Minecraft Education Edition and Code Kingdom, students will learn how to program a Minecraft mod for their own mini games with block programming interface.</Text>
                <Text style={{ margin: 15, marginBottom: 30 }}>* We were the Programme Partner and provided technical support to Minecraft competition co-hosted by Microsoft and HKEdCity in LTE from 2016 to 2019. Welcome to visit the competition on 13 Dec </Text>
                <View style={{ height: Dimensions.get('window').height * 0.15, marginBottom: 30 }}>
                    <Text style={{ flex: 1, color: 'black', fontWeight: 'bold', fontSize: 18, }}>Our Partner:</Text>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/minecraft.png')}
                            />
                        </View>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/codekingdoms.png')}
                            />
                        </View>
                    </View>
                </View>
            </View>


        )
    }
}
class Makeblock extends Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Minecraft</Text>
                    </View>
                    <Button
                        style={{ flex: 1.5 }}
                        onPress={() => { this.props.navigation.navigate('WorkShopScreen') }}
                    >
                        <Text style={{ fontSize: 12 }}>Hands-on session available</Text>
                        <Icon name='ios-arrow-forward'></Icon>
                    </Button>
                </View>

                <Text>*Suitable for Secondary School to Teritary students</Text>
                <View style={{ margin: 15, marginBottom: 30 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Service:</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Programming and IoT Course</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Programming and IoT Workshop</Text></View></View>
                    <View style={{ flexDirection: 'row', marginBottom: 4 }}><View style={{ flex: 1 }}><Text>- </Text></View><View style={{ flex: 11 }}><Text>Creative / IoT Competition</Text></View></View>
                </View>
                <Text style={{ margin: 15, marginBottom: 30 }}>{'mBot is an easy-to-run robot kit for kids to get hands-on experience about graphical programming, electronics, robotics. It is an all-in-one solution for robotics learning and designed for STEM education. Being the first partner of Makeblock, we have accumulated rich experience in teaching mBot courses.\n \nHaloCode is a wireless single board computer. With its built-in Wi-Fi support and microphone, the students can easily bring your board into the IoT projects and add speech recognition ability to it.'}</Text>

            </View>


        )
    }
}
