import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from'cookie-parser'
const app=express();
const PORT=8000;
const salt = bcrypt.genSaltSync(10);

//...................db.....................................................
mongoose.connect("mongodb://localhost:27017/TODO(db)").then(()=>console.log("connected")).catch((err)=>console.log(err))
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
        
    },password:{
        type:String,
        required:true,
        unique:true
    }
})
userSchema.statics.isThisEmailInUse= async function(email){
try {
    const user= await this.findOne({email})
if(user) return false
 
return true  
}catch(error){
    console.log(error.message);
    return false
}
  
}
userSchema.statics.isThisPasswordInUse= async function(password){
    try {
        const user= await this.findOne({password})
    if(user) return false
     
    return true  
    }catch(error){
        console.log(error.message);
        return false
    }
    }
    
const User=mongoose.model('user',userSchema);
//.....................................................................................



//.......................middleware......................................................
app.use(express.json());

app.use(cors({
origin:['http://localhost:5173'],
methods:['GET','POST'],
credentials:true
}))
app.use(cookieParser())
const verifyUser=(req,res,next)=>{
const token=req.cookies.token;
if(!token){
    return res.json({Error:'You are not authenticated'})
}else{
    jwt.verify(token,'secret-key',(err,decoded)=>{
if(err) return res.json({Error:'Token is invalid'})
req.name=decoded.name;
next();
    })
}
} 



//............................................................................................



//.......................Routes......................................................
app.get('/',verifyUser,(req,res)=>{
    return res.json({Status:200,name:req.name})
})

app.post('/', async (req,res)=>{
    //create record route
    const body=req.body; //getting data from frontend 
    console.log(req.body);
   const isEmailExisted=await User.isThisEmailInUse(body.email)
   
   if(!isEmailExisted){ return res.json({Error:'Email already in use'})}
    
   
        bcrypt.hash(body.password.toString(),salt,async (err,Hashedpasssword)=>{
            if(err) return res.json({Error:"error for hashing password"}) 
            const isPasswordExisted=await User.isThisPasswordInUse(Hashedpasssword);
            if(!isPasswordExisted){ return res.json({Error:'Password already in use'})}
                
            
       const result= await User.create({
        name:body.name,
        email:body.email,
        password:Hashedpasssword
        }) 
      
        
        return res.json({Status:200});
    })
})

app.post('/login',async (req,res)=>{
    const body=req.body;
    const result = await User.findOne({email:body.email})
    console.log(result);
    
    if(result){
        bcrypt.compare(body.password?.toString(),result.password,(err,response)=>{
            if(err) return res.json({Error:"some error in server"})
                if(response){
                   // console.log(result.name+"hi");
                    
                const name=result.name;
            const token=jwt.sign({name},'secret-key')
            res.cookie('token',token);
            return res.json({Status:200})
    }else{
        return res.json({Error:'Password not matched'})
    }})
    }else{
       return res.json({Error:"no email exist"})
    }
})

app.listen(PORT,()=>console.log(`server at ${PORT}`))