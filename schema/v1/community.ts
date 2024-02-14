import { listToColumn } from "@universe/v1/libraries/helper";

const CommunityColumnList = ["_id", "name", "slug", "owner", "created_at", "updated_at"] as const;

// require:true,
// unique:true
// default:Date.now()
// How do I do assignment of fields like required, unique and default in the schemas

export const CommunityColumn =
  listToColumn<typeof CommunityColumnList[number]>(BookColumnList);

export default CommunityColumn;
