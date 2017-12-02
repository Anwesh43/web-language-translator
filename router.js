const router = require('express').Router()
router.get('/translateWord/:lang/:sentence',(req,res)=>{
    res.send(`${req.params.lang} ${req.params.sentence}`)
})
module.exports = router
