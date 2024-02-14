import CommunityService from "@services/v1/book";
import express from "express";

class CommunityController {
  static async create(request: express.Request, response: express.Response) {
    SetContext('userId', req.user.data.id)
    const result = await CommunityService.create(request.body);
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

  static async getAll(request: express.Request, response: express.Response) {
    const result = await CommunityService.getAll();
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

  static async getAMembers(request: express.Request, response: express.Response) {
    
    const result = await CommunityService.getMembers(Number(req.params.id));
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }

  static async getOwned(request: express.Request, response: express.Response) {
     SetContext('userId', req.user.data.id)
    const result = await CommunityService.getOwned();
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }
  static async getJoined(request: express.Request, response: express.Response) {
    SetContext('userId', req.user.data.id)
    const result = await CommunityService.getJoined(Number(request.params.id));
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }
}

export default CommunityController;
