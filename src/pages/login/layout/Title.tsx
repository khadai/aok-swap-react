import React, { FC } from 'react';
import styled from 'styled-components';
import { Container, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import logo from '../../../assets/logos/logo-white.svg';

interface Props {
    className?: string;
}

const Title: FC<Props> = ({ className }) => {
    return (
        <Container maxWidth="xs" className={className}>
            <img src={logo} alt="logo" height={72} width={72} />
            <Typography variant="h3" color="white" pt={6}>
                AOK Swap
            </Typography>
            <Typography variant="body1" color="white" pt={3}>
                Try a new cryptocurrency. AOK is faster than Bitcoin and thinks about the environment by preventing
                excessive use of resources.
            </Typography>
        </Container>
    );
};

export default styled(Title)`
    margin: auto;
`;
