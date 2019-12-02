import Barcode from 'react-native-barcode-builder';
import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base';

export default class UserIdScreen extends Component {
    constructor(props) {
        super(props)
        console.log("logging userid")
        console.log(props.navigation.getParam("userid"))
    }
    render() {
        return (
            <View>

                <Barcode width={2} value={this.props.navigation.getParam("userid")} format="CODE128" />

                <Text style={{ fontSize: 24, textAlign:'center', width:'100%' }}>{this.props.navigation.getParam("userid")}</Text>
            </View>

        )
    }
}
