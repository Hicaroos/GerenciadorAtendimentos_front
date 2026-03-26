import { prisma } from "../lib/prisma";


export class AuthService {

  static async login(
    name : string,
    password : string,
  ):Promise<string> {
    
    const user = await prisma.user.findMany({ 
      where: { 
        name,
        password,
      } 
    });
  }
  
  static async register(
    username : string,
    password : string,
  ):Promise<string> {

  }
}