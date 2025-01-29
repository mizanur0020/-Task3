import crypto from "crypto";

// Function to generate a secure random number
export const getSecureRandom = (max) => {
  return crypto.randomInt(max);
};

// Function to generate an HMAC
export const generateHMAC = (key, value) => {
  return crypto
    .createHmac("sha256", key)
    .update(value.toString())
    .digest("hex");
};
