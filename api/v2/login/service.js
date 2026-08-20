import jwt from 'jsonwebtoken';
import { getAllUsers } from './repository.js';

export const verifyAndGenerateToken = ({ inUserName, inPassword }) => {
    const localUserName = inUserName;
    const localPassword = inPassword;

    const users = getAllUsers();
    const user = users.find(u => u.UserName === localUserName && u.Password === localPassword);
    
    if (!user) {
        return null;
    }

    const payload = {
        UserName: user.UserName,
        dataPk: user.DataPk,
        role: "admin"
    };

    const secret = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY';
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
};
