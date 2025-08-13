type StorageKey = "auth-email" | "auth-token";

interface StorageData {
  "auth-email": string;
  "auth-token": string;
}

export class StorageManager {
  private static isClient(): boolean {
    return typeof window !== "undefined";
  }

  static get<K extends StorageKey>(key: K): StorageData[K] | null {
    if (!this.isClient()) return null;

    try {
      const value = localStorage.getItem(key);
      return value || null;
    } catch {
      return null;
    }
  }

  static set<K extends StorageKey>(key: K, value: StorageData[K]): void {
    if (!this.isClient()) return;

    localStorage.setItem(key, value);
  }

  static remove(key: StorageKey): void {
    if (!this.isClient()) return;

    localStorage.removeItem(key);
  }

  static clear(): void {
    if (!this.isClient()) return;

    const keys: Array<StorageKey> = ["auth-email", "auth-token"];
    keys.forEach((key) => this.remove(key));
  }

  static hasAuth(): boolean {
    return !!(this.get("auth-email") && this.get("auth-token"));
  }
}
