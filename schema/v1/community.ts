import { listToColumn } from "@universe/v1/libraries/helper";

const CommunityColumnList = ["_id", "name", "slug", "owner", "created_at", "updated_at"] as const;

export const BookColumn =
  listToColumn<typeof BookColumnList[number]>(BookColumnList);

export default BookColumn;