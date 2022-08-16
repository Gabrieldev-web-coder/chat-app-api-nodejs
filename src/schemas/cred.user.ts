interface cred {
  email?: string;
  username?: string;
  pwd: string;
}

interface userData extends cred {
  email: string;
  userid: number;
  picurl: string;
  groups: string[];
  friends: string[];
}

interface registerNewUser {
  email: string;
  username: string;
  pwd: string;
  userid: number;
  picurl: string;
  country: string;
  accountCreatedAt: string;
  description: string;
  profileModifiedAt: string;
  groups: string[];
  friends: string[];
  friendRequest: FriendRequest[];
  pendingRequest: PendingRequest[];
}

interface loginResponse {
  token: string;
  email: string;
  username: string;
  userid: number;
  picurl: string;
  country: string;
  accountCreatedAt: string;
  description: string;
  profileModifiedAt: string;
  groups: string[];
  friends: string[];
  friendRequest: FriendRequest[];
  pendingRequest: PendingRequest[];
}

interface optionalFields {
  "user.email"?: string | undefined;
  "user.username"?: string | undefined;
  "user.pwd"?: string | undefined;
  "user.picurl"?: string | undefined;
  "user.country"?: string | undefined;
  "user.description"?: string | undefined;
  "user.lastMoficationAt"?: string | undefined;
}

interface BasicUserInfo {
  userid: number;
  username: string;
  country: string;
  description: string;
  urlpic: string;
}

interface FriendRequest {
  token: string | null;
  from: number | null;
  to: number | null;
  accepted: boolean | null;
}

interface PendingRequest {
  from: number | null;
  to: number | null;
  accepted: boolean | null;
}

export {
  cred,
  userData,
  registerNewUser,
  loginResponse,
  optionalFields,
  FriendRequest,
  PendingRequest,
  BasicUserInfo,
};
