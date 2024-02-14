import UserService from "@services/v1/book";
import express from "express";

class UserController {
  static async signup(request: express.Request, response: express.Response) {
    const result = await UserService.signup(request.body);
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

  static async signin(request: express.Request, response: express.Response) {
    const result = await UserService.signin(request.body);
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

  static async getMe(request: express.Request, response: express.Response) {
    
    const result = await UserService.getMe(req);
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

}

export default UserController;
