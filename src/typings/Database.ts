import { User as DogeHouseUser, UUID } from "@dogehouse/kebab";

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

export type SupaUser = {
  id: UUID;
  money: number;
  githubId?: string;
  fake?: boolean;
  isAdmin: boolean;
};
