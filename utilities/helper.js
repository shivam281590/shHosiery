const path=require('path');

exports.getRootDir=()=>{
    return path.resolve(__dirname,'../');
}