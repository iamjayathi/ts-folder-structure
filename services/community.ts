import { ICommunity } from "@interfaces/v1/community";
import Database from "@loaders/v1/database";
import CommunityColumn from "@schema/v1/book";
import collections from "@schema/v1/meta";
import Validator from 'validatorjs';
const { Snowflake } = require("@theinternetfolks/snowflake");

class CommunityService {
  static async create(data: ICommunity) {

      const comdata = {
        name: data.name,
      };

      const rules = {
        name: "required|min:2",
      };

      const customMessages = {
        'min.name': {
          string: 'The :attribute must be at least :min characters.',
        },
        'required.name': {
          string: 'The :attribute must be at least 2 characters.',
        },
      };

      let validation = new Validator(comdata, rules, customMessages);

      if (validation.fails()) {
        throw new Error(validation.errors.all());
      } else {
        console.log("Validation passed");
      }

      const user_id:Number = getContext('userId');

      const generatedId = Snowflake.generate().toString();

      const alreadyExists = await Database.instance.collection(collections.community).findOne({ name });
      if (alreadyExists) {
        return next({ status: 400, errors: "Community with this name already exists" });
      }

      const community = await Database.instance.collection(collections.community).create({
    _id: generatedId,
    name,
    slug: name.toLowerCase(),
    owner: id,
  });

  //Not Sure how error handling works here
    
    return community;
  }



  static async getAll() {
    return Database.instance.collection(collections.community).find().toArray();

  //Not Sure how error handling works here
  }



  static async getMembers (id: Number) {

    const community = Database.instance.collection(collections.community).findOne({ id: { $eq: id } })

    const memdata = await Database.instance.collection(collections.member).find({ community: community._id }, { __v: false }).populate({ path: "role", select: "id name" })
    .populate({ path: "user", select: "id name" })
    .sort({ created_at: -1 })
    .exec();
    const content = {
      meta: {
        total: memdata.length,
        pages: Math.ceil(memdata.length / 10),
        page: 1,
      },
      data: memdata.slice(0, 10),
    }
    return ret
  //Not Sure how error handling works here
  }


  

  static async getOwned() {
    const user_id:Number = getContext('userId');
    
    const ownedCommunities = await  Database.instance.collection(collections.community).find(
      { owner: user_id },
      { __v: false }
    );

    const content = {
      meta: {
        total: ownedCommunities.length,
        pages: Math.ceil(ownedCommunities.length / 10),
        page: 1,
      },
      data: ownedCommunities.slice(0, 10),
    }
    return content;

  }

  static async getJoined() {

    const user_id:Number = getContext('userId');

    const joinedCommunities = await Database.instance.collection(collections.member).find({ user: user_id });

    const communities: ICommunity[] = [];
  for (let i = 0; i < joinedCommunities.length; i++) {
    const community = await Database.instance.collection(collections.community).findOne(
      { _id: joinedCommunities[i].community },
      { __v: 0 }
    )
    .populate({ path: "owner", select: "name id" })
    .exec() as ICommunity;

    if (community) {
      communities.push(community);
    }
  }

  const content = {
    meta: {
      total: communities.length,
      pages: Math.ceil(communities.length / 10),
      page: 1,
    },
    data: communities.slice(0, 10),
  }
  
  return content;
    
  }

  
}
export default BookService;