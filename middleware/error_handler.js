
module.exports = (func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch((error)=>{
            res.status(401).json({"status":"error","message":error,"data":null});
        });
    }
}