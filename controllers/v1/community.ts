import CommunityService from "@services/v1/book";
import express from "express";

class CommunityController {
  static async getAll(request: express.Request, response: express.Response) {
    const result = await BookService.getAll();
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

  static async getSingle(request: express.Request, response: express.Response) {
    const result = await BookService.getSingle(Number(request.params.id));
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }
}

export default BookController;