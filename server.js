import express from 'express';
import dotenv from 'dotenv';
import { users } from './data.js';

dotenv.config();
const app = express();

app.use(express.json());

app.put('/user', (req, res) => {
    const userQuery = req.query.user;
    if (!userQuery || userQuery.trim() === '') {
        return res.status(400).json({ message: 'User parameter cannot be empty.' });
    }
    const { email, password } = req.body;
    const index = users.findIndex(u => u.email.toLowerCase() === userQuery.toLowerCase());
    if (index === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }
    if (email) users[index].email = email;
    if (password) users[index].password = password;
    return res.json({ message: 'User updated.', data: users[index] });
});

app.delete('/user', (req, res) => {
    const userQuery = req.query.user;
    if (!userQuery || userQuery.trim() === '') {
        return res.status(400).json({ message: 'User parameter cannot be empty.' });
    }
    const index = users.findIndex(u => u.email.toLowerCase() === userQuery.toLowerCase());
    if (index === -1) {
        return res.status(404).json({ message: 'Email not found.' });
    }
    const removedUser = users.splice(index, 1);
    return res.json({ message: 'User deleted successfully.', data: removedUser[0] });
});

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}.`);
        });
    } catch (error) {
        console.error('Failed to start server.');
    }
};

startServer();