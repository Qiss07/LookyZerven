import CryptoJS from "crypto-js";

const PREFIX = "ENC:";

export function encryptMessage(message: string, password: string): string {
  const encrypted = CryptoJS.AES.encrypt(message, password).toString();
  return PREFIX + encrypted;
}

export function decryptMessage(message: string, password: string): string {
  if (!message.startsWith(PREFIX)) {
    // Message was not encrypted
    return message;
  }

  const ciphertext = message.slice(PREFIX.length);
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      throw new Error("Wrong password or corrupted data.");
    }
    return decrypted;
  } catch {
    throw new Error("Decryption failed. Check your password.");
  }
}

export function isEncrypted(message: string): boolean {
  return message.startsWith(PREFIX);
}
