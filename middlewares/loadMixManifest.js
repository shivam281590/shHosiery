const path=require('path');
const fs = require('fs');

module.exports=((req, res, next) => {
    const manifestPath = path.resolve(__dirname, '../public/mix-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    res.locals.mix = (file) => manifest[file] || file;
    next();
});