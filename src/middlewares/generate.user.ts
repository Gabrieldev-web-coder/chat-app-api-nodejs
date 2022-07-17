import bcrypt from 'bcrypt';

const generateUser = async (user: userData): Promise<userData> => {
    return await new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
        if (err) reject(err.name + " " + err.message);
        bcrypt.hash(user.pwd, salt, (err, hashed) => {
          if (err) reject(err.name + " " + err.message);
          user.pwd = hashed;
          resolve(user);
        });
      });
    });
  };

export {generateUser}