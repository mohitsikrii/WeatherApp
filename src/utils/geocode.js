const request = require ('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhY2hpaWlnb3lhbCIsImEiOiJja2JnZXY3NDIwN2h4MnJwM2xjd2RkbW40In0.rr4JEFbT4tQCcL1Q9o771w&limit=1'
    
    request({url,json:true},(error,{body}) =>{
      if(error){
          callback('Unable to connect to location services',undefined)
      }else if(body.features.length === 0){
          callback('Unable to find location .Try another search',undefined)
      }else{
          callback(undefined,{//yaha undefined kyu likha kyunki ye jb print hoga
            //tb na toh internet lost hoga au naahi location galat hogi toh sb shi h toh no error but error ke mei kuch daalna toh pdega na islie undefined
              longitude: body.features[0].center[0],
              latitude:body.features[0].center[1],
              location:body.features[0].place_name
          })
      }

    })
}

module.exports = geocode
