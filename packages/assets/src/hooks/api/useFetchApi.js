import {useEffect, useState} from 'react';
import {api} from '../../helpers';
import {store} from '../../index';
import {setToast} from '../../actions/layout/setToastAction';

/**
 * useFetchApi hook for fetch data from api with url
 *
 * @param url
 * @param defaultData
 * @param presentDataFunc
 * @param initLoad
 * @param method
 * @param postData
 * @returns {{pagination: {}, data: *[], setData: (value: (((prevState: *[]) => *[]) | *[])) => void, setLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void, refetch: (function(*=): Promise<void>), loading: boolean, setErrors: (value: (((prevState: *[]) => *[]) | *[])) => void, errors: *[], fetched: boolean}}
 */
export default function useFetchApi(
  url,
  defaultData = [],
  presentDataFunc = null,
  initLoad = true,
  method = 'GET',
  postData = {}
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [errors, setErrors] = useState([]);
  const [fetched, setFetched] = useState(false);

  const handleChangeData = (key, value) => {
    setData(prev => ({...prev, [key]: value}));
  };

  async function fetchApi() {
    if (url === '') {
      return;
    }
    setLoading(true);
    try {
      const resp =
        method === 'GET' ? await api(url) : await api(url, postData, method);
      if (resp.data) {
        const newData = presentDataFunc
          ? presentDataFunc(resp.data)
          : resp.data;
        setData(newData);
      }
    } catch (e) {
      console.log(e);
      setErrors([...errors, e.message]);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  async function updateData(newData) {
    try {
      setLoading(true);
      await api(url, 'PUT', newData);
      setData(newData);
      store.dispatch(
        setToast({
          content: 'Save successfully'
        })
      );
    } catch (e) {
      store.dispatch(
        setToast({
          content: 'Failed to save',
          error: true
        })
      );
      console.error(e);
      setErrors([...errors, e.message]);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  async function refetch(url) {
    if (url === '') {
      return;
    }
    try {
      setLoading(true);
      const resp = await api(url);
      if (resp.data) {
        const newData = presentDataFunc
          ? presentDataFunc(resp.data)
          : resp.data;
        setData(newData);
        if (resp.pagination) setPagination(resp.pagination);

        return newData;
      }

      setErrors([...errors, resp.errors]);
    } catch (e) {
      console.log(e.message);
      setErrors([...errors, e.message]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initLoad) {
      fetchApi().then(() => {});
    }
  }, []);

  return {
    loading,
    data,
    setData,
    pagination,
    refetch,
    errors,
    setLoading,
    fetched,
    setErrors,
    handleChangeData,
    updateData
  };
}
