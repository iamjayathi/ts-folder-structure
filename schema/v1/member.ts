import { listToColumn } from "@universe/v1/libraries/helper";

const MemberColumnList = ["_id", "community", "user", "role", "created_at"] as const;

export const MemberColumn =
  listToColumn<typeof MemberColumnList[number]>(BookColumnList);

export default MemberColumn;
