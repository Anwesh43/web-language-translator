const childProcess = require('child_process')
const seqQueue = require('seq-queue')
const queue = seqQueue.createQueue(1000)
class TranslateApi {
    translate(lang,sentence,cb) {
        this.executeTranslateProcess(lang,sentence,cb)
    }
    executeTranslateProcess(lang,sentence,cb) {
        childProcess.exec(`trans :${lang} "${sentence}"`,(err,stdout,stderr) => {
            if(err == null && sentence.trim() != "") {
                const k = (sentence.split(" ").length == 1)?3:2
                const result = stdout
                const lines = result.split('\n')
                if(lines.length >= k+1) {
                    cb(lines[k].replace("[1m","").replace("[22m",""))
                }
            }
        })
    }
    translateAsync(lang,sentence,cb) {
        queue.push((task)=>{
            this.translate(lang,sentence,(sentence)=>{
                cb(sentence)
                task.done()
            })
        })
    }
}
const translateApi = new TranslateApi()
module.exports = translateApi
