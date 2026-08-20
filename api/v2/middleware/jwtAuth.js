import jwt from 'jsonwebtoken';

export const verifyJwt = (req, res, next) => {
    // 1. Check for token in Authorization header (Bearer token)
    let token = req.headers['authorization']?.split(' ')[1]; 
    
    // 2. If not found in headers, check for 'KSToken' in cookies
    if (!token && req.headers.cookie) {
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {});
        token = cookies['KSToken'];
    }

    // 3. If still no token, deny access
    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No token provided' });
    }

    // 4. Verify the token
    try {
        // Ensure you have JWT_SECRET defined in your .env file
        const secret = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY';
        
        const verified = jwt.verify(token, secret);
        
        // Attach the decoded user payload to the request object
        req.user = verified;
        
        // Proceed to the controller
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid or Expired Token' });
    }
};
