import React, { Component } from 'react'
import { Container, Header, Footer, Content, Icon, Title, Left, Right, Body, Text, Button, Form, Cards, Item, CardItem } from 'native-base'
import { View, StyleSheets, AsyncStorage ,Platform,Dimensions, Image } from 'react-native'
import ScreenWrapper from '../Tools/ScreenWrapper'
import { Agenda } from 'react-native-calendars'
import moment from 'moment'
import firebaseSvc from '../firebaseSvc'
export default class WorkShopScreen extends Component {
    render() {
        return (
            <ScreenWrapper Screen="WorkShopScreen" navigation={this.props.navigation}>
                <WorkShopScreenContent navigation={this.props.navigation} />
            </ScreenWrapper>
        )
    }
}
class WorkShopScreenContent extends Component {
    constructor(props) {
        super(props)
        //console.log("loading")
        //console.log(moment().format('YYYY-MM-DD'))
    }
    state = {
        rawAgendaItems: null,
        processedAgendaItems: null,
        readyItem: null,
        refreshing: true,
        presetItems: null
    }
    componentDidMount() {
        //generate bucket
        var date = moment().format('YYYY-MM-DD')
        var presetItemsObj = {}
        for (var i = 0; date != '2019-12-14'; i++) {
            date = moment().add(i, 'days').format('YYYY-MM-DD')
            presetItemsObj[moment().add(i, 'days').format('YYYY-MM-DD')] = []
        }

        this.setState({ presetItems: presetItemsObj }, () => {
            //console.log(this.state.presetItems)
            //get initial value
            firebaseSvc.getInitialEvents(async (snapshot) => {
                //load async storage to see has the user registered
                var ConfirmedRecord = []
                try {
                    const record = await AsyncStorage.getItem("jointedEventId")
                    if (record !== null) {
                        ConfirmedRecord = JSON.parse(record)
                    }
                } catch (err) {
                    alert("an error has occured")
                }
                //console.log("===initial calendar==="),
                //console.log(ConfirmedRecord)
                //console.log("======================")
                const processed = snapshot.map((item) => {
                    item.registered = false
                    return item
                })
                processed.forEach(item => {
                    if (ConfirmedRecord.includes(item.id)) {
                        item.registered = true
                    }
                });
                this.setState({
                    rawAgendaItems: snapshot,
                    processedAgendaItems: processed,
                }, () => {
                    //parse data and make it into agenda
                    var daylist = JSON.parse(JSON.stringify(this.state.presetItems))
                    this.state.processedAgendaItems.forEach((item) => {
                        daylist[item.date].push(item)
                        daylist[item.date].sort(function(a,b){return a.id-b.id})
                    })

                    //console.log("daylist")
                    //console.log(daylist)
                    this.setState({ readyItem: daylist, refreshing: false }, () => {
                        //add listener to keep update items
                        firebaseSvc.refOnEvents((snapshot)=>this.handleRefOn(snapshot))

                        ////////////////////////////////////
                    })
                })
            })
        })
    }

    handleRefOn=(snapshot) => {
        //this snapshot returns single item
        //setstate for refreshing + check again async storage and update a single item
        this.setState({ refreshing: true }, async () => {
            //console.log(snapshot)
            var YourRecord = []
            try {
                const nrecord = await AsyncStorage.getItem("jointedEventId")
                if (nrecord !== null) {
                    YourRecord = JSON.parse(nrecord)
                }
            } catch (err) {
                alert("an error has occured")
            }
            //console.log("===calendar update===")
            //console.log(YourRecord)
            //console.log("=====================")
            const newProcessedItem = this.state.processedAgendaItems.map((item) => {
                if (item.id == snapshot.id) {
                    snapshot.registered = false
                    if (YourRecord.includes(snapshot.id)) {
                        snapshot.registered = true
                    }
                    //console.log(snapshot)
                    return snapshot
                } else {
                    return item
                }
            })
            var ndaylist = JSON.parse(JSON.stringify(this.state.presetItems))
            //console.log(ndaylist)
            newProcessedItem.forEach((item) => {
                ndaylist[item.date].push(item)
            })
            this.setState({ processedAgendaItems: newProcessedItem, readyItem: ndaylist, refreshing: false })

        })
    }

    
    componentWillUnmount() {
        firebaseSvc.refOffEvents()
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
                        <Title>Schedule</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content Bounces={false} scrollEnabled={false}>
                    <View style={{ height: Platform.OS==="ios"?(Dimensions.get('window').height-64)*0.3:(Dimensions.get('window').height-56)*0.3, flexDirection:'row' }}>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Image
                            style={{height: Platform.OS==="ios"?(Dimensions.get('window').height-64)*0.1:(Dimensions.get('window').height-56)*0.1, flexDirection:'row', width: Platform.OS==="ios"?(Dimensions.get('window').height-64)*0.1:(Dimensions.get('window').height-56)*0.1, flexDirection:'row'}}
                            resizeMode='cover'
                            source={require('../assets/biotechnology.jpg')}
                            />
                        </View>
                        <View style={{flex:2, padding:10}}>
                            <Title style={{color:'black'}}>Registration Process</Title>
                            <View style={{margin:15, borderBottomWidth:1,borderColor:'rgba(0,0,0,.1)'}}></View>
                            <Text>1. choose a session from the below calendar</Text>
                            <Text style={{paddingVertical:10}}>2. click the arrow on the right to reservation page</Text>
                            <Text>3. click the register button to register</Text>
                        </View>
                    </View>
                    <View style={{ height: Platform.OS==="ios"?(Dimensions.get('window').height-64)*0.7:(Dimensions.get('window').height-56)*0.7 }}>
                        <Agenda
                            // the list of items that have to be displayed in agenda. If you want to render item as empty date
                            // the value of date key kas to be an empty array []. If there exists no value for date key it is
                            // considered that the date in question is not yet loaded
                            items={this.state.readyItem}
                            // callback that gets called when items for a certain month should be loaded (month became visible)
                            loadItemsForMonth={(month) => { //console.log('trigger items loading') 
                            }}
                            // callback that fires when the calendar is opened or closed

                            // callback that gets called on day press

                            // initially selected day
                            selected={moment().format('YYYY-MM-DD')}
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            minDate={'2019-12-10'}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            maxDate={'2019-12-14'}
                            // Max amount of months allowed to scroll to the past. Default = 50
                            pastScrollRange={10}
                            // Max amount of months allowed to scroll to the future. Default = 50
                            futureScrollRange={10}
                            // specify how each item should be rendered in agenda
                            renderItem={(item, firstItemInDay) => {
                                return (
                                    <View style={{
                                        backgroundColor: item.registered ? '#20B2AA' : 'deepskyblue',
                                        margin: 10,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        padding: 10,
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{flex:3,justifyContent:'center', alignContent:'center',alignItems:'center',borderRightWidth:1, borderRightColor:'rgba(0,0,0,.1)'}}>
                                            <Text style={{fontSize:12, color:'rgba(0,0,0,.4)'}}>Quota Left</Text>
                                            <Text style={{fontSize:32, fontWeight:'bold',color:'rgba(0,0,0,.5)'}}>
                                                {item.quota-item.joint}
                                            </Text>
                                        </View>
                                        <View style={{flex:5, paddingLeft:15}}>
                                            <Title style={{color:'black'}}>{item.topic}</Title>
                                            <Text style={{fontStyle:'italic', marginTop:5}}>{item.startTime}-{item.endTime}</Text>
                                            <Text>Venue:{item.venue}</Text>
                                        </View>
                                        <View style={{flex:2, justifyContent:'center', alignContent:'center',alignItems:'center'}}>
                                            <Button transparent
                                                onPress={()=>{
                                                    //firebaseSvc.refOffEvents()
                                                    this.props.navigation.navigate('RegistrationScreen',{
                                                    event:item,
                                                    onGoBack:firebaseSvc.refOnEvents((snapshot)=>this.handleRefOn(snapshot))
                                                })}}
                                            >
                                                <Icon name='ios-arrow-forward'></Icon>
                                            </Button>
                                        </View>

                                    </View>
                                );
                            }}
                            // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                            //renderDay={(day, item) => { return (<View />); }}
                            // specify how empty date content with no items should be rendered
                            renderEmptyDate={() => { return (<View />); }}
                            // specify how agenda knob should look like
                            //renderKnob={() => { return (<View />); }}
                            // specify what should be rendered instead of ActivityIndicator
                            //renderEmptyData={() => { return (<View />); }}
                            // specify your item comparison function for increased performance
                            rowHasChanged={(r1, r2) => { return (r1.joint !== r2.joint) || (r1.date !== r2.date) || (r1.quota !== r2.quota) || (r1.startTime !== r2.startTime) || (r1.topic !== r2.topic) || (r1.registered!==r2.registered) }}
                            // Hide knob button. Default = false
                            //hideKnob={true}
                            // By default, agenda dates are marked if they have at least one item, but you can override this if needed

                            // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                            // agenda theme
                            /*theme={{
                                ...calendarTheme,
                                agendaDayTextColor: 'yellow',
                                agendaDayNumColor: 'green',
                                agendaTodayColor: 'red',
                                agendaKnobColor: 'blue'
                            }}*/
                            // agenda container style
                            refreshing={this.state.refreshing}
                            style={{}}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}