import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton, MenuItem, Select, SelectChangeEvent, Theme, Typography, useMediaQuery } from '@mui/material';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ContentCopyOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { CurrencySelectItem, DepositSkeleton } from '../components';
import { useSelector } from 'react-redux';
import { useAddresses } from '../../../api';
import { Address } from '../../../types/Address';

interface Props {
    className?: string;
}

const Deposit: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const token = useSelector((state: any) => state.login.token);
    const { data: addresses, isLoading, error } = useAddresses({ auth: token });

    const [currency, setCurrency] = useState<Address>();
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event: SelectChangeEvent) => {
        setCurrency(addresses?.find((x) => x.id === event.target.value));
    };

    const onCopy = () => {
        enqueueSnackbar('Address has been successfully copied to clipboard.', { variant: 'success' });
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(`Deposit: ${error?.message}`, { variant: 'error' });
        }
    }, [error]);

    useEffect(() => {
        if (!isLoading) {
            setCurrency(addresses && addresses[0]);
        }
    }, [isLoading]);

    const component = (
        <div className={className}>
            <Typography variant="h4" mb={4}>
                Deposit
            </Typography>
            <div className="deposit-box">
                <Select
                    value={currency?.id || ''}
                    defaultValue="1"
                    onChange={handleChange}
                    fullWidth
                    IconComponent={ExpandMoreRoundedIcon}
                >
                    {!isLoading &&
                        addresses &&
                        addresses.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                <CurrencySelectItem {...item} />
                            </MenuItem>
                        ))}
                </Select>
                <div className="qr-code">
                    <QRCode value={currency?.address ? currency.address : ''} size={mobile ? 135 : 200} />
                </div>
                <Typography color="textSecondary" className="copy-txt" noWrap>
                    {currency?.address}
                    <CopyToClipboard onCopy={onCopy} text={currency?.address!}>
                        <IconButton size="small">
                            <ContentCopyOutlined className="icon-btn" />
                        </IconButton>
                    </CopyToClipboard>
                </Typography>
                <div className="deposit-warning">
                    <InfoOutlinedIcon color="warning" />
                    <Typography variant="caption" display="block" ml={1}>
                        The balance will be updated automatically when we receive coins on deposit address
                    </Typography>
                </div>
            </div>
        </div>
    );

    return isLoading ? <DepositSkeleton /> : component;
};

export default styled(Deposit)`
    .deposit-warning {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .deposit-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .qr-code {
        margin: ${({ theme }) => theme.spacing(6.5, 0, 3)};
    }

    .copy-txt {
        margin: ${({ theme }) => theme.spacing(2)};
        padding: ${({ theme }) => theme.spacing(2, 7)};
        border: ${({ theme }) => theme.palette.divider} 1px solid;
        border-radius: 4px;
    }
`;
