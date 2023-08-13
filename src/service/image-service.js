import axios from 'axios';

const API_KEY = 'jhbRkdqzOPmcjtZBGhZUqrtjtFxTLfb3zOanDjdrZ5sMQAPxwPLs1OSN';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  try {
    const { data } = await axios.get(`search/?query=${query}&page=${page}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
