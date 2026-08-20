import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const loginUser = (req, res) => {
    const { UserName, Password } = req.body || {};

    if (!UserName || !Password) {
        return res.status(400).json({ error: 'UserName and Password are required' });
    }

    try {
        // Read UsersTable.json
        const usersPath = path.join(process.cwd(), 'Data', 'UsersTable.json');
        const usersData = fs.readFileSync(usersPath, 'utf8');
        const users = JSON.parse(usersData);

        // Find matching user
        const user = users.find(u => u.UserName === UserName && u.Password === Password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid UserName or Password' });
        }

        const payload = {
            UserName: user.UserName,
            dataPk: user.DataPk,
            role: "admin"
        };

        const secret = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY';
        const options = { expiresIn: '1h' };

        const token = jwt.sign(payload, secret, options);

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
