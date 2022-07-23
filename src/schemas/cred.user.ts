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

export { cred, userData, registerNewUser, loginResponse };
