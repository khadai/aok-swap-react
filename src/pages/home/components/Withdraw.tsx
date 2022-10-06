import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Button,
    Dialog,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { useSnackbar } from 'notistack';
import { CurrencySelectItem } from './index';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import CloseIcon from '@mui/icons-material/Close';
import { IoWalletOutline } from 'react-icons/io5';
import { Withdraw as WithdrawType } from '../../../types/Withdraw';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useAddresses, withdraw } from '../../../api';
import { Address } from '../../../types/Address';

interface Props {
    className?: string;
    open: boolean;
    onClose: any;
}

const Withdraw: FC<Props> = ({ className, open, onClose }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const token = useSelector((state: any) => state.login.token);
    const { data: addresses, isLoading: isAddressesLoading, error } = useAddresses({ auth: token });

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors: fieldsErrors },
    } = useForm<WithdrawType>();

    const [currency, setCurrency] = useState<Address>();

    const { enqueueSnackbar } = useSnackbar();
    const watchAmount = watch('amount');

    const { mutate, isLoading } = useMutation(withdraw, {
        onSuccess: (data) => {
            console.log(data);
            reset();
            enqueueSnackbar('Withdraw success!', { variant: 'success' });
        },
        onError: (e) => {
            // @ts-ignore
            enqueueSnackbar(e, { variant: 'error' });
        },
    });

    const onSubmit = (data: WithdrawType) => {
        const formData = { amount: data.amount.replace(/,/g, ''), address: data.address, network: data.network };
        mutate({ formData, token });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCurrency(addresses?.find((x) => x.ticker === event.target.value));
    };

    useEffect(() => {
        if (!isAddressesLoading) {
            setCurrency(addresses && addresses[0]);
        }
    }, [isAddressesLoading]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(`Withdraw: ${error?.message}`, { variant: 'error' });
        }
    }, [error]);

    return (
        <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="sm" className={className}>
            <DialogTitle variant="h5" padding={3.5}>
                Withdraw
            </DialogTitle>
            <IconButton className="close-btn" onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <form className="withdraw-box" onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>
                    <Controller
                        name="network"
                        render={({ field }) => (
                            <Select
                                {...field}
                                {...register('network')}
                                className="form-field"
                                value={currency?.ticker}
                                onChange={handleSelectChange}
                                defaultValue="1"
                                fullWidth
                                IconComponent={ExpandMoreRoundedIcon}
                            >
                                {!isAddressesLoading &&
                                    addresses &&
                                    addresses.map((item) => (
                                        <MenuItem value={item.ticker} key={item.id}>
                                            <CurrencySelectItem {...item} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        )}
                        control={control}
                        rules={{
                            required: 'Currency required',
                        }}
                    />
                    <Controller
                        name="address"
                        render={({ field: { value, ...rest } }) => (
                            <TextField
                                {...rest}
                                value={value ?? ''}
                                id="address"
                                className="form-field"
                                variant="outlined"
                                color="primary"
                                label="Withdraw Address"
                                placeholder="KXStk8wJupWJ4vsDu1ZxkmcM5U6L2yrWoD"
                                helperText={fieldsErrors.address ? fieldsErrors.address.message : undefined}
                                error={Boolean(fieldsErrors.address)}
                                InputLabelProps={{ shrink: true }}
                                {...register('address')}
                            />
                        )}
                        control={control}
                        rules={{
                            required: 'Address required',
                            // validate: isAddress,
                        }}
                    />
                    <Controller
                        name="amount"
                        render={({ field: { value, ...rest } }) => (
                            <NumberFormat
                                {...rest}
                                value={value ?? ''}
                                customInput={TextField}
                                thousandSeparator
                                allowNegative={false}
                                className="form-field"
                                label="Amount"
                                placeholder="Enter the amount"
                                // isNumericString
                                helperText={fieldsErrors.amount ? fieldsErrors.amount.message : undefined}
                                error={Boolean(fieldsErrors.amount)}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: (
                                        <>
                                            <InputAdornment position="end">{currency?.ticker}</InputAdornment>
                                            <InputAdornment position="end">
                                                <Button sx={{ minWidth: 0 }} size="small" disabled>
                                                    Max
                                                </Button>
                                            </InputAdornment>
                                        </>
                                    ),
                                }}
                            />
                        )}
                        control={control}
                        rules={{
                            required: 'Amount required',
                            min: {
                                value: 0,
                                message: 'Amount must be a positive number',
                            },
                        }}
                    />
                </FormControl>
                <Divider className="divider" />
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} md={8} sm={8}>
                        <Typography variant="body2">Total send:</Typography>
                        <div className="total-box">
                            <Typography variant="h5" color="primary" textOverflow="ellipsis" overflow="hidden" noWrap>
                                <NumberFormat
                                    displayType="text"
                                    value={watchAmount || 0}
                                    isNumericString
                                    decimalScale={4}
                                    thousandSeparator
                                    fixedDecimalScale
                                />
                            </Typography>
                            <Typography variant="h6" color="primary" className="total-send-currency" fontWeight="bold">
                                {currency?.ticker}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs="auto" md="auto" sm="auto" justifyContent="flex-end">
                        <LoadingButton
                            loading={isLoading}
                            loadingPosition="start"
                            color="primary"
                            variant="contained"
                            type="submit"
                            startIcon={<IoWalletOutline />}
                            size="large"
                        >
                            <Typography color="white" variant="button">
                                Send
                            </Typography>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default styled(Withdraw)`
    .withdraw-box {
        padding: ${({ theme }) => theme.spacing(3.5)};
    }

    .close-btn {
        position: absolute;
        right: 16px;
        top: 16px;
    }

    .form-field {
        margin-top: ${({ theme }) => theme.spacing(2)};
    }

    .icon-enabled {
        color: ${({ theme }) => theme.palette.grey[900]};
    }

    .form,
    .divider {
        margin-bottom: ${({ theme }) => theme.spacing(3)};
    }

    .total-box {
        display: flex;
        align-items: flex-end;

        .total-send-currency {
            line-height: 1.8;
            padding-bottom: 1px;
            padding-left: ${({ theme }) => theme.spacing(0.5)};
            font-weight: bold;
        }

        .coin-logo {
            padding-bottom: 3px;
        }
    }
`;
