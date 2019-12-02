import {AsyncStorage} from 'react-native'
class QuickStorage{
    constructor(){
        this.userid=""
        this.name=""
        this.email=""
        this.phone=""
        this.school=""
    }
    setName(name){
        this.name=name
    }
    getName(){
        return this.name
    }
    setEmail(email){
        this.email=email
    }
    getEmail(){
        return this.email
    }
    setPhone(phone){
        this.phone=phone
    }
    getPhone(){
        return this.phone
    }
    setSchool(school){
        this.school=school
    }
    getSchool(){
        return this.school
    }
    setUserid(id){
        this.userid=id
    }
    getUserid(){
        console.log(this.userid)
        return this.userid
    }
    async storeAsync(successCallback, failCallback){
        try{
            await AsyncStorage.setItem("usercredential",JSON.stringify({name:this.name,email:this.email,phone:this.phone,school:this.school}))
            return successCallback()
        }catch(err){
            return failCallback()
        }
    }
    print(){
        console.log(this.userid)
        console.log(this.name)
        console.log(this.phone)
        console.log(this.school)
        console.log(this.email)
    }
}
const QuickStorageSvc=new QuickStorage()
export default QuickStorageSvc
