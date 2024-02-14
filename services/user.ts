import { IUser } from "@interfaces/v1/user";
import Database from "@loaders/v1/database";
import UserColumn from "@schema/v1/user";
import collections from "@schema/v1/meta";
import Validator from 'validatorjs';
const { Snowflake } = require("@theinternetfolks/snowflake");
import addError from "@middleware/v1/addError.ts";
import Env from "@loaders/v1/env";


class RoleService {
    static async signup(data: IRole) {
  
        const { name, email, password } = data;

        const roledata = {
            name:name,
            email:email,
            password:password
          };


        let errors:ValidationError = [];
  
        const rules = {
          name:'required|min:2',
          email:'required|email',
          password:'min:6',
        };
  
        const customMessages = {
           "required.name":{
            string:'The :attribute be atleast 2 characters.'
        },
        "min.name":{
            string:'The :attribute be atleast :min characters.'
        },
        "required.password":{
            string:'The :attribute be atleast 6 characters.'
        },
        "min.password":{
            string:'The :attribute be atleast :min characters.'
        },
        email:'Please provide a valid email address.'
          };
  
        let validation = new Validator(roledata, rules, customMessages);
  
        if (validation.fails()) {
          throw new Error(validation.errors.all());
        } else {
          console.log("Validation passed");
        }

        const userExists = await Database.instance.collection(collections.user).find({ email: email });
        
          if (userExists.length !== 0) {
            // Handle/Return Errors
          }
        const generatedId =await Snowflake.generate().toString();

        const encryptedPass = await bcrypt.hash(password, 10);

        const user = await Database.instance.collection(collections.user).create({
            _id: generatedId,
            name,
            email,
            password: encryptedPass,
          });

          const payload = {
            data:{
                id: generatedId,
                name: name,
                email: email,
                created_at: user.created_at
            }
        };

        const access_token = await jwt.sign(payload, Env.variable.JWT_SECRET, {
            expiresIn: "5h",
          });

          ret = 
          {
            cookie: access_token,
            content: payload,
          }

          return ret;
    }

    static async signin(data: IRole) {
        const { email, password } = data;

        let errors:ValidationError = [];

        const roledata = {
            email:email,
            password:password
          };

        const rules = {
        email:'required|email',
        password:'required|min:6'
        }

        const customMessages = {
            "required.password":{
                string:'The :attribute be atleast 6 characters.'
            },
            "min.password":{
                string:'The :attribute be atleast :min characters.'
            },
            email:'Please provide a valid email address.'
           };

           let validation = new Validator(roledata, rules, customMessages);
  
           if (validation.fails()) {
             throw new Error(validation.errors.all());
           } else {
             console.log("Validation passed");
           }

           const user = await Database.instance.collection(collections.user).findOne({email:email});
           const doMatch  = await bcrypt.compare(password,user.password);
           if (!doMatch) {
            // Error logic
           }

           // Unsure of how to do error handling

           const payload = {
            data:{
                id: generatedId,
                name: name,
                email: email,
                created_at: user.created_at
            }
        };

            
        const access_token = await jwt.sign(payload, Env.variable.JWT_SECRET, {
            expiresIn: "5h",
          });

          ret = 
          {
            cookie: access_token,
            content: payload,
          }

          return ret;

    }

    static async signin(data: IRole) {

        const {access_token} = data.cookies //how to pass headers??---Context?
        
        if(!access_token)
        {
            // Error
        }

        const payload = await jwt.verify(access_token,Env.variable.JWT_SECRET);
    
    }
        
}
  
  export default RoleService;