import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Button,
    Grid,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import Logo from '../../../assets/logo.svg';
import { BiUpload } from 'react-icons/all';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { BalanceSelectItem, UserInfoSkeleton, Withdraw } from '../components';
import useProfile from '../../../api/useProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { resetSecret } from '../../../redux/reducers/login';
import { useHistory } from 'react-router-dom';

interface Props {
    className?: string;
}

const UserInfo: FC<Props> = ({ className }) => {
    const token = useSelector((state: any) => state.login.token);
    const dispatch = useDispatch();
    const history = useHistory();
    const [refetchInterval, setRefetchInterval] = React.useState(10000);

    const {
        data: profileData,
        isLoading,
        error,
    } = useProfile(
        { auth: token },
        {
            refetchInterval,
            retry: false,
            refetchOnWindowFocus: false,
            onError: () => {
                setRefetchInterval(0);
                dispatch(resetSecret());
                delete localStorage.auth;
                history.push('/login');
            },
        },
    );

    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const [currency, setCurrency] = useState('1');

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value);
    };

    const currencies = [
        { id: '1', name: 'BTC', icon: Logo, balance: 92292929292 },
        { id: '2', name: 'ETH', icon: Logo, balance: 92292929292 },
        { id: '3', name: 'Sugar', icon: Logo, balance: 92292929292 },
        { id: '4', name: 'Tether', icon: Logo, balance: 92292929292 },
    ];

    useEffect(() => {
        if (error) {
            enqueueSnackbar(`UserInfo: ${error?.message}`, { variant: 'error' });
        }
    }, [error]);

    const component = (
        <Paper className={className} variant="outlined">
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                justifyItems="center"
                pb={mobile ? 4 : 8}
            >
                <Grid item md="auto" xs={12} alignSelf="center">
                    <Select
                        value={currency || ''}
                        variant="standard"
                        onChange={handleSelectChange}
                        disableUnderline
                        IconComponent={ExpandMoreRoundedIcon}
                    >
                        {currencies.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                <BalanceSelectItem {...item} />
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item md="auto" xs={12}>
                    <Typography color="textSecondary" noWrap>
                        {profileData ? profileData.address : ''}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item alignItems="center" justifyContent="flex-end" columnSpacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    startIcon={<BiUpload />}
                    onClick={() => setOpenDialog(true)}
                >
                    Withdraw
                </Button>
            </Grid>
            <Withdraw open={openDialog} onClose={() => setOpenDialog(false)} />
        </Paper>
    );

    return isLoading ? <UserInfoSkeleton /> : component;
};

export default styled(UserInfo)`
    padding: ${({ theme }) => theme.spacing(4, 3)};

    .button {
        text-transform: none;
        margin-left: 16px;
    }

    .icon-btn {
        color: ${({ theme }) => theme.palette.grey['700']};
    }
`;
