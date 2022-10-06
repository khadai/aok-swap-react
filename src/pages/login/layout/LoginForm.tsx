// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonBase, Container, Grid, Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';
import QRCode from 'react-qr-code';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../../api';
import { addSecret } from '../../../redux/reducers/login';
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';

// import * as bitcoinMessage from 'bitcoinjs-message';

interface Props {
    className?: string;
}

const API_URL = 'https://bridge.codepillow.io';
const CALLBACK_URL = 'https://callback.seirenwar.com';
const PREFIX = '\x14AOK Signed Message:\n';

const uuid4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const LoginForm: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const { mutate } = useMutation(login, {
        onSuccess: (data) => {
            history.push('/');
            dispatch(addSecret(data.token));
            localStorage.setItem('auth', data.token);
            enqueueSnackbar('Login success!', { variant: 'success' });
        },
        onError: (e) => {
            alert(e);
        },
    });

    const socket = useRef<Socket>(null);
    const [session] = useState(uuid4());
    const [message, setMessage] = useState('');
    const [QRCodeData, setQRCodeData] = useState<string>();
    const [socketData, setSocketData] = useState<{ address: string; signature: string }>();

    const onSocketCallback = useCallback(({ address, signature }: { address: string; signature: string }) => {
        setSocketData({
            address,
            signature,
        });
    }, []);

    const getNewQRCodeData = () => {
        return `aok://sign?callback=${CALLBACK_URL}/call/${session}&message=${message}`;
    };

    const getServerInfoFromAPI = async () => {
        try {
            const {
                data: {
                    data: { time, prefix },
                },
            }: AxiosResponse<{ data: { time: string; prefix: string } }> = await axios.get(`${API_URL}/auth/time`);
            setMessage(`${prefix}/${time}`);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (message) {
            setQRCodeData(getNewQRCodeData());
        }
    }, [message]);

    useEffect(() => {
        if (socketData) {
            // console.log(bitcoinMessage);
            // if (bitcoinMessage.verify(message!, socketData.address, socketData.signature, PREFIX)) {
            mutate({
                address: socketData.address,
                message: message!,
                signature: socketData.signature,
            });

            socket.current!.off(session, onSocketCallback);
            // }
        }
    }, [socketData]);

    useEffect(() => {
        // @ts-ignore
        socket.current = io(CALLBACK_URL, {
            transports: ['websocket'],
            upgrade: false,
        });
        socket.current.emit('callback', session);
        socket.current.on(session, onSocketCallback);

        getServerInfoFromAPI();

        return () => {
            // @ts-ignore
            socket.current.off(session, onSocketCallback);
        };
    }, []);

    return (
        <Container className={className} maxWidth="xs">
            <Typography variant="h4" pt={6} pl={3} color="primary">
                Sign Up
            </Typography>
            <ol>
                <li>Open AOK Wallet app. (If you dont have the wallet, download it using the link below.)</li>
                <li>Select address what you want to sign in</li>
                <li>Open QR scan</li>
            </ol>
            <div className="qr-code">
                {QRCodeData ? (
                    <ButtonBase href={QRCodeData} target="_blank">
                        <QRCode size={mobile ? 135 : 170} value={QRCodeData} bgColor="white" />
                    </ButtonBase>
                ) : (
                    <Skeleton width={mobile ? 135 : 170} height={mobile ? 135 : 170} variant="rectangular" />
                )}
            </div>
            <Typography color="textSecondary" variant="body2" align="center" pb={2}>
                You need an AOK wallet for the desired use of AOK Swap. Please download your wallet through the link and
                log in:
            </Typography>
            <Grid container flexDirection="row" justifyContent="center" spacing={2} className="btn-grid">
                <Grid item md={6} xs={12}>
                    <Button
                        variant="outlined"
                        className="caution-btn"
                        fullWidth
                        onClick={() =>
                            window.open('https://play.google.com/store/apps/details?id=com.aokey&hl=uk&gl=US', '_blank')
                        }
                    >
                        <Typography variant="body1">Android</Typography>
                    </Button>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Button
                        variant="outlined"
                        className="caution-btn"
                        fullWidth
                        onClick={() => window.open('https://apps.apple.com/us/app/aok-wallet/id1514809987', '_blank')}
                    >
                        <Typography variant="body1">iOS</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default styled(LoginForm)`
    margin: auto;

    .qr-code {
        margin: ${({ theme }) => theme.spacing(5.5, 0)};
        padding: ${({ theme }) => theme.spacing(5.5)};
        border: ${({ theme }) => theme.palette.divider} 1px solid;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
