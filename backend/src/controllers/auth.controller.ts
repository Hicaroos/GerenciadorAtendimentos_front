import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {

  static async login(
    req : Request, 
    res : Response
  ):Promise<Response> {
    const { name, password } = req.body;

    await AuthService.login(
      name, 
      password,
    );

    return res.status(200).json({ 
      success: 'Sucesso a fazer login!',
    })
  }

  static async register(
    req : Request, 
    res : Response
  ):Promise<Response> {

  }
}