const err =(err,req,resp,next)=>{
    console.log(err.statusCode, err.message)
    if(err.code===11000){
        return resp.status(400).json({
            status:"false",
            message:"Duplicate entry found",
            timestamp:new Date(),
            path:req.path //req.path and req.url both give the same output but req.path is more efficient than req.url as it does not have to parse the url to get the path
        })
    }
    // mongoose validation error (schema required fields)
    else if (err.name === "ValidationError") {
        return resp.status(400).json({
            status: false,
            message: err.message,
            timestamp: new Date(),
            path: req.path
        })
    }
    // mongoose invalid ObjectId (bad _id format)
    else if (err.name === "CastError") {
        return resp.status(400).json({
            status: false,
            message: "Invalid ID format",
            timestamp: new Date(),
            path: req.path
        })
    }
       // jwt invalid token
    else if (err.name === "JsonWebTokenError") {
        return resp.status(401).json({
            status: false,
            message: "Invalid token",
            timestamp: new Date(),
            path: req.path
        })
    }

    // jwt expired token
    else if (err.name === "TokenExpiredError") {
        return resp.status(401).json({
            status: false,
            message: "Token expired, please login again",
            timestamp: new Date(),
            path: req.path
        })
    }
    // express malformed json body
    else if (err.type === "entity.parse.failed") {
        return resp.status(400).json({
            status: false,
            message: "Invalid JSON in request body",
            timestamp: new Date(),
            path: req.path
        })
    }
    else{
        return resp.status(err.statusCode || 500).json({
            status:false,
            statusCode:err.statusCode || 500,
            message:err.message || "Internal server error",
            timestamp:new Date(),
            path:req.path
        })
    }
}

module.exports= err