const express = require('express')
const app = express()
const port = 3000
//memanggil library body parser
const bodyParser = require('body-parser');
//config body parser
app.use(bodyParser.urlencoded({extended: true})); // menangkap type request dalam bentuk from urlencoded
app.use(bodyParser.json()); // menangkap url dalam bentuk json

app.get('/', (req, res) => res.send('Hello World!')) 
// run aplikasi

//membuat request post
app.post('/helo',function (req,res){
    const respon ={
        statusCode : 200,
        error :'',
        message: 'hello json',
    }
    res.json(respon);
})

// commit lagi dengan nama "membuat request post"
app.listen(port, () => console.log (`Example app Listening on port ${port}!` ))