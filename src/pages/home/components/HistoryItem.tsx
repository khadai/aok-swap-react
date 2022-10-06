import React, { FC } from 'react';
import styled from 'styled-components';
import {
    Avatar,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
    Link,
    useMediaQuery,
    Theme,
    Skeleton,
} from '@mui/material';
import moment from 'moment';
import { IoArrowDownSharp, IoArrowUpSharp } from 'react-icons/io5';
import { History } from '../../../types/History';

interface Props extends History {
    className?: string;
}

const HistoryItem: FC<Props> = ({ className, amount, type, icon, timestamp, txid, network, confirmed }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    return (
        <Paper className={className} variant="outlined">
            <ListItemButton
                className="list-item"
                component={Link}
                target="_blank"
                href={`https://aokscan.com/transaction/${txid}`}
            >
                <ListItemAvatar>
                    <Avatar>{type === 'withdrawal' ? <IoArrowUpSharp /> : <IoArrowDownSharp />}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography
                            variant="subtitle1"
                            noWrap
                            color={confirmed && (confirmed === 'true' ? 'textPrimary' : 'textSecondary')}
                        >
                            {txid ? (
                                (mobile ? txid.slice(0, 16) : txid.slice(0, 40)) + '...'
                            ) : (
                                <Skeleton animation="wave" width={100} />
                            )}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="subtitle2" color="textSecondary">
                            {timestamp &&
                                moment(timestamp * 1000)
                                    .startOf('day')
                                    .fromNow()}
                        </Typography>
                    }
                />
                {icon && <img src={icon} alt="coin" />}
                <Typography
                    align="right"
                    ml={1}
                    variant={mobile ? 'body1' : 'h6'}
                    color={confirmed && (confirmed === 'true' ? 'textPrimary' : 'textSecondary')}
                >
                    {network} {type === 'withdrawal' ? '-' : '+'}
                    {amount}
                </Typography>
            </ListItemButton>
        </Paper>
    );
};

export default styled(HistoryItem)`
    margin-bottom: 8px;
    .list-item {
        border-radius: inherit;
    }
`;
