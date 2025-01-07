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
        } catch (e) {
            next(e);
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
        } catch (e) {
            next(e);
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
        } catch (e) {
            next(e);
        }
    }
}