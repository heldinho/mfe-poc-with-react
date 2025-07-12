// hooks/useRemoteStoreValue.js
import React from 'react';

/**
 * @param importer - função que retorna um import (ex: () => import('ZustandApp/store'))
 * @param selector - função que seleciona parte do state (ex: state => state.count)
 */
export function useRemoteStoreValue(importer, selector) {
  const [store, setStore] = React.useState(null);
  const [value, setValue] = React.useState(undefined);

  React.useEffect(() => {
    let unsubscribe;

    importer().then(mod => {
      const zustandStore = mod.default;
      setStore(() => zustandStore);
      const selectedValue = selector(zustandStore.getState());
      setValue(selectedValue);

      unsubscribe = zustandStore.subscribe(state => setValue(selector(state)));
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [importer, selector]);

  return value;
}
