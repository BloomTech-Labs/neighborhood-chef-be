const fs = require('fs');
const { promisify } = require('util');
const crypto = require('crypto');
const temp = require('temp');
const os = require('os');

const writeToFile = promisify(fs.open);
const asyncTempOpen = promisify(temp.open);
const asyncWrite = promisify(fs.write);
const asyncClose = promisify(fs.close);


const makeTempPassword = (length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?$&*^';
    const charactersLength = characters.length;
    const specialChars = "!";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "1234567890"
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    result += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    result += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    return result;
}

const constructHTMLTemplate = (name, email, tempPassword, hash) => {

    return `
    <!DOCTYPE html>
        <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
        <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
        <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
        <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title></title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <!--[if lt IE 7]>
                <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->
            
            <h1>Hello ${name}</h1>
            <p>Thank you for signing up!</p>
            <p>Your temporary pass is ${tempPassword}</p>
            <p>You will be redirected to change it after activation</p>
            <p>click on the button below to activate your account</p>
            <button><a href="${process.env.BACKEND_BASE_URL}/auth/activate?id=${hash}&email=${email}&tempPass=${tempPassword}">ACTIVATE</a></button> 
        </body>
    </html>
    `
}

async function buildHTML  (req , res, next) {

    try {
        const {firstName, email } = req.body;

        const base64Hash = crypto
                        .createHmac('sha256', `${process.env.EMAIL_HASH_SECRET}`)
                        .update(email)
                        .digest('base64');
        console.log('here', base64Hash);
        const tempPassword = makeTempPassword(7);
        console.log('here', tempPassword);
        const template = constructHTMLTemplate(firstName, email, tempPassword, base64Hash);
       
        // const file = await writeToFile(`${base64Hash.replace("/", "")}.html`, 'w+', (err, file) => {
 

        //     return file
        // });

        // const write = await asyncWrite(file, template);
        // const close = await asynclose(file);

        temp.track();
        const formattedHash = base64Hash.replace("/", "");
        await asyncTempOpen( {suffix: '.html', prefix: formattedHash}, async (err, info) => {
            
            try{
                if(!err){
                console.log(info, err);
                req.tempPathName = info.path;
                await asyncWrite(info.fd, template, async (err) => {
        
                    if (err) res.status(500).json({where: "asyncTempOpen", message: err, success: false});

                    await asyncClose(info.fd, (err) => {
                        
                        if (err) res.status(500).json({where: "asyncTempOpen", message: err, success: false});
                        console.log("I got here");
                        
                        console.log(template);
                        next();  
                    });
                });
                
                } else {
                
                    res.status(500).json({where: "asyncTempOpen", message: err.message, success: false});
                }
            }catch(err){
                res.status(500).json({err, message: err.message, stack: err.stack});
            }
        });
        
         
    }catch(err){
        res.status(500).json({where: "BuildHTML", success: false, trace: err.stack, message: err.message, err})
    }
}



module.exports = buildHTML;