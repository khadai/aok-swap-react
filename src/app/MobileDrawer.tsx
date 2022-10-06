import React, { FC } from 'react';
import {
    Container,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetSecret } from '../redux/reducers/login';

interface Props {
    className?: string;
    isDrawerOpened: boolean;
    setIsDrawerOpened: (arg1: boolean) => void;
}

const MobileDrawer: FC<Props> = ({ className, isDrawerOpened, setIsDrawerOpened }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onClose = () => setIsDrawerOpened(false);

    const logOut = () => {
        dispatch(resetSecret());
        delete localStorage.auth;
        history.push('/login');
    };

    return (
        <Drawer
            anchor="top"
            open={isDrawerOpened}
            className={className}
            onClose={onClose}
            PaperProps={{ className: 'paper' }}
        >
            <Container>
                <div className="close-box">
                    <IconButton color="inherit" size="large" onClick={onClose}>
                        <MdOutlineClose size={24} />
                    </IconButton>
                </div>
            </Container>
            <List className="mobile-list">
                <ListItem className="link">
                    <ListItemButton onClick={onClose} component={RouterLink} to="/">
                        <ListItemText
                            className="link-text"
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    AOK Swap
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem className="link">
                    <ListItemButton
                        onClick={onClose}
                        component={Link}
                        href="https://aokscan.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ListItemText
                            className="link-text"
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    Explorer
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem className="link">
                    <ListItemButton onClick={logOut}>
                        <ListItemText
                            className="link-text"
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    Log Out
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default styled(MobileDrawer)`
    .mobile-list {
        color: ${({ theme }) => theme.palette.common.white};
    }

    .link-text {
        display: flex;
        justify-content: center;
    }

    .paper {
        height: 100%;
        background: ${({ theme }) => theme.palette.primary.main};
    }

    .close-box {
        display: flex;
        justify-content: flex-end;
        height: 75px;
        color: ${({ theme }) => theme.palette.common.white};
    }
`;
