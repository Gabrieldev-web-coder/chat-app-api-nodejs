
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

interface registerNewUser {
  email: string;
  username: string;
  pwd: string;
  userid: number;
  picurl: string;
  country: string;
  groups: string[];
  friends: string[];
}

export { cred, userData, registerNewUser };
