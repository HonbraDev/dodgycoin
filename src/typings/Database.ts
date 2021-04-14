import { User as DogeHouseUser } from "@dogehouse/kebab";

export type User = {
  monies: number;
  github?: string;
  cache?: {
    avatarUrl: DogeHouseUser["avatarUrl"];
    bio: DogeHouseUser["bio"];
    displayName: DogeHouseUser["displayName"];
    id: DogeHouseUser["id"];
    username: DogeHouseUser["username"];
  };
};
