const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
// const { urlencoded } = require('body-parser');
const router = require('./routes/router');
const { db } = require('./database/connection');
require('dotenv').config();

const app = express();

app.use(cors())

const PORT = process.env.PORT

app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api', router);

app.get('/', (req, res)=>{
   res.send(
       "Sure!����"
   )
})


app.listen(PORT || 4000,  ()=>{
   db()
   console.log('running on port ' + PORT) 
});

module.exports = app