import jwt from 'jsonwebtoken'

//this middleware will authenticate user whenever user wants to add product or update the cart etc by verifying their id using token

const authUser = async (req, res, next) => {
    // we get token from headers
    const {token } = req.headers;
    if(!token){
        return res.json({success:false, message:'Not Authorised'})
    }
    try {
        // if token is available, decode it
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //add userId in the body of the req
        req.body.userId = token_decode.id;
        next()
        
    } catch (error) {
        console.log(error)
        res.json({succes:false, message: error.message})
        
    }
};

export default authUser;

