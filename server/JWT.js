import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const createTokens = (user) => {
    const accessToken = sign({ useremail: user.email, id: user._id }, "secret123")

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if(!accessToken) return res.status(400).json({error: "User is not authenticated!"})

    try{
        const validToken = verify(accessToken, "secret123")
        if(validToken){
            req.authenticated = true
            return next()
        }
    }catch(err){
        return res.status(400).json({error: err})
    }
}

export { createTokens, validateToken };