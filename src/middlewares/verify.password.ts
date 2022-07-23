import bcrypt from "bcrypt";

const checkPwd = async (
  plainPwd: string,
  hashedPwd: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPwd, hashedPwd).then((val) => val);
};

export default checkPwd;
