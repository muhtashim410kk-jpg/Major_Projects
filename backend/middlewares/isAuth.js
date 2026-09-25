import jwt from 'jsonwebtoken'

  async function isAuth(req,res,next){

      try {
        
        console.log("COOKIES:", req.cookies);

        const token = req.cookies?.token;

        console.log("TOKEN:", token);
        if(!token){
            return res.status(400).json({message:"Token not found"})
        }

        const verifyToken = await jwt.verify(token,process.env.JWT_SECRET)

         console.log("VERIFIED TOKEN:", verifyToken);

        req.userId = verifyToken.userId

                 next()

      } catch (error) {
    console.log("IS AUTH ERROR:", error);

    return res.status(500).json({
        message: "is auth error",
        error: error.message
    });
}

  }

  export default isAuth