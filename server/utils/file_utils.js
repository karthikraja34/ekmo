const fs = require('fs')

module.exports = function () {
    this.createFile = function (content, filename) {     
        let filepath = `${__dirname}/${filename}`    
        fs.appendFile(filepath, content, function (err) {
            if (err) throw err;
        });        
        return filepath
    }

    this.deleteFile = function (filepath) {
        fs.unlink(filepath, (err) => {
            if (err) throw err;
        });
    }
}