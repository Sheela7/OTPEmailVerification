
module.exports = (func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch((error)=>{
            if(typeof error === 'string'){
            res.status(401).json({"status":"error","message":[error],"data":null});
            }else{
            res.status(401).json({"status":"error","message":error,"data":null});
            }
       });
    }
}