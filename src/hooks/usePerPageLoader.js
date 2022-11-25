import {useEffect, useRef, useState} from 'react';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
export const usePerPageLoader = (
    apiCall, startPage, pageSize, entities, setEntities) => {
  const [allLoaded, setAllLoaded] = useState(false);
  const [nextPage, setNextPage] = useState(startPage);

  // prevents useEffect initial several calls
  const _prevent = useRef(true);

  useEffect(() => {
    if (_prevent.current) {
      return;
    }
    _prevent.current = true;
    apiCall(nextPage, pageSize).then(r => {
      const dbEntities = r.data;
      setAllLoaded(dbEntities.length < pageSize);
      setEntities([...entities, ...dbEntities]);
    }).catch(e => console.error(e.message));
  }, [nextPage]);

  function loadNextPage() {
    if (!allLoaded) {
      _prevent.current = false;
      setNextPage(nextPage + 1);
    }
  }

  return [allLoaded, loadNextPage];
};
