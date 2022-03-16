// Controller -- -- --

const bee = require('../database/schema');
const nodemailer = require('nodemailer');

 exports.AddEmail = async (req, res)=>{
    try {
      //  Lets make our own status codes
      //  401 - Email Already Exists
      //  200 - Email Added Successfully!
      var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: 'hivendtech@gmail.com',
           pass: process.env.PASS
         }
       });
       let email = req.body.email;
      const checkifEmailExists = await bee.find({ email: email }).limit();
      if (checkifEmailExists.length !== 0){
         res.json({
            status: "401"
         })
      }
      else{
          
          var mailOptions = {
            from: '<Hivend>',
            to: email,
            subject: 'Hivend Waitlist',
            html: `<center><h2><b>Thank you for joining our waitlist</b></h2><h4>We will send a mail as soon as we launch.<br> Anticipate!!!🥳🚀</h4></center>`
          };
          
          let emailCreated = new bee({email})
          transporter.sendMail(mailOptions, (error, info)=>{
             if (error) {
                console.log(error);
               } else {
                  console.log('Email sent');
               }
            })
            await   emailCreated.save()
            res.json({
               status: "200",
               data: emailCreated
            })
            console.log('saved')
      }
    } catch (error) {
      console.log(error); 
    }
   }

exports.GetEmails = ( req, res)=>{
   bee.find((err, emails)=>{
      if(err){
         console.log(err)
         res.status(401).json({
            message: "Couldn't retrieve all emails!!😑😑"
         });
      }else{
         
         res.json({emails})
      };
   });
}


