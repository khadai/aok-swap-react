import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid, Paper, Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';

interface Props {
    className?: string;
}

const UserInfoSkeleton: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    return (
        <Paper className={className} variant="outlined">
            <Grid container alignItems="center" justifyContent="space-between" columnSpacing={2} pb={mobile ? 4 : 8}>
                <Grid item sm="auto" xs={12} justifySelf="center" pb={mobile ? 4 : 0}>
                    <Skeleton height={40} width={120} />
                </Grid>
                <Grid item md="auto" xs={4} flexDirection="row">
                    <Typography>
                        <Skeleton width={100} />
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item alignItems="center" justifyContent="flex-end" columnSpacing={2}>
                <Skeleton variant="rectangular" height={40} width={120} />
            </Grid>
        </Paper>
    );
};

export default styled(UserInfoSkeleton)`
    padding: ${({ theme }) => theme.spacing(4, 3)};
`;
