import axios from 'axios';

type Params = {
    signature?: string;
    message?: string;
    address?: string;
};

const login = async (params: Params) => {
    const { data: response } = await axios.post(`${axios.defaults.baseURL}/auth/authenticate`, params);
    // const { data: response } = await axios.post('https://api.seirenwar.com/v1/auth', params);
    return response;
};

export default login;
