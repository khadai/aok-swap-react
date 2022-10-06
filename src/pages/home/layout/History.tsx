import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Grid, List, MenuItem, Pagination, Select, SelectChangeEvent, Typography } from '@mui/material';
import styled from 'styled-components';
import { HistoryItem, HistorySkeleton, NoHistory } from '../components';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useHistory } from '../../../api';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

interface Props {
    className?: string;
}

const History: FC<Props> = ({ className }) => {
    const [filter, setFilter] = useState<'deposit' | 'withdrawal'>('deposit');
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const { enqueueSnackbar } = useSnackbar();
    const token = useSelector((state: any) => state.login.token);

    const { error, data: history, isLoading } = useHistory({ auth: token, type: filter });
    console.log(history);

    const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as 'deposit' | 'withdrawal');
    };

    const historyList = (
        <List>
            {history &&
                history
                    .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
                    .map((item, idx) => <HistoryItem {...item} key={idx} />)}
        </List>
    );

    useEffect(() => {
        if (error) {
            enqueueSnackbar(`History: ${error?.message}`, { variant: 'error' });
        }
    }, [error]);

    const component = (
        <div className={className}>
            <Grid item container alignItems="center" md={12} mb={3}>
                <Grid item md xs>
                    <Typography variant="h4">History</Typography>
                </Grid>
                <Grid item md="auto" xs="auto">
                    <Select
                        value={filter}
                        onChange={handleSelectChange}
                        displayEmpty
                        disableUnderline
                        variant="standard"
                        IconComponent={ExpandMoreRoundedIcon}
                        className="menu-item"
                    >
                        <MenuItem value="deposit" className="menu-item">
                            <Typography variant="h6" pl={0.5}>
                                Deposit
                            </Typography>
                        </MenuItem>
                        <MenuItem value="withdrawal">
                            <Typography variant="h6" pl={0.5}>
                                Withdraw
                            </Typography>
                        </MenuItem>
                    </Select>
                </Grid>
            </Grid>
            {!isLoading ? (
                <>{!history || history.length === 0 ? <NoHistory /> : historyList}</>
            ) : (
                <HistorySkeleton rows={5} />
            )}
            <div className="pagination">
                {history && history.length > itemsPerPage && (
                    <Pagination
                        count={Math.ceil(history.length / itemsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        variant="outlined"
                    />
                )}
            </div>
        </div>
    );

    return isLoading ? <HistorySkeleton rows={5} /> : component;
};

export default styled(History)`
    height: 100%;

    .pagination {
        display: flex;
        justify-content: center;
    }

    .menu-item {
        margin: 4px;
    }
`;
