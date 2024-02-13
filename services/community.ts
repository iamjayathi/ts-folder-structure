import { ICommunity } from "@interfaces/v1/community";
import Database from "@loaders/v1/database";
import CommunityColumn from "@schema/v1/book";
import collections from "@schema/v1/meta";

class CommunityService {
  static async getAll() {
    return Database.instance.collection(collections.community).find().toArray();
  }

  static async getSingle(id: number) {
    return Database.instance
      .collection(collections.community)
      .findOne({ id: { $eq: id } });
  }

  static async create(data: ICommunity) {
    return Database.instance.collection(collections.community).insertOne(data);
  }
static async getMembers(id: number) {
    const comm = Database.instance.collection(collections.community).findone({slug: id});
    const data = await Database.instance.collection(collections.member).find({ community: community._id }, { __v: false })
      .populate({ path: "role", select: "id name" })
      .populate({ path: "user", select: "id name" })
      .sort({ created_at: -1 })
      
    return 
  }
}
export default BookService;