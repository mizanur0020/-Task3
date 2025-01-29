import crypto from "crypto";
export const getSecureRandom = (max) => {
  const randomBytes = crypto.randomBytes(4).readUInt32BE();
  return randomBytes % max;
};
