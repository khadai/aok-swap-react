import React, { FC } from 'react';
import styled from 'styled-components';
import { Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';

interface Props {
    className?: string;
}

const DepositSkeleton: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

    return (
        <div className={className}>
            <Typography variant="h4" mb={4}>
                <Skeleton width={100} />
            </Typography>
            <div className="deposit-box">
                <Skeleton height={40} width={120} />
                <div className="qr-code">
                    <Skeleton variant="rectangular" width={mobile ? 135 : 200} height={mobile ? 135 : 200} />
                </div>
                <Typography color="textSecondary" className="copy-txt" noWrap>
                    <Skeleton width={100} />
                </Typography>
                <div className="deposit-warning">
                    <Typography variant="caption" display="block" ml={1}>
                        <Skeleton width={100} />{' '}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default styled(DepositSkeleton)`
    .deposit-warning {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .deposit-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .qr-code {
        margin: ${({ theme }) => theme.spacing(6.5, 0, 3)};
    }

    .copy-txt {
        margin: ${({ theme }) => theme.spacing(2)};
        padding: ${({ theme }) => theme.spacing(2, 7)};
        border: ${({ theme }) => theme.palette.divider} 1px solid;
        border-radius: 4px;
    }
`;
