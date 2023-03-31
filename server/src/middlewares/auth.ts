import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedUser {
    user: {
        email: string;
        password: string;
        user_id: number;
        first_name: string;
        last_name: string;
        phone_number: number;
        user_is_admin: boolean;
    };
}


interface RequestWithUser extends Request {
    user: DecodedUser;
}

function authenticateUser(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string) as DecodedUser;
        (req as RequestWithUser).user = verified; 
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token!' });
    }
}

function authorizeAdmin(req: RequestWithUser, res: Response, next: NextFunction) {
    if (req.user.user.user_is_admin !== true) {
        return res.status(403).send({ error: 'Unauthorized: Not an admin' });
    }
    next();
}

export = {
    authenticateUser,
    authorizeAdmin,
};
