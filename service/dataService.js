const jwt=require("jsonwebtoken")   //import
const db=require('./db')

register = (uname, accno, psw) => {
    return db.User.findOne({acno:accno}).then(user=>{  //store the resolved o/p of findOne in a variable user
        if(user){   //if accno present in db then get the object of that uer else null response
            return {
                status: false,
                message: "user already present",
                statusCode: 404
            }
        }
        else{
            newUser= new db.User({
                username:uname,
                acno:accno,
                password:psw,
                balance: 0,
                transaction: []
                })
            newUser.save()  //to reflect the changes in database(simply to save in db)
            return {
                status: true,
                message: "registered successfully",
                statusCode: 200
            }
        }
    })
}

login = (accno, psw) => {
    return db.User.findOne({acno:accno, password:psw}).then(user=>{
        if(user){
            currentUser=user.username
            currentAcno=user.acno
            const token=jwt.sign({accno},"superkey123")
            return {
                status: true,
                message: "login success",
                statusCode: 200,
                currentUser,
                currentAcno,
                token
            }
        }
        else{
            return {
                status: true,
                message: "incorrect account number or password",
                statusCode: 404
            }
        }
    })
}

deposit=(accno, psw, amount)=>{
    var amnt = parseInt(amount)    
    return db.User.findOne({acno:accno, password:psw}).then(user=>{
        if(user){
            user.balance+=amnt
            user.transaction.push({Type:"Credit", Amount:amnt})
            user.save() //saving the changes in db
            return{
                status: true,
                message: `your a/c has been credited with ${amnt} and the balance is ${user.balance}`,
                statusCode: 200
            }
        }
        else{
            return {
                status:false,
                message:"incorrect account number or password",
                statusCode:404
            }
        }
    })
}

withdraw=(accno, psw, amount)=>{
    var amnt = parseInt(amount)
    return db.User.findOne({acno:accno, password:psw}).then(user=>{
        if(user){
            if(amnt<=user.balance){
                user.balance-=amnt  
                user.transaction.push({Type:"Debit", Amount:amnt})
                user.save()
                return{
                    status: true,
                    message: `your a/c has been debited with ${amnt} and the balance is ${user.balance}`,
                    statusCode: 200
                }
            }
            else{
                return {
                    status: false,
                    message:`Insufficent balance. Balance is ${user.balance}`,
                    statusCode:404
                }
            }      
        }
        else {
            return {
                status: false,
                message:`incorrect password`,
                statusCode:404
            }
        }
    })
}

getTransaction=(accno)=>{ 
    return db.User.findOne({acno:accno}).then(user=>{
        if(user){
            return {
                status: true,
                transaction: user.transaction,
                statusCode: 200
            }
        }        
})
}

deleteAcc=(acno)=>{
    return db.User.deleteOne({"acno":acno}).then(user=>{
        if(user){
            return {
                status: true,
                message:`accoount deleted successfully`,
                statusCode: 200
            }
        }
        else{
            return {
                status: false,
                message:`you can't delete right now`,
                statusCode: 402
            }
        }
    })
}


module.exports = {
    register, login, deposit, withdraw, getTransaction, deleteAcc
}