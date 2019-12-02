import React, { Component } from 'react'
import { Container, Header, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Cards, Item, CardItem } from 'native-base'
import Drawer from 'react-native-drawer'
import ControlPanel from '../Tools/ControlPanel'
import registerForPushNotificationsAsync from '../Tools/expoNotification'
import { Notifications } from 'expo'
import uuid from 'uuid'
import QuickStorageSvc from './QuickStorage'
export default class ScreenWrapper extends Component {
    constructor(props) {
        super(props)

    }
    state = {
        onScreen: this.props.Screen,
        override: this.props.override ? this.props.override : null,
        navigation: this.props.navigation,
        userid: 1
    }
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    componentWillReceiveProps(props){
        console.log(props.userid)
        this.setState({userid:props.userid})
    }
    render() {
        if (this.state.override != null) {
            return (
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="overlay"
                    openDrawerOffset={0.2}
                    tweenHandler={(ratio) => ({
                        main: { opacity: (2 - ratio) / 2 }
                    })}
                    content={<ControlPanel CloseDrawerFunction={this.closeControlPanel} Navigator={this.state.navigation} userid={this.state.userid}>
                        {this.state.override} 
                    </ControlPanel>}
                >
                    {React.cloneElement(this.props.children, { openControlPanel: this.openControlPanel })}
                </Drawer>
            )
        } else {
            return (
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="overlay"
                    openDrawerOffset={0.3}
                    tweenHandler={(ratio) => ({
                        main: { opacity: (2 - ratio) / 2 }
                    })}
                    content={<ControlPanel CloseDrawerFunction={this.closeControlPanel} Navigator={this.state.navigation} userid={QuickStorageSvc.getUserid()}>
                        <Button
                            full
                            transparent
                            active={this.state.onScreen == "HomeScreen"}
                            disabled={this.state.onScreen == "HomeScreen"}
                            onPress={() => {
                                this.closeControlPanel()
                                this.props.navigation.navigate('HomeScreen')
                            }}
                        >
                            <Text>Home</Text>
                        </Button>
                        <Button
                            full
                            transparent
                            active={this.state.onScreen == "ProductInfoScreen"}
                            disabled={this.state.onScreen == "ProductInfoScreen"}
                            onPress={() => {
                                this.closeControlPanel()
                                this.props.navigation.navigate('ProductInfoScreen')
                            }}
                        >
                            <Text>Product and Services</Text>
                        </Button>
                        <Button
                            full
                            transparent
                            active={this.state.onScreen == "WorkShopScreen"}
                            disabled={this.state.onScreen == "WorkShopScreen"}
                            onPress={() => {
                                this.closeControlPanel()
                                this.props.navigation.navigate('WorkShopScreen')
                            }}
                        >
                            <Text>Hands-on Session</Text>
                        </Button>
                        <Button
                            full
                            transparent
                            active={this.state.onScreen == "DemoScreen"}
                            disabled={this.state.onScreen == "DemoScreen"}
                            onPress={() => {
                                this.closeControlPanel()
                                this.props.navigation.navigate('DemoScreen')
                            }}
                        >
                            <Text>Tryout Demo</Text>
                        </Button>

                    </ControlPanel>}
                >
                    {React.cloneElement(this.props.children, { openControlPanel: this.openControlPanel })}
                </Drawer>
            )
        }
    }
}