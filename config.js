var fs=require('fs');
var file="config.json";
var result;
exports.gobal = function()
{
    if(!result){
        result=JSON.parse(fs.readFileSync(file));
    }
    return result.gobal;
}
exports.param=function(){
    if(!result){
        result=JSON.parse(fs.readFileSync(file));
    }
    return result.param;
}