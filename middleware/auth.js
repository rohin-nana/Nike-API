import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

async function auth(req, res, next) {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        console.log(10);
        return next(new UnAuthenticatedError('Authentication invalid'));
    }
    const token = authHeader.split(' ')[1]; // bearer <space> token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET); // issue: might be expired, tampered with
        // attach the user request object
        // req.user = payload
        req.user = { userId: payload.userId };
        return next();
    } catch (error) {
        return next(new UnAuthenticatedError('Authentication invalid'));
    }
}

export default auth;