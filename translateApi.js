const childProcess = require('child_process')
const seqQueue = require('seq-queue')
const queue = seqQueue.createQueue(1000)
class TranslateApi {
    translate(lang,sentence,cb) {
        this.executeTranslateProcess(lang,sentence,cb)
    }
    executeTranslateProcess(lang,sentence,cb) {
        childProcess.exec(`trans :${lang} "${sentence}"`,(err,stdout,stderr) => {
            if(err == null) {
                const result = stdout
                const lines = result.split('\n')
                if(lines.length >= 3) {
                    cb(lines[2])
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
