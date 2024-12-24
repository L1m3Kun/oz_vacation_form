import { LocalStorageKeyType } from "./localStorageKey";

const localStorageUtils = () => {
  const getItemFromLocalStorage = <T>(itemKey: LocalStorageKeyType) => {
    const strItem = localStorage.getItem(itemKey);
    if (strItem) {
      const item = JSON.parse(strItem);
      return item as T;
    }
    return;
  };
  const setItemToLocalStorage = <T>(itemKey: LocalStorageKeyType, item: T) => {
    const strItem = JSON.stringify(item);
    localStorage.setItem(itemKey, strItem);
  };

  const removeFromLocalStorage = (itemKey: LocalStorageKeyType) => {
    localStorage.removeItem(itemKey);
  };
  return {
    getItemFromLocalStorage,
    setItemToLocalStorage,
    removeFromLocalStorage,
  };
};

export default localStorageUtils;
