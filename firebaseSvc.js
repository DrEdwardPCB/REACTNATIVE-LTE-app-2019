import firebase from 'firebase'

class FirebaseSvc {
    constructor() {
        console.log("launching firebaseapp")
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "",
                authDomain: "",
                databaseURL: "",
                projectId: "",
                storageBucket: "",
                messagingSenderId: "",
                appId: "",
                measurementId: ""
            })
        }
    }
    addToken = (Token, id) => {
        
        this.refNotificationToken.push({ expoToken: Token, userid: id })
    }
    get refNotificationToken() {
        return firebase.database().ref('NotificationTokens');
    }
    get refEvent() {
        return firebase.database().ref('Events')
    }
    getInitialEvents(callback) {
        this.refEvent.once("value", snapshot => callback(this.parseCollectionEvents(snapshot)))
    }
    refOnEvents = callback => {
        this.refEvent
            .on('child_changed', snapshot => callback(this.parseEvent(snapshot)))
    }
    parseEvent = (snapshot) => {
        const val = snapshot.val()
        //console.log(val)
        return val
    }
    parseCollectionEvents = (snapshot) => {
        snapshotarray = []
        snapshot.forEach((items) => {
            snapshotarray.push(items.val())
        })
        return snapshotarray
    }
    refOffEvents() {
        this.refEvent.off()
    }
    registerForEvent(eventid, userid,userinfo, successcallback, failcallback) {
        var that = this
        this.refEvent.child(`id${eventid}`).once('value', function (value) {
            var quota = value.val().quota
            var joint = value.val().joint
            console.log(value)
            if (joint < quota) {
                var jointadd = false
                var useridadd = false
                var first = that.refEvent.child(`id${eventid}`).update({ joint: joint + 1 }).then(() => {
                    jointadd = true
                })
                var second = that.refEvent.child(`id${eventid}` + '/participants').push(userid).then(() => {
                    useridadd = true
                })
                var third = that.refEvent.child(`id${eventid}` + '/participantsInfo').push({userid:userid,name:userinfo.name,phone:userinfo.phone,email:userinfo.email,schoo:userinfo.school}).then(() => {
                    useridadd = true
                })
                Promise.all([first, second, third]).then(
                    () => {//success
                        console.log("success")
                        return successcallback()
                    },
                    () => {//fail
                        console.log("fail")
                        if (jointadd == true) {
                            that.refEvent.child(`id${eventid}`).update({ joint: joint })
                        }
                        if (useridadd = true) {
                            that.refEvent.child(`id${eventid}` + '/participants').once('value', (values) => {
                                values.forEach((item) => {
                                    if (item.val() == userid) {
                                        item.ref.remove()
                                    }
                                })
                            })
                        }
                        return failcallback("Internal Server Error")
                    }
                )

            } else {
                return failcallback("the session is fulled")
            }
        })
    }
    withdrawFromEvent(eventid, userid, successcallback, failcallback) {
        var that=this
        this.refEvent.child(`id${eventid}`).once('value', function (value) {
            //var quota = value.val().quota
            var joint = value.val().joint
            var first = that.refEvent.child(`id${eventid}`).update({ joint: joint - 1 })
            var second = that.refEvent.child(`id${eventid}` + '/participants').once('value', (values) => {
                values.forEach((item) => {
                    if (item.val() == userid) {
                        item.ref.remove()
                    }
                })
            })
            Promise.all([first, second]).then(
                () => { return successcallback() },
                () => { return failcallback('internal server error') }
            )
        })
    }
    async RequestForInformation(userid, name, email,school,phone,remarks,type,callback){
        const ref=firebase.database().ref('userRequest')
        const key=await ref.push({userid:userid,name:name,email:email,school:school,phone:phone,remarks:remarks,topic:type}).key
        console.log(key)
        if(key!=undefined){
            console.log("success")
            callback('success')
        }else{
            callback('fail')
        }
    }
    get refNotification(){
        return firebase.database().ref('notification')
    }
    refOnNotification(callback){
        this.refNotification.on("value",function(snapshot){
            var json=[]
            snapshot.forEach((item)=>{
                json.push(item.val())
            })
            callback(json)
        })
    }
    refOffNotification(){
        this.refNotification.off()
    }

    getRealLifeDemo(callback){
        firebase.database().ref('LiveDemo').once('value',function(snapshot){
            var demoArr=[]
            snapshot.forEach(item=>{
                demoArr.push(item.val())
            })
            return callback(demoArr)
        })
    }

}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;