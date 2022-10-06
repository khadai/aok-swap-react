import React, { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Typography } from '@mui/material';
import { Address } from '../../../types/Address';

interface Props extends Address {
    className?: string;
}

const CurrencySelectItem: FC<Props> = ({ className, name, ticker, icon }) => {
    return (
        <div className={className}>
            <Avatar>
                <img src={icon && icon} width={24} height={24} alt="logo" />
            </Avatar>
            <Typography variant="subtitle1" ml={1}>
                {ticker && ticker}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" ml={1}>
                {name && name}
            </Typography>
        </div>
    );
};

export default styled(CurrencySelectItem)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
