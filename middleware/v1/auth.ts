import  jwt from 'jsonwebtoken';
import Env from "./env";
import { Request, Response, NextFunction } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.body.access_token || req.cookies.access_token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(400).json({
                status: false,
                errors: [
                    {
                        param: "access_token",
                        message: "Not signed in.",
                        code: "UNAUTHORISED_ACCESS"
                    }
                ]
            });
        }

        const payload = await jwt.verify(token, Env.variable.JWT_SECRET as string);
        req.user = payload as any;
        next();

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "ERROR: authorizing. Sign In please. => " + error.message
        });
    }
};