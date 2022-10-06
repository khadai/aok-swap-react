import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import NumberFormat from 'react-number-format';
import { Address } from '../../../types/Address';

interface Props extends Address {
    className?: string;
}

const BalanceSelectItem: FC<Props> = ({ className, name, icon, balance }) => {
    return (
        <div className={className}>
            <img src={icon} width={24} height={24} alt="logo" className="select-icon" />
            <Typography variant="h6">
                {name} <NumberFormat displayType="text" decimalScale={4} thousandSeparator value={balance} />
            </Typography>
        </div>
    );
};

export default styled(BalanceSelectItem)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(0.5)};

    .select-icon {
        padding-right: ${({ theme }) => theme.spacing(1)};
    }
`;
