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
  email?: string | undefined;
  username?: string | undefined;
  pwd?: string | undefined;
  picurl?: string | undefined;
  country?: string | undefined;
  description?: string | undefined;
  token?: string;
}

export { cred, userData, registerNewUser, loginResponse, optionalFields };
