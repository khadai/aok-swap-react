import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './redux/store';

axios.defaults.baseURL = 'https://bridge.codepillow.io';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
