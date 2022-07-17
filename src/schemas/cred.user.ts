import bcrypt from "bcrypt";

interface cred {
  username: string;
  pwd: string;
}

interface userData extends cred {
  email: string;
  userid: number;
  picurl: string;
  groups: string[];
  friends: string[];
}

export { cred, userData };
