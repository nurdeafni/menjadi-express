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
    //Di something here
    console.log(req.body)
    if(!req.body.firstName){
        res.status(400).json({
            statusCode: 400,
            error: 'firstName parameter is required',
            message: 'firstName parameter is required'
        });
    }
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
// Detail profile data menggunakan methode get
//url http://localhost:3000/profile/detail/idmongo
app.get('/profile/detail/(:id)', async (req,res) =>{
    let statusCode= 200
    let message='Detail Person'
    var person = await PersonModel.findById(req.params.id).exec();
    const response= {
        statusCode: 200,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

//update data profile menggunakan methode put
// url http://localhost:3000/profile/update/idmongo
app.put('/profile/update/(:id)', async (req,res) =>{
    let statusCode= 200
    let message='Update Person'
    var person = await PersonModel.findByIdAndUpdate(req.params.id, req.body,
        { new: true});
    const response= {
        statusCode: 200,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

//Delete data methode get
// url http://localhost:3000/profile/delete/id
// app.get('/profile/delete/(:id)', async (req, res) =>{
//     let statusCode= 200
//     let message ='Delet Person'
//     var person = await PersonModel.findByIdAndDelete(req.params.id).exec();
//     const response= {
//         statusCode : statusCode,
//         error: message,
//         message: message,
//         content: person
//     }
//     res.status(statusCode).json(response);
// })
//Validasi Delete data methode get
// url http://localhost:3000/profile/delete/id
app.get('/profile/delete/(:id)', async (req, res) =>{
    const checkId = Mongoose.Types.ObjectId.isValid(req.params.id)
    //check dataobject id valid jika valid lakukan eksekusi delete
    let statusCode = 200
    let message ='Delet Person'
    if(checkId){// jika id valid delete data
        var person= await PersonModel.findByIdAndDelete(req.params.id).exec();
    }else{
        statusCode= 404
        message ='Object Id Invalid'
        var person= null;
    }
    const response= {
        statusCode : statusCode,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

// commit lagi dengan nama "membuat request post"
app.listen(port, () => console.log (`Example app Listening on port ${port}!` ))