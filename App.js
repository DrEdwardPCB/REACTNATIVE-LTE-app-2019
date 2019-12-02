import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import HomeScreen from './Screens/HomeScreen'
import ProductInfoScreen from './Screens/ProductInfoScreen'
import WorkShopScreen from './Screens/WorkShopScreen'
import DemoScreen from './Screens/DemoScreen'
import RegistrationScreen from './Screens/RegistrationScreen'
import UserIdScreen from './Screens/UserIdScreen';

const WorkShopStack = createStackNavigator({
  WorkShopScreen: {
    screen: WorkShopScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  RegistrationScreen: {
    screen: RegistrationScreen,
    navigationOptions: () => ({
      title: 'Reserve Seats'
    })
  }
},
)
const UserIdBarCodeStack = createStackNavigator({
  
  Main: {
    screen: createAnimatedSwitchNavigator(
      {
        HomeScreen: HomeScreen,
        ProductInfoScreen: ProductInfoScreen,
        WorkShopScreen: WorkShopStack,
        DemoScreen: DemoScreen
      },
      {
        // The previous screen will slide to the bottom while the next screen will fade in
        transition: (
          <Transition.Together>
            <Transition.Out
              type="slide-left"
              durationMs={400}
              interpolation="easeIn"
            />
            <Transition.In type="fade" durationMs={500} />
          </Transition.Together>
        ),
      }
    ),
    navigationOptions: () => ({
      header:null
    })
  },
  UserIdScreen:{
    screen: UserIdScreen,
    navigationOptions:()=>({
      title:'User ID'  
    })
  },
})
export default createAppContainer(UserIdBarCodeStack)

