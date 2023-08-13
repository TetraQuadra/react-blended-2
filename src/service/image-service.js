import axios from 'axios';

const API_KEY = 'b9JAtRflzHgNEep3T6kiVzCcInipcxJdv7Bf3cuz6Af71DthtYLqIwOi';
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
    console.error(error.message);
  }
};
