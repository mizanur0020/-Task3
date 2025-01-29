import crypto from "crypto";
export const generateHMAC = (key, value) => {
  return crypto
    .createHmac("sha256", key)
    .update(value.toString())
    .digest("hex");
};
