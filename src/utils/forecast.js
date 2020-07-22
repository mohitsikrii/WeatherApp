const request = require('request')

const forecast = (longitude,latitude,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=dcd9ef51e0633b115018e5e3be5580d5&query=' + longitude + ',' + latitude

    request({ url:url,json:true},(error,{body}) =>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.error){
            callback('Wrong location entered',undefined)
        }else{
            
               callback(undefined,'It is currently ' + body.current.temperature + ' degrees out.There is ' + body.current.humidity + ' humidity')

                
        }
  
      })
  }
  
  module.exports =forecast
  