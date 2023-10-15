const express =require("express");

const app = express();
const cors = require('cors')
require('./db/config');
const User = require('./db/users');
const Product = require('./db/products');
const jwt =require("jsonwebtoken");
const jwtKey = "Hayat07";



/////////////   Middleware   /////////////////////////////////
app.use(express.json());
app.use(cors());
const tokenVerify=(req,res,next)=>{
    const token =req.headers['authorization'];
    console.log("Middleware called",token);
    if(token){
        jwt.verify(token,jwtKey,(err,valid)=>{
            valid ?  next() : res.send("Please send Valid Token");
        })
    }else {
        res.send("Please send token with headers")
    }

}

//////////////  API   /////////////////////////////////


//--------------Register Api------------------///////
app.post("/register",async (req,res)=>{

    let user =new  User(req.body);
    user = await user.save();
    jwt.sign({user},jwtKey,{expiresIn: "2h"},(err,token)=>{
        if(err){
            res.send(err);
        }else {
            res.send({user,auth:token});
        }
    })

    console.log(user);


})
//--------------Login Api------------------///////
app.post("/logIn",async (req,res)=>{
// res.send("Login post complete");

    if(req.body.email && req.body.password){
        // res.send(" log success")
        let user=await User.findOne(req.body).select("-password");
        console.log(user);
        if(user){
            jwt.sign({user},jwtKey,{expiresIn: "2h"},(err,token)=>{
                if(err){
                    res.send(err);
                }else {
                    res.send({user,auth:token});
                }
            })
        }else {
            res.send("No user found")
        }

    }else {
        res.send("Please fill both email and password");
    }

})
///--------------Add product Api------------------///////
app.delete("/products/:id",tokenVerify,async (req,res)=>{

    const result =await Product.deleteOne({_id: req.params.id});

    res.send(result);
    // res.send("product delete success");
});

///--------------Get all product Api------------------///////
app.post("/addProduct",tokenVerify,async (req,res)=>{
    const product =new Product(req.body);
    const result = await product.save();
    res.send(result);
})

app.put("/products/:id",tokenVerify,async (req,res)=>{

    const result = await Product.updateOne({_id:req.params.id},{
        $set:req.body
    });
    res.send(result);
})
app.get("/products",tokenVerify,async (req,res)=>{
    const product = await Product.find();
    console.log(product);
    res.send(product);
})

app.get("/search/:key",tokenVerify,async (req,res)=>{

    const result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {price:{$regex:req.params.key}}
        ]
    })
    res.send(result);
})
///--------------Delete product Api------------------///////

///--------------Update product Api------------------///////
///--------------Search product Api------------------///////









app.listen(5000);