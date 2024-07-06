import bcrypt from 'bcrypt';
import EmployeeModel from '../models/Employee.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        
        const { email, password } = req.body
        const user = await EmployeeModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message: 'Користувача не існує',
            })
        }

        if(password){
            const dbPassword = user.password;
            const validPassword = bcrypt.compareSync(password, dbPassword)
            if(!validPassword){
                return res.status(400).json({error: "Невірний пароль або email"})
            }
        }

        const token = jwt.sign({ id: user._id }, 'secret123')
        const { password: hashedPassword, ...rest } = user._doc;

        const oneMonthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
        const expirationDate = new Date(Date.now() + oneMonthInMilliseconds);

        res.cookie('access_token', token, { httpOnly: true, expires: expirationDate }).status(200).json({
            user: rest,
            token,
            redirectTo: '/'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Не вдалось увіти',
        })
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Вихід успішний');
};