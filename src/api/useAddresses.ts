import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Address } from '../types/Address';

type Params = {
    auth: string;
};

async function fetch(params: Params) {
    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/profile/addresses`, {
            headers: { Auth: params.auth },
        });
        return data.addresses;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default function (params: Params, options?: Record<string, any>) {
    return useQuery<Address[], Error>(['addresses', params], () => fetch(params), options);
}
