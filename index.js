const express = require("express") 

const cors= require("cors") //

const ds = require('./service/dataService')  

const jwt= require("jsonwebtoken")  

const app = express()  

app.use(cors({origin:'http://localhost:4200'})) //integrate app with front end

app.use(express.json())  

const jwtmiddleware=(req,res,next)=>{
    try{
        const token=req.headers['access_token']
        const data=jwt.verify(token,"superkey123")    
        console.log(data);
        next()
    }
    catch{
        res.status(422).json({
            status: false,
            message: "please login",
            statusCode: 404
        })
    }
}


//register-post
app.post("/register", (req, res) => {
    ds.register(req.body.uname, req.body.accno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//login-post
app.post("/login", (req, res) => {
    ds.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//deposit-post
app.post("/deposit", jwtmiddleware,(req, res) => {
    ds.deposit(req.body.acno, req.body.password, req.body.amount).then(result=>{        //accno,psw,amount
        res.status(result.statusCode).json(result)
    })
})

//withdraw-post
app.post("/withdraw", jwtmiddleware, (req, res) => {
    ds.withdraw(req.body.acno, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//getTransaction-post(this was 'get' while using localstorage)
app.post("/transaction", jwtmiddleware, (req, res) => {
    ds.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//delete
app.delete("/delete/:acno", jwtmiddleware, (req,res)=>{
    ds.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
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