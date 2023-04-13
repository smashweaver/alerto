import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_PREFIX = 'myAlertoData';

export default class UserStorage {
  constructor(id) {
    this.storageKey = `${STORAGE_KEY_PREFIX}:${id}`;
  }

  async saveId(uid) {
    await AsyncStorage.setItem('uid', uid);
  }

  async getId() {
    const uid = await AsyncStorage.getItem('uid');
    return uid;
  }

  async saveData(data) {
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.log(`Error saving data for user ${this.storageKey}:`, error);
    }
  }

  async loadData() {
    // await this.clearData();
    try {
      const data = await AsyncStorage.getItem(this.storageKey);
      const payload = data ? JSON.parse(data) : {
        profile: {
          schedule: false,
          survey: false,
          events: [],
        }
      };
      if (!payload.profile.dated) {
        payload.profile.dated = {};
      }
      return payload;
    } catch (error) {
      console.log(`Error loading data for user ${this.storageKey}:`, error);
      return null;
    }
  }

  async clearData() {
    try {
      await AsyncStorage.removeItem(this.storageKey);
    } catch (error) {
      console.log(`Error clearing data for user ${this.storageKey}:`, error);
    }
  }

  async setProfile(profile) {
    const data = await this.loadData() || {};
    data.profile = profile;
    await this.saveData(data);
  }

  async getProfile() {
    const data = await this.loadData() || {};
    return data.profile || {};
  }
}
