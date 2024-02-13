import { listToColumn } from "@universe/v1/libraries/helper";

const CollectionsList = ["community", "member","role","user"] as const;

export const collections =
  listToColumn<typeof CollectionsList[number]>(CollectionsList);

export default collections;