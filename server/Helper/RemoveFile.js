const fs = require('fs').promises;
let RemoveFile = async (filePath) => {
    if (!filePath) {
        console.error("RemoveFile: filePath is undefined or empty.");
        return;
    }
    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
    } catch (e) {
        if (e.code !== 'ENOENT') {
            console.error("RemoveFile error:", e);
        }
    }
}

module.exports = RemoveFile;