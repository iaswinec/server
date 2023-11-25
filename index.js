const express = require("express")   // import express and store in avariable

const ds = require('./service/dataService')   //import file

const app = express()    // app creation

app.use(express.json())  //convert json to js


//register-post
app.post("/register", (req, res) => {
    const result = ds.register(req.body.uname, req.body.accno, req.body.psw)
    res.status(result.statusCode).json(result)
})

//login-post
app.post("/login", (req, res) => {
    const result = ds.login(req.body.accno, req.body.psw)
    res.status(result.statusCode).json(result)
})

//deposit-post
app.post("/deposit", (req, res) => {
    const result = ds.deposit(req.body.accno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})

//withdraw-post
app.post("/withdraw", (req, res) => {
    const result = ds.withdraw(req.body.accno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})

//getTransaction-get
app.get("/transaction", (req, res) => {
    const result = ds.getTransaction(req.body.accno)
    res.status(result.statusCode).json(result)
})


//resolve api
// app.get("/",(req,res)=>{
//     res.send('Get method working......')
// })

// app.post("/",(req,res)=>{
//     res.send('Post method working......')
// })

// app.patch("/",(req,res)=>{
//     res.send('patch method working......')
// })

// app.put("/",(req,res)=>{
//     res.send('put method working......')
// })

// app.delete("/",(req,res)=>{
//     res.send('delete method working......')
// })


// port set
app.listen(3000, () => {
    console.log("server started at port 3000");
})