const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/belajarmongo');
//bikin model untuk Collection person
const PersonModel = mongoose.model('person',{
    firstName: String,
    lastName: String
});

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello',function(req,res){
    const respon ={
        statusCode : 200,
        error :'',
        message : 'hello json'
    }
    res.json(respon);
})

app.post('/create',async (req,res) => {
    console.log(req.body);
    var person= new PersonModel(req.body);
    var result= await person.save();
    const response ={
        statusCode : 200,
        error :'',
        message: 'create person',
        content : result
    }
    res.json(response);
})
app.listen(port, () => console.log (`Example app Listening on port ${port}!` ))