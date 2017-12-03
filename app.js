var express = require('express')
var app = express()
var router = require('./router')
app.use('/app',router)
app.listen(8000,()=>{
    console.log("listening in port 8000")
    const translateApi = require('./translateApi')
    for(var i=0;i<10;i++) {
      translateApi.translateAsync('hi',`hello world ${i}`,(sentence)=>{
        console.log("testing the sentence is")
        console.log(sentence)
      })
    }
})
