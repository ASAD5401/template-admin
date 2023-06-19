export const storeData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("StorageErr==>", error);
  }
};

export const retrieveData = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log("StorageErr==>", error);
  }
};

export const removeData = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log("storageErr==>", error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.log("storageErr==>", error);
  }
};
