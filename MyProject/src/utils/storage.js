function getAsyncStorage() {
  try {
    const mod = require('@react-native-async-storage/async-storage');
    return mod && (mod.default || mod);
  } catch (e) {
    return null;
  }
}

function getLocalStorage() {
  try {
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      return globalThis.localStorage;
    }
  } catch (_) {}
  return null;
}

export const storage = {
  async getItem(key) {
    const AS = getAsyncStorage();
    if (AS && AS.getItem) {
      try {
        return await AS.getItem(key);
      } catch (_) {}
    }
    const LS = getLocalStorage();
    if (LS) {
      try {
        return LS.getItem(key);
      } catch (_) {}
    }
    return null;
  },
  async setItem(key, value) {
    const AS = getAsyncStorage();
    if (AS && AS.setItem) {
      try {
        await AS.setItem(key, value);
        return;
      } catch (_) {}
    }
    const LS = getLocalStorage();
    if (LS) {
      try {
        LS.setItem(key, value);
      } catch (_) {}
    }
  },
};
