import React from 'react';
import styled from 'styled-components';
import { Box, Paper, Typography } from '@mui/material';
import noHistory from '../../../assets/no-history.svg';

interface NoHistoryProps {
    className?: string;
}

const NoHistory = ({ className }: NoHistoryProps) => {
    return (
        <Paper className={className} variant="outlined">
            <img src={noHistory} alt="aok" className="no-history-img" />
            <Typography variant="h5">Empty Transaction History</Typography>
            <Typography color="primary">{'It\x27s time to start the story!'}</Typography>
        </Paper>
    );
};

export default styled(NoHistory)`
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .no-history-img {
        opacity: 35%;
        height: 84px;
        margin: ${({ theme }) => theme.spacing(4)} auto ${({ theme }) => theme.spacing(2)} auto;
    }
`;
