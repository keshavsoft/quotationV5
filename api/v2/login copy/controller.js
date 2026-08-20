import { getAllUsers } from './repository.js';
import { verifyAndGenerateToken } from './service.js';

const loginUser = (req, res) => {
    const { UserName, Password } = req.body || {};

    if (!UserName || !Password) {
        return res.status(400).json({ error: 'UserName and Password are required' });
    }

    try {
        const users = getAllUsers();
        
        const token = verifyAndGenerateToken({ 
            inUserName: UserName, 
            inPassword: Password, 
            inUsers: users 
        });

        if (!token) {
            return res.status(401).json({ error: 'Invalid UserName or Password' });
        }

        res.status(200).json({
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default loginUser;
