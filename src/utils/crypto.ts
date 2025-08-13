const SECRET_KEY = "voxly-secret-2024";

export class CryptoUtils {
  private static encode(str: string): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return btoa(String.fromCharCode(...data));
  }

  private static decode(str: string): string {
    const binaryString = atob(str);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  }

  static encrypt(text: string): string {
    try {
      const combined = SECRET_KEY + text;
      return this.encode(combined);
    } catch {
      return text;
    }
  }

  static decrypt(encryptedText: string): string {
    try {
      const decoded = this.decode(encryptedText);
      if (decoded.startsWith(SECRET_KEY)) {
        return decoded.substring(SECRET_KEY.length);
      }
      return encryptedText;
    } catch {
      return encryptedText;
    }
  }

  static isValidEncryption(encryptedText: string): boolean {
    try {
      const decoded = this.decode(encryptedText);
      return decoded.startsWith(SECRET_KEY);
    } catch {
      return false;
    }
  }
}
