import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt';  
import jwt from 'jsonwebtoken';

export class AuthService {

  static async login(
    name : string,
    password : string,
  ):Promise<{ accessToken: string }> {
    
    const user = await prisma.user.findFirst({ 
      where: { 
        name,
        password,
      }, 
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { 
          sub   : user.name, 
          scope : user.role,
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );

      return { accessToken: token };
    } 
  }
  
  static async register(
    username : string,
    password : string,
  ):Promise<string> {

  }
}