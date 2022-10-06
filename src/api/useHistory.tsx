import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Balance } from '../types/Balance';

type Params = {
    auth: string;
    type?: 'deposit' | 'withdrawal';
};

async function fetch(params: Params) {
    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/profile/history`, {
            headers: { Auth: params.auth },
            params: { type: params.type },
        });
        return data.transactions;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default function (params: Params, options?: Record<string, any>) {
    return useQuery<History[], Error>(['history', params], () => fetch(params), options);
}
