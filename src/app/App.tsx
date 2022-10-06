import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Home, Login } from '../pages';
import { GlobalStyle, theme } from './index';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { addSecret } from '../redux/reducers/login';
import { useDispatch, useSelector } from 'react-redux';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10000,
        },
    },
});

const App = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.login.token);

    useEffect(() => {
        if (localStorage.auth) {
            dispatch(addSecret(localStorage.auth));
        }
    }, []);

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <MuiThemeProvider theme={theme}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <GlobalStyle />
                        {/*<Navigation />*/}
                        <Switch>
                            {token ? (
                                <>
                                    <Route path="/" exact component={Home} />
                                    <Redirect to="/" />
                                </>
                            ) : (
                                <>
                                    <Route path="/login" exact component={Login} />
                                    <Redirect to="/login" />
                                </>
                            )}
                        </Switch>
                    </ThemeProvider>
                </MuiThemeProvider>
            </QueryClientProvider>
        </Router>
    );
};

export default App;
