import React, { FC } from 'react';
import { Deposit, History, UserInfo } from './layout';
import styled from 'styled-components';
import { Container, Grid, Theme, useMediaQuery } from '@mui/material';
import { Navigation } from '../../app';

interface Props {
    className?: string;
}

const Home: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    return (
        <div className={className}>
            <Navigation />
            <Container>
                <UserInfo />
                <Grid container columnSpacing={6} rowSpacing={6} mt={mobile ? 0 : 8}>
                    <Grid item md={5} xs={12}>
                        <Deposit />
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <History />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default styled(Home)`
    padding-bottom: ${({ theme }) => theme.spacing(6)};
    margin-top: ${({ theme }) => theme.spacing(5)};
`;
