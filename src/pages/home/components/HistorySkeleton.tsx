import React, { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Grid, List, ListItemAvatar, ListItem, ListItemText, Paper, Skeleton, Typography } from '@mui/material';

interface Props {
    className?: string;
    rows?: number;
}

const HistorySkeleton: FC<Props> = ({ className, rows }) => {
    const historyItem = (key: number) => (
        <Paper className="history-item" variant="outlined" key={key}>
            <ListItem>
                <ListItemAvatar>
                    <Skeleton variant="circular">
                        <Avatar />
                    </Skeleton>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="subtitle1" noWrap>
                            <Skeleton width={200} />
                        </Typography>
                    }
                    secondary={
                        <Typography variant="subtitle2">
                            <Skeleton width={100} />
                        </Typography>
                    }
                />
                <Typography align="right" ml={1} variant="h6">
                    <Skeleton width={150} />
                </Typography>
            </ListItem>
        </Paper>
    );

    return (
        <div className={className}>
            <Grid item container alignItems="center" md={12} mb={3}>
                <Grid item md xs>
                    <Typography variant="h4">
                        <Skeleton width={100} />
                    </Typography>
                </Grid>
                <Grid item md="auto" xs="auto">
                    <Skeleton height={40} width={120} />
                </Grid>
            </Grid>
            <List>
                {Array(rows)
                    .fill(null)
                    .map((i, idx) => historyItem(idx))}
            </List>
        </div>
    );
};

export default styled(HistorySkeleton)`
    .history-item {
        margin-bottom: 8px;
    }
`;
