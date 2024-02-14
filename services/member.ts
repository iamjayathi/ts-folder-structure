import { IMember } from "@interfaces/v1/member";
import { ICommunity } from "@interfaces/v1/community";
import Database from "@loaders/v1/database";
import MemberColumn from "@schema/v1/book";
import collections from "@schema/v1/meta";
import Validator from 'validatorjs';
const { Snowflake } = require("@theinternetfolks/snowflake");

class MemberService {
    static async add(data: IMember) {
        const user_id:Number = getContext('userId');

        // Unsure of error handling structure-Community/Role/User Exists, Already Member, Is Admin, Is Present
        
        const generatedId = Snowflake.generate().toString();

        const addedMember  = await Database.instance.collection(collections.member).create({_id:generatedId,user:data.user,role:data.role,community:data.community});

        return addedMember;

        //Error Adding Member unsure
    }


    static async remove(id: Number ) {
        

        const adminRole = await Database.instance.collection(collections.role).findOne({name:"Community Admin"});

        const modRole = await Database.instance.collection(collections.role).findOne({name:"Community Moderator"});
        
        const ownedCommunities:ICommunity=[];
        if(adminRole){
            ownedCommunities.push(await Database.instance.collection(collections.member).find({user:id,role:adminRole._id}));
            if(ownedCommunities.length>0){
                await Database.instance.collection(collections.member).findByIdAndDelete({_id:removeId.toString(),community:ownedCommunities[0].community});
            }
        } 
        if(modRole){
            ownedCommunities.push(await Database.instance.collection(collections.member).find({user:id,role:modRole._id}));
            await Database.instance.collection(collections.member).findByIdAndDelete({_id:removeId.toString(),community:ownedCommunities[0].community});
        }


        // Unsure of error handling structure-Community/Role/User Exists, Already Member, Is Admin, Is Present

        //Error Adding Member   
    }

}

export default MemberService;