userDetails= {
    1000: { username: "anu", acno: 1000, password: "1234", balance: 0, transaction: [] },
    1001: { username: "amal", acno: 1001, password: "1234", balance: 0, transaction: [] },
    1002: { username: "arun", acno: 1002, password: "1234", balance: 0, transaction: [] },
    1003: { username: "megha", acno: 1003, password: "1234", balance: 0, transaction: [] }
}

register=(uname, accno, psw)=>{
    if (accno in userDetails) {
        return false
    }
    else {
        userDetails[accno] = { username: uname, acno: accno, password: psw, balance: 0, transaction: [] }
        return true
    }
}

module.exports={
    register
}