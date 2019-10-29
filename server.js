const express = require('express')
const app = express()
const port = 3000
//memanggil library body parser
const bodyParser = require('body-parser');
//config body parser
app.use(bodyParser.urlencoded({extended: true})); // menangkap type request dalam bentuk from urlencoded
app.use(bodyParser.json()); // menangkap url dalam bentuk json

const Mongoose = require('./mongoModel/MongoConfig') // memanggil MongoConfig.js
const PersonModel = Mongoose.model('person',{
    firstName: String,
    lastName: String
})

app.get('/', (req, res) => res.send('Hello World!')) 
// run aplikasi

//membuat request post
// nama request firstName, lastName
app.post('/profile',async (req,res)=>{
    const insert={
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    var person = new PersonModel(insert);
    var result = await person.save();
    const response ={
        statusCode : 200,
        error :'',
        message: 'create person',
        content: result
    }
    res.json(response);
})
//menampilkan semua data
//url http://localhost:3000/profile/list
app.get('/profile/list', async (req,res) =>{
    //Do something here
    var person = await PersonModel.find().exec();
    const response= {
        statusCode: 200,
        error: '',
        content: person
    }
    res.json(response);
})

// commit lagi dengan nama "membuat request post"
app.listen(port, () => console.log (`Example app Listening on port ${port}!` ))