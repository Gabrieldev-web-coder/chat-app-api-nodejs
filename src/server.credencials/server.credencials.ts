import * as fs from 'fs';

const privateKey = fs.readFileSync('./localhost-key.pem','utf-8'),
      cert = fs.readFileSync('./localhost.pem','utf-8')

export const credentials = {key:privateKey,cert:cert}