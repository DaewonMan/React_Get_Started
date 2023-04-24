import axios from 'axios';

const apiUrl = 'https://example.com/api/';
const API_BASE_URL = '';

const getData = async (url) => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const get = async (url, params) => {
  // const response = await axios.get(`${API_BASE_URL}/${url}`, { params });
  debugger
  try {
    const response = await axios.get(`${url}`, { params });
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
  finally {
    debugger
  }
};
  
const post = async (url, data) => {
    const response = await axios.post(`${url}`, data);
    // const response = await axios.post(`${API_BASE_URL}/${url}`, data);
    return response.data;
};

export { 
    getData, 
    get, 
    post 
};