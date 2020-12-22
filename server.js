const express = require ('express');
const app = express();
const members = require('./Members');
const uuid = require('uuid');
const cors = require('cors');
const verification = require('./Verification');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// CORS error middleware
app.use(cors());



app.get('/api/verify', (req , res) => {
 
  res.json(verification); 
  

});


app.post('/api/members', (req , res) => {

    const newMember = {
        id: uuid.v4(), 
        name: req.body.name,
        DoB: req.body.DoB,
        address: req.body.address,
        passport: req.body.passport,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone,
    };
    
    members.push(newMember);
    res.json(members);
    

});


app.post('/api/login', (req , res) => {

    let userDetails = {
        msg: "",
        logged: "", 
        USD: "",
        ETH: "",
        WETH: "",
        LEND: "",
        LINK:"",
        KNC: "",
        MKR: "",
        DAI: "",
    }

    const found = members.some(member => 
      (member.email === req.body.email) && (member.password === req.body.password) 
    )

    if((!req.body.email) || (!req.body.password)){
        userDetails ={
            logged: false,
            msg: "please input a email and password",
        }
        res.json(userDetails);
    }
    else if(found){


        const userWallet = members.find(member => {
         if((member.email === req.body.email) && (member.password === req.body.password)){
             return (
                 member
             )
         }
        });   
        
        userDetails= {
            logged: true,
            msg: "sucessful login",
            USD: userWallet.usd,
            ETH: userWallet.eth,
            WETH: userWallet.weth,
            LEND: userWallet.lend,
            LINK: userWallet.link,
            KNC: userWallet.knc,
            MKR: userWallet.mkr,
            DAI: userWallet.dai,
    
        }

        res.status(200).json(userDetails);   
    }

    else {
        userDetails={
            logged: false,
            msg: "unsucessful login attempt",
        }
        res.json(userDetails);
    }
 


});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`sever started on port: ${PORT}`));