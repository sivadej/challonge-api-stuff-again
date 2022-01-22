import { useState } from 'react';
import { ChallongerLocalStorage } from '../interfaces';

const initSettings: ChallongerLocalStorage = {
  config: { challongeKey: 'MjMH0cfTX5IkpiyzB3PuhXrFzmfn6y0ihJ8PwZPs' },
  tourney: { domain: 'akg', tourneyName: 'test1030' },
};

export default function useSettingsLocalStorage() {
  const [storedValue, setStoredValue] = useState<ChallongerLocalStorage>(() => {
    try {
      const saved = window.localStorage.getItem('challongerSettings');
      if (!saved) {
        window.localStorage.setItem(
          'challongerSettings',
          JSON.stringify(initSettings)
        );
      }
      return saved ? JSON.parse(saved) : initSettings;
    } catch (error) {
      console.log(error);
      return initSettings;
    }
  });
  const setValue = (
    value:
      | ChallongerLocalStorage
      | ((val: ChallongerLocalStorage) => ChallongerLocalStorage)
  ) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        'challongerSettings',
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as [
    value: ChallongerLocalStorage,
    setVal: (newVal: ChallongerLocalStorage) => void
  ];
}
