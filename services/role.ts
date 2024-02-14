import { IRole } from "@interfaces/v1/role";
import Database from "@loaders/v1/database";
import roleColumn from "@schema/v1/book";
import collections from "@schema/v1/meta";
import Validator from 'validatorjs';
const { Snowflake } = require("@theinternetfolks/snowflake");

class RoleService {
  static async create(data: IRole) {

      const roledata = {
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

      let validation = new Validator(roledata, rules, customMessages);

      if (validation.fails()) {
        throw new Error(validation.errors.all());
      } else {
        console.log("Validation passed");
      }

      const generatedId = Snowflake.generate().toString();

      const createdRole = (await Database.instance.collection(collections.role).create({_id:generatedId,name:data.name}));

  //Not Sure how error handling works here
    
    return createdRole;
  }



  static async getAll() {
    return Database.instance.collection(collections.roles).find().toArray();

  //Not Sure how error handling works here
  }
  
}
export default RoleService;