import React, { FC, useState } from 'react';
import { AppBar, Button, Container, IconButton, Link, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../assets/logos/logo-green.svg';
import { MobileDrawer } from './index';
import { useDispatch } from 'react-redux';
import { resetSecret } from '../redux/reducers/login';

interface Props {
    className?: string;
}

const Navigation: FC<Props> = ({ className }) => {
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const history = useHistory();

    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(resetSecret());
        delete localStorage.auth;
        history.push('/login');
    };

    const logo = (
        <Button component={RouterLink} to="/">
            <img src={Logo} width={32} height={32} alt="logo" />
            <Typography variant="h6" ml={1} color="primary">
                AOK Swap
            </Typography>
        </Button>
    );

    const mobileNav = (
        <div className="mobile">
            {logo}
            <IconButton size="large" onClick={() => setIsDrawerOpened(true)}>
                <MenuRoundedIcon fontSize="large" />
            </IconButton>
        </div>
    );

    const desktopNav = (
        <Container>
            <div className="links">
                <div className="grow">{logo}</div>
                <div className="nav-btns">
                    <Button
                        component={Link}
                        href="https://aokscan.com/"
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Typography textTransform="none" variant="body1">
                            Explorer
                        </Typography>
                    </Button>
                    <Button onClick={logOut} className="link" startIcon={<LogoutIcon />} variant="outlined">
                        <Typography textTransform="none" variant="body1">
                            Logout
                        </Typography>
                    </Button>
                </div>
            </div>
        </Container>
    );

    return (
        <div className={className}>
            <Toolbar>
                <AppBar className="links-box" elevation={0}>
                    {mobile ? mobileNav : desktopNav}
                </AppBar>
            </Toolbar>
            <MobileDrawer isDrawerOpened={isDrawerOpened} setIsDrawerOpened={setIsDrawerOpened} />
        </div>
    );
};

export default styled(Navigation)`
    .links-box {
        background-color: ${({ theme }) => theme.palette.background.default};
        border-bottom: solid 1px ${({ theme }) => theme.palette.divider};
        height: 77px;
    }

    .links {
        padding: ${({ theme }) => theme.spacing(2, 0)};
        display: flex;
        width: 100%;

        .grow {
            flex-grow: 1;
            display: flex;
            align-items: center;
        }

        .link {
            margin: ${({ theme }) => theme.spacing(0, 2)};
        }

        .nav-btns {
            display: flex;
            align-items: center;
        }
    }

    .mobile {
        width: 100vw;
        height: 77px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px ${({ theme }) => theme.palette.divider};
    }
`;
