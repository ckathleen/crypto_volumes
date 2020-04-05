// This script saves a csv file of volume and is run with nodeJS. 
// To execute: npm install && node volume_script.js
// API docs: http://docs.nomics.com/#tag/Volume

const axios = require('axios').default
const config = require('./config_script.js')
const nomics_key = config.nomics_key
const fs = require('fs')
const date_range = 'start=2017-01-01T00%3A00%3A00Z&end=2020-04-01T00%3A00%3A00Z'
var volume_data

axios.get(`https://api.nomics.com/v1/volume/history?key=${nomics_key}&${date_range}&convert=BTC&format=csv`)
  .then(response => volume_data = response.data)
  .catch(error => console.log(error))
  .then(() => {
    fs.writeFile('volume_data.csv', volume_data, err => {
      err ? console.log('error saving') : console.log('File saved!')
    })
  })