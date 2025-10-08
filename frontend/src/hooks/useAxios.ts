import { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosError } from 'axios';
import api from '../service/api';

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  refetch: () => void;
}

export const useAxios = <T = any>(
  config: AxiosRequestConfig,
  immediate: boolean = true
): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.request<T>(config);
      setData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};
