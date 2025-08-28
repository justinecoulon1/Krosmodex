import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorageItem } from '../../local-storage/local-storage.utils';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://api.metamob.fr',
};

export const metamobAxios = axios.create(axiosConfig);

metamobAxios.interceptors.request.use((config) => {
  config.headers['HTTP-X-APIKEY'] = getLocalStorageItem('metamobApiKey');
  config.headers['HTTP-X-USERKEY'] = getLocalStorageItem('metamobUniqueId');
  return config;
});
