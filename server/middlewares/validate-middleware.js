const validate=(scheme)=>async(req,res,next)=>{
    try {
        const parseBody=await scheme.parseAsync(req.body);
        req.body=parseBody;
        next();
    } catch (err) {
        const status=422;
        const message="Fill the input properly";
        //console.log(message);
        const extraDetails=err.errors[0].message;
        const error={
            status,
            message,
            extraDetails,
        };
        console.log(error);
        //res.status(400).json({msg:"validation failed"});
        next(error);
    }
}
module.exports=validate;