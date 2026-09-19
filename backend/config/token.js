import jwt from 'jsonwebtoken'


 async function generateToken(userId){

      try {
        
        const token = await  jwt.sign(userId,process.env.JWT_SECRET,{expiresIn:"9d"})
        return token

      } catch (error) {
        console.log(error);
        
        
      }

 }

 export default generateToken