const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp')



const bee = new  Schema ({
   email : {
      type: String,
      required: true,
      unique: true
   },
},
{
      timestamps: true
   }
   );

module.exports = mongoose.model("bee", bee);