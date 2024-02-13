import { listToColumn } from "@universe/v1/libraries/helper";

const RoleColumnList = ["_id", "name", "created_at", "updated_at"] as const;

export const RoleColumn =
  listToColumn<typeof RoleColumnList[number]>(BookColumnList);

export default RoleColumn;