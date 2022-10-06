import styled from 'styled-components';
import React, { forwardRef } from 'react';
import { Grid } from '@mui/material';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { SnackbarKey, SnackbarMessage } from 'notistack';

interface ReportSuccessProps {
    id: SnackbarKey;
    message: SnackbarMessage;
    className?: string;
}

const ReportSuccess = forwardRef<HTMLDivElement, ReportSuccessProps>((props, ref) => {
    const { id, message, className, ...other } = props;
    return (
        <div ref={ref} role="alert" {...other} className={className}>
            <Grid container className="card" direction="row" alignItems="center">
                <Grid item md="auto" xs="auto" alignItems="center" className="icon-wrapper">
                    <RiCheckboxCircleFill className="icon" />
                </Grid>
                <Grid item md xs>
                    {message}
                </Grid>
            </Grid>
        </div>
    );
});

export default styled(ReportSuccess)`
    width: 466px;

    .card {
        background-color: #6c82cf;
        padding: 18px;
        color: white;
    }

    .icon {
        height: 20px;
        width: 20px;
    }

    .icon-wrapper {
        margin-right: 18px;
    }
`;
