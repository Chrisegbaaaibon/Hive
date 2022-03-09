// Controller -- -- --

const bee = require('../database/schema')


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
         res.json({emails})
      };
   });
}
