import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid, Theme, useMediaQuery } from '@mui/material';
import mask from '../../assets/back/mask.png';
import { LoginForm, Title } from './layout';

interface Props {
    className?: string;
}

const Login: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    return (
        <div className={className}>
            <Grid container>
                {mobile ? (
                    ''
                ) : (
                    <Grid item sm={5} xs={12} className="green-part">
                        <Title />
                    </Grid>
                )}
                <Grid item sm={7} xs={12}>
                    <LoginForm />
                </Grid>
            </Grid>
        </div>
    );
};

export default styled(Login)`
    .green-part {
        background: ${({ theme }) => theme.palette.primary.main} url(${mask}) repeat-y left;
        height: 100vh;
    }
`;
