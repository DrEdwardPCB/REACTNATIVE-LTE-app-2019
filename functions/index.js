const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
var fetch = require('node-fetch')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendPushNotification = functions.database.ref('notification/{id}').onCreate(event => {
    const root = event.ref.root
    var messages = []
    //return main promise
    return root.child('/NotificationTokens').once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var expoToken = childSnapshot.val().expoToken
            if (expoToken) {
                messages.push({
                    "to": expoToken,
                    'body': event.val().message
                })
            }
        })

        return Promise.all(messages)

    }).then((messages) => {
        console.log(messages)
        fetch("https://exp.host/--/api/v2/push/send", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messages)
        })
        return true
    })
})
