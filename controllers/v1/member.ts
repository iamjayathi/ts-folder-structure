import MemberService from "@services/v1/book";
import express from "express";

class MemberController {
  
  static async add(request: express.Request, response: express.Response) {
     SetContext('userId', req.user.data.id)
    const result = await MemberService.add();
    return response.json({
      status: true,
      content: {
        data: result,
      },
    });
  }
  static async remove(request: express.Request, response: express.Response) {
    const result = await MemberService.remove(Number(request.params.id));
    return response.json({
      status: true,
    //   content: {
    //     data: result,
    //   },
    });
  }
}

export default MemberController;
