import React, { Component } from 'react'
import { Container, Header, Input, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Cards, Item, CardItem, Label, Tab, Tabs, ScrollableTab, Card, Picker, Textarea } from 'native-base'
import { View, StyleSheet, AsyncStorage, Image, Linking, Dimensions, ImageBackground, TextInput, ScrollView, SafeAreaView, Keyboard, Animated } from 'react-native'
import ScreenWrapper from '../Tools/ScreenWrapper'
import ActionButton from 'react-native-action-button'
import QuickStorageSvc from '../Tools/QuickStorage'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Modal, { ModalContent, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals'
import firebaseSvc from '../firebaseSvc'
import LegalStatementSvc from '../Tools/LegalStatement'
export default class ProductInfoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navigation: props.navigation
        }
        console.log(this.props.navigation)
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
        console.log(this.props.navigation)
    }
    state = {
        navigation: this.props.navigation,
        entries: [
            {
                title: 'ObjectBlocks',
                text: 'ObjectBlocks is designed and ideal for all stages in IoT Projects. Including a hardware micro-controller board that simplifies Arduino interfaces to components, a block-based plus syntax-based programming interface and a real-time data dashboard for Arduino and Raspberry Pi. Students and makers might construct their DIY projects by easing the learning curve of hardware and coding.',
                imageurl: 'https://pbs.twimg.com/media/DsBCRz9VAAAslTp.jpg:large',
                that: this
            },
            {
                title: 'Google AIY Kits',
                text: ' With the Google AIY Voice/Vision Kits, students could build the artificial intelligence project with a standalone voice or vision recognition system using the Google Assistant. Moreover, Python is a popular programming language for Machine Learning as it is comparatively easier to learn than most of the other languages.',
                imageurl: 'https://i0.wp.com/www.aitle.org.hk/wp-content/uploads/2019/04/2019-04-17-Google-AIY.png?resize=399%2C173',
                that: this
            },
            {
                title: 'Meowbit',
                text: "Meowbit is a card-sized graphical retro game computer with allows you coding with Makecode arcade and Python. Creating video games with Makecode's unique block programming interfaces and download students’ own games to a game-boy like console to play offline. Students may show their work to their friends and family offline.",
                imageurl: 'https://static.wixstatic.com/media/64c95c_9be0c73cf4d24bff970cd68d27aa0e61~mv2.png/v1/fill/w_280,h_220,fp_0.13_0.52/64c95c_9be0c73cf4d24bff970cd68d27aa0e61~mv2.png'
                , that: this
            },
            {
                title: 'Minecraft',
                text: ' Minecraft is a multiplayer 3D online game creation platform that promotes creativity, collaboration, and problem-solving in an immersive environment. Partnered with Minecraft Education Edition and Code Kingdom, students will learn how to program a Minecraft mod for their own mini games with block programming interface.',
                imageurl: 'https://i.ytimg.com/vi/haOMYmnmNzc/maxresdefault.jpg'
                , that: this
            },
            {
                title: 'Paper Craft',
                text: 'Hand-crafted Kits are unplugged learning materials which is suitable for younger age children. Students are asked to build their own DIY model with their knowledge and creativity based on different science topics such as Balance and Pivot, Center of gravity and Closed circuit etc. Through the process of “trial and error”, students must test and modify their own model with the science concepts. We encourage students to think out of the box and thus increase their motivation in learning.',
                imageurl: 'https://i.ytimg.com/vi/VYZyTX8W3hg/maxresdefault.jpg'
                , that: this
            },
            {
                title: 'Coding Galaxy',
                text: "Coding Galaxy is a comprehensively designed curriculum combined with unplugged classroom activities and a gamified learning app enables teachers to create interactive teaching in a fun and immersive learning environment. There is a collaboration mode for students solve missions together through teamwork. Also, the monitor and evaluate help teacher to trace and control students' progress with ease",
                imageurl: 'https://codinggalaxy.com/images/codingGalaxy_logotype.png'
                , that: this
            },
            {
                title: 'VR courseware',
                text: 'Integrating Virtual Reality (VR) technology with learning and teaching, 101VR is both a creator tool and a VR content viewer, an application software and a sharing platform at the same time. With resources and teaching materials embedded, 101VR enables creating and editing your own VR contents.',
                imageurl: 'https://static.wixstatic.com/media/64c95c_139decc7012943f5a778df76381fcf86~mv2.jpeg/v1/fill/w_1600,h_789,al_c,q_85/64c95c_139decc7012943f5a778df76381fcf86~mv2.jpeg'
                , that: this
            },
            {
                title: 'micro:bit',
                text: 'The Micro:bit is an open source hardware ARM-based embedded system which is suitable for students learning primary coding and programming concept, is very famous STEM education tool in Hong Kong.',
                imageurl: 'https://www.kitronik.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/5/6/5613_large_bbc_microbit_board_only.jpg'
                , that: this
            },
            {
                title: 'Makeblock',
                text: 'mBot is an easy-to-run robot kit for kids to get hands-on experience about graphical programming, electronics, robotics. It is an all-in-one solution for robotics learning and designed for STEM education. Being the first partner of Makeblock, we have accumulated rich experience in teaching mBot courses.\nHaloCode is a wireless single board computer. With its built-in Wi-Fi support and microphone, the students can easily bring your board into the IoT projects and add speech recognition ability to it.',
                imageurl: 'https://static.wixstatic.com/media/983f6e_a1a526b6bb154042840d255b5911691f~mv2_d_4896_3264_s_4_2.jpg/v1/fill/w_560,h_310,al_c,q_80,usm_0.66_1.00_0.01/2017-07-16_7029_JPG.webp'
                , that: this
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
        console.log(item.that.state.selected)
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
            accum.push(<Text style={{ textAlign: 'justify' }}>{val}</Text>)
            accum.push(<Text style={{ textAlign: 'justify' }}>{'\n'}</Text>)
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
        } else {
            return (
                <View style={{ padding: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>{this.state.entries[id].title}</Text>
                    {this.parseText(this.state.entries[id].text)}
                </View>)
        }
    }
    /*componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }
    keyboardWillShow = (event) => {
        Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: event.endCoordinates.height,
        }).start();
    };

    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
        ]).start();
    };*/
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
                                                                console.log(status)
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
                    <ImageBackground style={{ height: '100%', width: '100%', margin: 0, borderRadius: 10, borderWidth: 0, flexDirection: 'row-reverse' }} imageStyle={{ borderRadius: 10 }} resizeMode='cover' source={{ uri: this.state.item.imageurl }}>
                        <View style={{ width: '50%', height: '100%', backgroundColor: 'rgba(50,50,50,.75)', borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 15 }}>
                            <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold', paddingBottom: 20, borderBottomWidth: 1, marginHorizontal: 1, borderColor: 'rgba(255,255,255,.9)' }}>{this.state.item.title}</Text>
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
        console.log(this.state.navigation)
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

                <Text>*Suitable for Secondary School to Teritary students</Text>
                <View style={{ height: Dimensions.get('window').height * 0.3, marginBottom: 10 }}>{/** */}
                    <Text style={{ flex: 1, color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>ObjectBlocks x Partners(Click to learn more)</Text>

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
                                    title="ThinkXtra"
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
                                <View>
                                    <Text>
                                    </Text>
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
                                <View>
                                    <Text>
                                        {'Abtitu is founded in 2014 by 2 co-founders with computer science background. The vision of Abtitu is to lower the entry barrier of coding and enable everyone to get excited in learning code.\n\nOur tool is a mobile app builder where you can custom your app by drag & drop and also connect to IoT in a minute. Create iOS & Android app without coding!\n\nIt runs on the latest internet browsers, and allows student to build and customize their app simply by dragging and dropping items into the visualized, event-driven Logic Tree, negating the need for coding and installing technical software.'}
                                    </Text>
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
                                <View>
                                    <Text>
                                    </Text>
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
                                source={require('../assets/productinfo/supertrack.png')}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <View style={{ width: Dimensions.get('window').width / 3 - 15, padding: 2 }}>
                            <Image
                                resizeMode='contain'
                                style={{ width: '100%', height: '100%' }}
                                source={require('../assets/productinfo/hkbroadband.png')}
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

/**
const styles = StyleSheet.create({
    actionButtonIcon: {
    fontSize: 20,
height: 22,
color: 'white',
},
});

/**
* import React, {Component} from 'react'
import {Container, Header, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Cards, Item, CardItem, Tab, Tabs, ScrollableTab, Card} from 'native-base'
import {View, StyleSheet, AsyncStorage, Image, Linking} from 'react-native'
                import ScreenWrapper from '../Tools/ScreenWrapper'
                import ActionButton from 'react-native-action-button'
                import QuickStorageSvc from '../Tools/QuickStorage'
export default class ProductInfoScreen extends Component {
    render() {
return (
<ScreenWrapper Screen="ProductInfoScreen" navigation={this.props.navigation}>
    <ProductInfoScreenContent />
</ScreenWrapper>
)
}
}
class ProductInfoScreenContent extends Component {
    constructor(props) {
    super(props)
this.state = {
    active: false
}
}
render() {
const action = [
{},
]
return (
<Container>
    <Header hasTabs>
        <Left>
            <Button transparent onPress={() => this.props.openControlPanel()}>
                <Icon name="md-menu" />
            </Button>
        </Left>
        <Body>
            <Title>ProductInfo</Title>
        </Body>
        <Right />
    </Header>
    <Tabs
        renderTabBar={() => <ScrollableTab />}
    >
        <Tab heading='ObjectBlocks'>
            <ObjectBlocks />
        </Tab>
        <Tab heading='Google AIY Kits'>
            <GoogleAIYKits />
        </Tab>
        <Tab heading='Meowbit'>
            <Meowbit />
        </Tab>
        <Tab heading='Minecraft'>
            <Minecraft />
        </Tab>
        <Tab heading='Paper Craft'>
            <PaperCraft />
        </Tab>
        <Tab heading='Coding Galaxy'>
            <CodingGalaxy />
        </Tab>
        <Tab heading='VR courseware'>
            <VRcourseware />
        </Tab>
        <Tab heading='Micro:bit'>
            <Microbit />
        </Tab>
        <Tab heading='Makeblock'>
            <Makeblock />
        </Tab>
    </Tabs>
    <ActionButton
        buttonColor="rgba(231,76,60,1)"
        renderIcon={active => active ? (<Icon style={{ color: 'white' }} name='ios-close' />) : (<Icon style={{ color: "white" }} name="git-pull-request" />)}
        degrees={0}
    >
        <ActionButton.Item
            buttonColor='#3b5998'
            title="Facebook"
            onPress={() => Linking.openURL('https://www.facebook.com/coding101.hk/')}>
            <Icon name="logo-facebook" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
            buttonColor='#FF0000'
            title="Youtube"
            onPress={() => { Linking.openURL('https://www.youtube.com/channel/UCIV0Wm7YeNI2_s-XJwoTdLA') }}>
            <Icon name="logo-youtube" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
            buttonColor='#176BEF'
            title="Website"
            onPress={() => { Linking.openURL('https://www.coding101.hk/') }}>
            <Icon name="logo-google" style={styles.actionButtonIcon} />
        </ActionButton.Item>
    </ActionButton>

</Container>
)
}
}
class ObjectBlocks extends Component {
    render() {
return (
<Card style={{ marginLeft: 10, marginRight: 10 }}>
    <CardItem>
        <Left>
            <Body>
                <Title>ObjectBlocks</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://pbs.twimg.com/media/DsBCRz9VAAAslTp.jpg:large' }} />
            <Text>
                ObjectBlocks is designed and ideal for all stages in IoT Projects. Including a hardware micro-controller board that simplifies Arduino interfaces to components, a block-based plus syntax-based programming interface and a real-time data dashboard for Arduino and Raspberry Pi. Students and makers might construct their DIY projects by easing the learning curve of hardware and coding.
        </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
class GoogleAIYKits extends Component {
    render() {
return (
<Card>
    <CardItem>
        <Left>
            <Body>
                <Title>Google AIY Kits</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://i0.wp.com/www.aitle.org.hk/wp-content/uploads/2019/04/2019-04-17-Google-AIY.png?resize=399%2C173' }} />
            <Text>
                With the Google AIY Voice/Vision Kits, students could build the artificial intelligence project with a standalone voice or vision recognition system using the Google Assistant. Moreover, Python is a popular programming language for Machine Learning as it is comparatively easier to learn than most of the other languages.
        </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
class Meowbit extends Component {
    render() {
return (
<Card>
    <CardItem>
        <Left>
            <Body>
                <Title>Meowbit</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://static.wixstatic.com/media/64c95c_9be0c73cf4d24bff970cd68d27aa0e61~mv2.png/v1/fill/w_280,h_220,fp_0.13_0.52/64c95c_9be0c73cf4d24bff970cd68d27aa0e61~mv2.png' }} />
            <Text>
                Meowbit is a card-sized graphical retro game computer with allows you coding with Makecode arcade and Python. Creating video games with Makecode's unique block programming interfaces and download students’ own games to a game-boy like console to play offline. Students may show their work to their friends and family offline.
        </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
class Minecraft extends Component {
    render() {
return (
<Card>
    <CardItem>
        <Left>
            <Body>
                <Title>Minecraft</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://i.ytimg.com/vi/haOMYmnmNzc/maxresdefault.jpg' }} />
            <Text>
                Minecraft is a multiplayer 3D online game creation platform that promotes creativity, collaboration, and problem-solving in an immersive environment. Partnered with Minecraft Education Edition and Code Kingdom, students will learn how to program a Minecraft mod for their own mini games with block programming interface.
        </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
class PaperCraft extends Component {
    render() {
return (
<Card>
    <CardItem>
        <Left>
            <Body>
                <Title>Paper Craft</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://i.ytimg.com/vi/VYZyTX8W3hg/maxresdefault.jpg' }} />
            <Text>
                Hand-crafted Kits are unplugged learning materials which is suitable for younger age children. Students are asked to build their own DIY model with their knowledge and creativity based on different science topics such as Balance and Pivot, Center of gravity and Closed circuit etc. Through the process of “trial and error”, students must test and modify their own model with the science concepts. We encourage students to think out of the box and thus increase their motivation in learning.
        </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
class CodingGalaxy extends Component {
    render() {
return (
<Card>
    <CardItem>
        <Left>
            <Body>
                <Title>Coding Galaxy</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://codinggalaxy.com/images/codingGalaxy_logotype.png' }} />
            <Text>
                Coding Galaxy is a comprehensively designed curriculum combined with unplugged classroom activities and a gamified learning app enables teachers to create interactive teaching in a fun and immersive learning environment. There is a collaboration mode for students solve missions together through teamwork. Also, the monitor and evaluate help teacher to trace and control students' progress with ease.
        </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
class VRcourseware extends Component {
    render() {
return (
<Card>
    <CardItem>
        <Left>
            <Body>
                <Title>VR courseware</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://static.wixstatic.com/media/64c95c_139decc7012943f5a778df76381fcf86~mv2.jpeg/v1/fill/w_1600,h_789,al_c,q_85/64c95c_139decc7012943f5a778df76381fcf86~mv2.jpeg' }} />
            <Text>
                Integrating Virtual Reality (VR) technology with learning and teaching, 101VR is both a creator tool and a VR content viewer, an application software and a sharing platform at the same time. With resources and teaching materials embedded, 101VR enables creating and editing your own VR contents.
        </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
class Microbit extends Component {
    render() {
return (
<Card>
    <CardItem>
        <Left>
            <Body>
                <Title>Micro:bit</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://www.kitronik.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/5/6/5613_large_bbc_microbit_board_only.jpg' }} />
            <Text>
                The Micro:bit is an open source hardware ARM-based embedded system which is suitable for students learning primary coding and programming concept, is very famous STEM education tool in Hong Kong.
        </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
class Makeblock extends Component {
    render() {
return (
<Card>
    <CardItem>
        <Left>
            <Body>
                <Title>Makeblock</Title>
            </Body>
        </Left>
    </CardItem>
    <CardItem>
        <Body>
            <Image
                style={{ width: '100%', height: 200 }}
                resizeMode='center'
                source={{ uri: 'https://static.wixstatic.com/media/983f6e_a1a526b6bb154042840d255b5911691f~mv2_d_4896_3264_s_4_2.jpg/v1/fill/w_560,h_310,al_c,q_80,usm_0.66_1.00_0.01/2017-07-16_7029_JPG.webp' }} />
            <Text>
                <Text style={{ marginBottom: 10 }}>mBot is an easy-to-run robot kit for kids to get hands-on experience about graphical programming, electronics, robotics. It is an all-in-one solution for robotics learning and designed for STEM education. Being the first partner of Makeblock, we have accumulated rich experience in teaching mBot courses.</Text>
                <Text>HaloCode is a wireless single board computer. With its built-in Wi-Fi support and microphone, the students can easily bring your board into the IoT projects and add speech recognition ability to it.</Text>
            </Text>
        </Body>
    </CardItem>
    <CardItem>
        <Button
            transparent
            onPress={() => { }}
        >
            <Text>Learn More</Text>
            <Icon name='ios-arrow-forward' />
        </Button>
    </CardItem>
</Card>
)
}
}
const styles = StyleSheet.create({
    actionButtonIcon: {
    fontSize: 20,
height: 22,
color: 'white',
},
});
*/