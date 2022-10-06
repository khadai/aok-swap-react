import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '../types/Profile';

type Params = {
    auth: string;
};

async function fetch(params: Params) {
    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/profile`, {
            headers: { Auth: params.auth },
        });
        return data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default function (params: Params, options?: Record<string, any>) {
    return useQuery<Profile, Error>(['profile', params], () => fetch(params), options);
}
