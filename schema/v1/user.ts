import { listToColumn } from "@universe/v1/libraries/helper";

const UserColumnList = ["_id", "name", "email", "password", "created_at"] as const;

export const UserColumn =
  listToColumn<typeof UserColumnList[number]>(BookColumnList);

export default UserColumn;
