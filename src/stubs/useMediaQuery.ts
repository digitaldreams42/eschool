'use client';

import { useEffect, useState } from 'react';

// Stub for unstable_createUseMediaQuery (MUI v9 + Next.js 14 compatibility)
export function useMediaQuery(query: string | ((theme: any) => string), options?: any) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(typeof query === 'function' ? query({ breakpoints: { values: {} } }) : query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query, options]);

  return matches;
}

export default useMediaQuery;
