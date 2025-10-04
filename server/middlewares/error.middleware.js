export const errormiddleware=(err,req,res,next)=>{
    err.statuscode=err.statuscode || 500;
    err.message=err.message|| "Internal server error "
    res.status(err.statuscode).json({
        success:false,
        errmessage: err.message,
    })
}