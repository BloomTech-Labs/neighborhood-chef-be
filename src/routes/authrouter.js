const express = require('express');
const buildHTML = require('../utils/htmltemplatebuilder');
const { promisify } = require('util');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const fs = require('fs');
const crypto = require('crypto');

const users = require('../models/users/user-models');

const readFile = promisify(fs.readFile);
const router = express.Router();


router.post('/register', buildHTML, async (req ,res) => {
    try{

        console.log("here");
        const { Email } = req.body
        

        const transport = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE_PROVIDER,
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: Email,
            subject:"NeighborhoodChef",
            html: await readFile(`./html/${req.hash}.html`),
            replyTo: process.env.EMAIL_NAME
        }
        console.log(mailOptions);
        await transport.sendMail(mailOptions, async (err, response) => {
            try{
                if(err) res.status(500).json({success: false, message: err.message}); 
            }catch(err){
                res.status(500).json({success: false, message: err.message})
            }
        });
        fs.unlinkSync(`./html/${req.hash}.html`)
        const addedUser = await users.add(req.body);
        
        addedUser ? 
        res.status(201).json({success: true, message: "User created -- activation required"}) :
        res.status(500).json({success: false, message: "There was issue with registration"})

    }catch(err){
        res.status(500).json(err.message);
    }
});

router.get('/activate', async (req, res, next) => {
    try {
        const {id, email, tempPass} = req.query;
        const compareHash = crypto
        .createHmac('sha256', process.env.EMAIL_HASH_SECRET)
        .update(email)
        .digest('base64');
    
        const formattedId = id.replace(/\s/g, '+')

        if(compareHash.toString() === formattedId){

            const user = await users.findBy({Email: email});

            const oktaUser = {
                "profile": {
                    "firstName": user.FirstName,
                    "lastName": user.lastName,
                    "email": user.Email,
                    "login": user.Email
                },
                "credentials": {
                    "password": { "value": tempPass }
                },
                "groupIds": [process.env.OKTA_GROUP_ID]
            }

            const fetcher = await fetch(`${process.env.OKTA_BASE_URL}/api/v1/users`,{
                method: 'post',
                body: JSON.stringify(oktaUser),
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json',
                    'Authorization': `SSWS ${process.env.OKTA_API_TOKEN}`
                },
                
            });
            console.log(fetcher, "fetcher");
            res.status(301).redirect('https://facebook.com');
            next;
        }else {
            res.status(400).json({success: false, message: "Not authorized"});
        }
    }catch(err){
        res.status(500).json({success: false, message: err.message});
    }
})

module.exports = router;