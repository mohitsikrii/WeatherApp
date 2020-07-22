const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()
const pathDirectory = path.join(__dirname,'../public')
const pathtoTemplate = path.join(__dirname,'../templates/views')
const pathtoPartials = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',pathtoTemplate)
hbs.registerPartials(pathtoPartials) 
app.use(express.static(pathDirectory))


app.get('/',(req,res)=>{
res.render('index',{
        title: 'Weather',
        name: 'Mohit Sikri',
        name2: 'Prachi Goyal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Mohit Sikri',
        title: 'About',
        name2: 'Prachi Goyal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        email: 'sikrimohit454@gmail.com',
        title: 'Help',
        name: 'Mohit Sikri',
        name2: 'Prachi Goyal'
    })
})
 

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search result'}
            )
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'}
            )
    }
    
    
        geocode(req.query.address, (error,{latitude,longitude,location}={})=>
{
    if(error){                                         
         return res.send({error})
    }

    
    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
          return res.send({error})
      }

        res.send({
           
       forecast : forecastData,
        location,
        address :req.query.address
      })
    })
})
})
    app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Mohit Sikri',
        name2: 'Prachi Goyal',
        errorMessage:'Help Article Not Found'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Mohit Sikri',
        name2: 'Prachi Goyal',
        errorMessage:'Page Not Found'
    })
})
app.listen(3000, ()=>
    {
        console.log('App started at port:3000')
    })