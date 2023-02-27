const fs=require('fs');
const file="config.json";
let result;
exports.global = function()
{
    if(!result){
        result=JSON.parse(fs.readFileSync(file));
    }
    return result.global;
}
exports.param=function(){
    if(!result){
        result=JSON.parse(fs.readFileSync(file));
    }
    return result.param;
}