import { listToColumn } from "@universe/v1/libraries/helper";

const CommunityColumnList = ["_id", "name", "slug", "owner", "created_at", "updated_at"] as const;

export const CommunityColumn =
  listToColumn<typeof CommunityColumnList[number]>(BookColumnList);

export default CommunityColumn;