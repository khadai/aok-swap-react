import { configureStore } from '@reduxjs/toolkit';
import { login } from './reducers';

export default configureStore({
    reducer: {
        login,
    },
});
