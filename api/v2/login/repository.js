import fs from 'fs';
import path from 'path';

export const getAllUsers = () => {
    const usersPath = path.join(process.cwd(), 'Data', 'UsersTable.json');
    const usersData = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(usersData);
};
