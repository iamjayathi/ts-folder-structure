import RoleService from "@services/v1/book";
import express from "express";

class RoleController {
  static async create(request: express.Request, response: express.Response) {
    const result = await RoleService.create(request.body);
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

  static async getAll(request: express.Request, response: express.Response) {
    const result = await RoleService.getAll();
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

}

export default RoleController;