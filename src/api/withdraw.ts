import axios from 'axios';
import { Withdraw } from '../types/Withdraw';

interface Params {
    formData: Withdraw;
    token: string;
}

const withdraw = async (params: Params) => {
    try {
        const { data: response } = await axios.post(`${axios.defaults.baseURL}/withdrawal`, params.formData, {
            headers: { Auth: params.token },
        });
        return response;
    } catch (e) {
        console.error(e);
        // @ts-ignore
        throw e.response.data.error.message;
    }
};

export default withdraw;
