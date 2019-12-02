import React, { Component } from 'react'
import { Container, Header, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Card, Item, CardItem, Tab, Tabs } from 'native-base'
import { View, StyleSheets, AsyncStorage, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import ScreenWrapper from '../Tools/ScreenWrapper'
import firebaseSvc from '../firebaseSvc'
export default class DemoScreen extends Component {
    render() {
        return (
            <ScreenWrapper Screen="DemoScreen" navigation={this.props.navigation}>
                <DemoScreenContent />
            </ScreenWrapper>
        )
    }
}
class DemoScreenContent extends Component {
    constructor(props) {
        super(props)
        //console.log(new Date("Wed Nov 27 2019 14:58:38 GMT+0800 (香港標準時間)"))
    }
    state = {
        demo1: {
            name: 'demo1',
            url: '',
            status: 'disabled'
        },
        demo2: {
            name: 'demo2',
            url: '',
            status: 'disabled'
        },
    }
    componentDidMount() {
        firebaseSvc.getRealLifeDemo((item) => {
            this.setState({ demo1: item[0], demo2: item[1] })
        })
    }
    renderWebView(demono) {
        if (demono == 1) {
            if (this.state.demo1.status !== 'enable') {
                return (
                    <Tab heading={this.state.demo1.name}>
                        <Card style={{ marginLeft: Dimensions.get('window').width * 0.1 / 2, width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.8 }}>
                            <CardItem style={{ flex: 1 }}>
                                <Body><Text>Coming Soon</Text></Body>
                            </CardItem>
                        </Card>
                    </Tab>
                )
            } else {
                return (
                    <Tab heading={this.state.demo1.name}>
                        <Card style={{ marginLeft: Dimensions.get('window').width * 0.1 / 2, width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.8 }}>
                            <CardItem style={{ flex: 1 }}>
                                <WebViewC source={{ uri: this.state.demo1.url }} />
                            </CardItem>
                        </Card>
                    </Tab>
                )
            }
        } else {
            if (this.state.demo2.status !== 'enable') {
                return (
                    <Tab heading={this.state.demo2.name}>
                        <Card style={{ marginLeft: Dimensions.get('window').width * 0.1 / 2, width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.8 }}>
                            <CardItem style={{ flex: 1 }}>
                                <Body><Text>Coming Soon</Text></Body>
                            </CardItem>
                        </Card>
                    </Tab>
                )
            } else {
                return (
                    <Tab heading={this.state.demo2.name}>
                        <Card style={{ marginLeft: Dimensions.get('window').width * 0.1 / 2, width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.8 }}>
                            <CardItem style={{ flex: 1 }}>
                                <WebViewC source={{ uri: this.state.demo2.url }} />
                            </CardItem>
                        </Card>
                    </Tab>
                )
            }
        }
    }
    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.openControlPanel()}>
                            <Icon name="md-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tryout Demo</Title>
                    </Body>
                    <Right />
                </Header>
                <Tabs>
                    {this.renderWebView(1)}
                    {this.renderWebView(2)}
                </Tabs>
            </Container>
        )
    }
}
class WebViewC extends Component {
    render() {
        return (
            <WebView
                style={{ width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.8 }}
                source={this.props.source}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        )
    }
}