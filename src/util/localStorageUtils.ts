const localStorageUtils = () => {
  const getItemFromLocalStorage = <T>(itemKey: string) => {
    const strItem = localStorage.getItem(itemKey);
    if (strItem) {
      const item = JSON.parse(strItem);
      return item as T;
    }
    return;
  };
  const setItemToLocalStorage = <T>(itemKey: string, item: T) => {
    const strItem = JSON.stringify(item);
    localStorage.setItem(itemKey, strItem);
  };

  return { getItemFromLocalStorage, setItemToLocalStorage };
};

export default localStorageUtils;
