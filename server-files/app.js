const express = require('express');
const morgan = require('morgan');
const googleApps = require('./google-apps.js');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(morgan('common)'));

app.get('/apps', (req,res)=>{

const {genres = "", sort} =req.query; 

if(sort){
if(!['Rating', 'App'].includes(sort))
{return res.status(400).send('Sort must be one of app or rating');}}

//filter for genres
let results = googleApps.filter(app=>
    app.Genres.toLowerCase().includes(genres.toLowerCase()));

//sort by rating or app
if (sort){
    results.sort((a,b)=>{
        return a[sort] >b[sort] ? 1 :a[sort] < b[sort] ? -1 : 0;
    });
}
   res.json(results)

});

app.listen(8000,()=>{
    console.log('Server state PORT 8000');
});