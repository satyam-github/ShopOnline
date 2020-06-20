import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'mysecret';
export const getToken = (user) => {
    try {
        console.log(secret);
        return jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,    
        }, secret, {
          expiresIn: '2h'
        });
    } catch (err) {
        console.log("Error signing JWT");
    }   
}

export const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, secret, (err, decode) => {
            if(err) {
                return res.status(401).send({msg: 'Invalid Token'});
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({msg: 'Token not supplied'});
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({msg: 'Admin token not valid'});
}