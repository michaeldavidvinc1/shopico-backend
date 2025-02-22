import {NextFunction, Response, Request} from "express";
import {LoginRequest, RegisterRequest} from "../../model/request/auth-request";
import {AuthService} from "../service/auth-service";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction){
        try {
            const request: RegisterRequest = req.body as RegisterRequest;
            const result = await AuthService.register(request);
            res.status(200).json({
                success: true,
                message: "Register successfully",
                data: result,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                next(error);
            } else {
                next(new Error("An unknown error occurred"));
            }
        }
    }

    static async loginAdmin(req: Request, res: Response, next: NextFunction){
        try {
            const request: LoginRequest = req.body as LoginRequest;
            const result = await AuthService.loginAdmin(request, res);
            res.status(200).json({
                success: true,
                message: "Login successfully",
                data: result,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                next(error);
            } else {
                next(new Error("An unknown error occurred"));
            }
        }
    }

    static async login(req: Request, res: Response, next: NextFunction){
        try {
            const request: LoginRequest = req.body as LoginRequest;
            const result = await AuthService.login(request, res);
            res.status(200).json({
                success: true,
                message: "Login successfully",
                data: result,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                next(error);
            } else {
                next(new Error("An unknown error occurred"));
            }
        }
    }

    static async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.params.token;
            const result = await AuthService.verifyToken(token);

            res.status(200).json({
                success: true,
                message: "Token verified successfully",
                data: result,
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "TokenExpiredError") {
                    res.status(401).json({
                        success: false,
                        message: "Token has expired, please login again.",
                        data: true,
                    });
                }
                return next(error); // Make sure to return this
            }
            next(new Error("An unknown error occurred"));
        }
    }


}