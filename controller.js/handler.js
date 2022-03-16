// Controller -- -- --

const bee = require('../database/schema');
const nodemailer = require('nodemailer');

 exports.AddEmail = async (req, res)=>{
    try {
      //  Lets make our own status codes
      //  401 - Email Already Exists
      //  200 - Email Added Successfully!
       let email = req.body.email;
      const checkifEmailExists = await bee.find({ email: email }).limit();
      if (checkifEmailExists.length !== 0){
         res.json({
            status: "401"
         })
      }
      else{
         let emailCreated = new bee({email})
        await   emailCreated.save()
      //   In case if you still wiant to use it
         //res.status(200).json({
            //message: "Added!🚀🚀",
            //data: emailCreated
         //})
         res.json({
             status: "200",
             data: emailCreated
          })
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
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'hivendtech@gmail.com',
              pass: process.env.PASS
            }
          });
          
          var mailOptions = {
            from: 'hivendtech@gmail.com',
            to: `${emails}`,
            subject: 'Hivend Waitlist',
            html: `<center><h2><b>Thank you for joining our waitlist</b></h2><h4>We will send a mail as soon as we launch.<br> Anticipate!!!</h4></center>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent');
            }
          });
         res.json({emails})
      };
   }).select("email");
}

exports.sendMails = async (req, res)=>{

}

