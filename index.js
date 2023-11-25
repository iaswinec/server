const express= require("express")   // import express and store in avariable

const ds=require('./service/dataService')   //import file

const app= express()    // app creation

app.use(express.json())  //convert json to js


//register-post
app.post("/register",(req,res)=>{
    const result=ds.register(req.body.uname,req.body.accno,req.body.psw)
    if(result){
        res.send("registered")
    }
    else{
        res.send("user already present")
    }
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
app.listen(3000,()=>{
    console.log("server started at port 3000");
})