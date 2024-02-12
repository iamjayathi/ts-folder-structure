import { IBook } from "@interfaces/v1/book";
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

  static async create(data: IBook) {
    return Database.instance.collection(collections.community).insertOne(data);
  }
}

export default BookService;