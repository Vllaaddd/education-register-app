import bcrypt from 'bcrypt';
import EmployeeModel from '../models/Employee.js';
import { createTokens, validateToken } from "../JWT.js";

export const login = async (req, res) => {
    try {
        
        const { email, password } = req.body
        const user = await EmployeeModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message: 'Користувача не існує',
            })
        }

        const dbPassword = user.password;
        bcrypt.compare(password, dbPassword).then((match) => {
            if(!match){
                res.status(400).json({error: "Wrong username or password!"})
            }else{

                const accessToken = createTokens(user)

                res.cookie("access-token", accessToken, {
                    maxAge: 60*60*24*30*1000
                })

                res.json("Logged in")
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Не вдалось увіти',
        })
    }
}

export const profile = async (req, res) => {
    res.json("profile")
}