import {useEffect, useRef, useState} from 'react';

/**
 * @author Anton Belousov
 * @since SNAPSHOT-0.0.1
 */
export const usePerPageLoader = (apiCall, startPage, pageSize, setEntities) => {
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
      setEntities(entities => [...entities, ...dbEntities]);
    }).catch(e => {
      throw new Error(e.message);
    });
  }, [apiCall, nextPage, pageSize, setEntities]);

  function loadNextPage() {
    if (!allLoaded) {
      _prevent.current = false;
      setNextPage(nextPage => nextPage + 1);
    }
  }

  function resetState(newNextPage, newEntities) {
    _prevent.current = false;
    setAllLoaded(false);
    setEntities(newEntities);
    setNextPage(newNextPage);
  }

  return [allLoaded, loadNextPage, resetState];
};
