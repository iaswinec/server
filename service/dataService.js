userDetails = {
    1000: { username: "anu", acno: 1000, password: "1234", balance: 0, transaction: [] },
    1001: { username: "amal", acno: 1001, password: "1234", balance: 0, transaction: [] },
    1002: { username: "arun", acno: 1002, password: "1234", balance: 0, transaction: [] },
    1003: { username: "megha", acno: 1003, password: "1234", balance: 0, transaction: [] }
}

register = (uname, accno, psw) => {
    if (accno in userDetails) {
        return {
            status: false,
            message: "user already present",
            statusCode: 404
        }
    }
    else {
        userDetails[accno] = { username: uname, acno: accno, password: psw, balance: 0, transaction: [] }
        return {
            status: true,
            message: "registered successfully",
            statusCode: 200
        }
    }
}

login = (acno, psw) => {
    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            currentUser = userDetails[acno]["username"]
            currentAcno = acno
            return {
                status: true,
                message: "login success",
                statusCode: 200,
                currentUser,
                currentAcno
            }
        }
        else {
            return {
                status: true,
                message: "incorrect password",
                statusCode: 404
            }
        }
    }
    else {
        return {
            status: true,
            message: "not a registered user",
            statusCode: 404
        }
    }
}

deposit=(accnum, password, amount)=>{
    var amnt = parseInt(amount)
    if (accnum in userDetails) {
        if (password == userDetails[accnum]["password"]) {
            userDetails[accnum]["balance"] += amnt
            userDetails[accnum]["transaction"].push({ Type: "credit", Amount: amnt })
            return  {
                status: true,
                message: `your a/c has been credited with ${amnt} and the balance is ${userDetails[accnum]["balance"]}`,
                statusCode: 200
            }
        }
        else {
            return {
                status:false,
                message:"incorrect password",
                statusCode:404
            }
        }
    }
    else {
        return {
            status:false,
            message:"incorrect account number",
            statusCode:404
        }
    }
}

withdraw=(accnum, pswd, amount)=>{
    var amnt = parseInt(amount)
    if (accnum in userDetails) {
        if (pswd == userDetails[accnum]["password"]) {
            if (amnt <= userDetails[accnum]["balance"]) {
                userDetails[accnum]["balance"] -= amnt
                userDetails[accnum]["transaction"].push({ Type: "debit", Amount: amnt })
                return {
                    status: true,
                    message:`withdraw ${amnt} successfully. Balance is ${userDetails[accnum]["balance"]}`,
                    statusCode:200
                }
            }
            else {
                return {
                    status: false,
                    message:`Insufficent balance. Balance is ${userDetails[accnum]["balance"]}`,
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
    }
    else {
        return {
            status: false,
            message:`incorrect account number`,
            statusCode:404
        }
    }
}

getTransaction=(accnum)=>{    
    return {
        ststus:true,
        transaction:userDetails[accnum].transaction,
        statusCode:200
    }
}


module.exports = {
    register, login, deposit, withdraw, getTransaction
}