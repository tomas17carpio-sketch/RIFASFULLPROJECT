// useFetch.js - small wrapper - Editor: Tomas Galea
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get(url).then(r => { if (mounted) setData(r.data); })
      .catch(()=>{})
      .finally(()=> { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  // eslint-disable-next-line
  }, deps);
  return { data, loading };
}
