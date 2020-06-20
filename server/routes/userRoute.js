import express from 'express';
import User from '../models/userModel';
import { getToken } from '../utils';

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      })
    } else {
      res.status(401).send({ msg: 'Invalid User Data.' });
    }
  
  })

router.post('/signin', async (req, res) => {
    try {
        const signinUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if(signinUser) {
            console.log("Success");
            res.send({
                id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser)
            });
        } else {
            console.log("Failed");
            res.status(401).send({
                msg: 'Invalid email or password'
            })
        }
    } catch (error) {
        console.log("Internal Server Error");
        res.status(500).send({
            msg: 'Internal server error'
        });
    }
    
})

router.get('/create-admin', async (req, res) => {
    
    try {
        const user = new User({
            name: 'Satyam',
            email: "satyam@gmail.com",
            password: 'satyam',
            isAdmin: true
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({msg: error.message});
    }
})

export default router;