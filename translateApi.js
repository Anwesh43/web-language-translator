const childProcess = require('child_process')
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
}
const translateApi = new TranslateApi()
module.exports = translateApi
