import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import firebaseSvc from '../firebaseSvc';


export default async function registerForPushNotificationsAsync(userid) {//also register userid
  const token="haha"
  firebaseSvc.addToken(token,userid);
  return token
  /*const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log("registering new")
  console.log(token)
  
  console.log("successgully passed to firebase")
  console.log(token)
  return(token)*/
}