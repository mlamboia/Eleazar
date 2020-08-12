import useSWR from 'swr';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

function useFetch(url) {
  const { data, error } = useSWR(url, async (url) => {
    const response = await api.get(url);

    return response.data;
  });

  return { data, error };
}

export default useFetch;
