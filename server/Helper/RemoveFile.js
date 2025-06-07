const fs = require('fs').promises;

let RemoveFile = async(path) => {
    let fileExist;
    try {
      await fs.access(path)
      fileExist = true;
    } catch (e) {
      console.log(e)
      fileExist = false;
    }
    if(fileExist){
       fs.unlink(path)
    }
}

module.exports = RemoveFile