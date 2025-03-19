import jwt from 'jsonwebtoken'
export const   generateToken = (id,role) =>{

try {
    
    const token = jwt.sign({id,role},process.env.JWT_SECRETKEY)
} 
  
catch (error) {
    console.log(error)
}
}