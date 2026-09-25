import jwt from 'jsonwebtoken'


  function generateToken(userId){

      try {
        
        const token =   jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"9d"})
        return token

      } catch (error) {
        console.log("TOKEN GENERATION ERROR:", error);
        throw error ;
        
        
      }

 }

 export default generateToken