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
}

interface optionalFields {
  "user.email"?: string | undefined;
  "user.username"?: string | undefined;
  "user.pwd"?: string | undefined;
  "user.picurl"?: string | undefined;
  "user.country"?: string | undefined;
  "user.description"?: string | undefined;
  "user.profileModifiedAt"?: string | undefined;
}

export { cred, userData, registerNewUser, loginResponse, optionalFields };
