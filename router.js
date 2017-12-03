const router = require('express').Router()
const translateApi = require('./translateApi')
router.get('/translateWord/:lang/:sentence',(req,res)=>{
    const lang = req.params.lang,sentence = req.params.sentence
    translateApi.translateAsync(lang,sentence,(sentence)=>{
        res.send(sentence)
    })
})
module.exports = router
