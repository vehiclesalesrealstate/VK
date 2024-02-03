import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box,
    Drawer,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import HomeImage from "../img/home.jpeg";
import { useAuth } from "../routes/AuthContext";
import { Upload, VerifiedUserOutlined } from "@mui/icons-material";
import Settings from '@mui/icons-material/Settings';
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, currentUser } = useAuth();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const isAdmin = isAuthenticated && currentUser?.role === 'Admin';

    const menuItems = [
        { text: "Home", link: "/" },
        { text: "Products", link: "/products" },
        { text: "About", link: "/about" },
        { text: "Succursal", link: "/succursal" },
        ...(!isAuthenticated
            ? [
                { text: "Sign In", link: "/signin" },
                { text: "Sign Up", link: "/signup" },
            ]
            : []),
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <AppBar position="static" style={{ background: "#ffffff", color: "#000" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ alignItems: "center", flexGrow: 1 }}
                    >
                        <Avatar
                            alt="Logo"
                            src={HomeImage}
                            sx={{ width: 200, height: 40, marginRight: 1 }}
                        />
                    </Typography>
                    {isAuthenticated && (
                        <>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => setDrawerOpen(!isDrawerOpen)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                    >
                        <MenuItem >
                            <Typography variant="subtitle1" component="span" sx={{ marginX: 2 }}>
                                {currentUser?.email}
                            </Typography>
                        </MenuItem>
                        {isAdmin && (
                            <>

                                <MenuItem style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                    <Link to="/upload" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Upload fontSize="small" />
                                        </ListItemIcon>
                                        Upload
                                    </Link>
                                </MenuItem>
                                <MenuItem style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                    <Link to="/SignUpAdmin" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ListItemIcon button style={{ display: 'flex', justifyContent: 'center' }}>
                                            <VerifiedUserOutlined fontSize="small" />
                                        </ListItemIcon>
                                        Sign Up Admin
                                    </Link>
                                </MenuItem>
                            </>
                        )}
                        {!isAdmin && (
                            <>
                                <MenuItem onClick={() => navigate('/buy')} style={{ justifyContent: 'center', textAlign: 'center' }}>
                                    <Typography variant="subtitle1" component="span" sx={{ marginX: 2 }} style={{
                                        justifyContent: 'center', textAlign: 'center',
                                        alignContent: 'center', alignItems: 'center'
                                    }}>
                                        <IconButton aria-label="carrito de compras">
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    </Typography>
                                    Compras
                                </MenuItem>
                            </>
                        )}
                        <MenuItem onClick={handleClose} style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout} onClose={handleClose} style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setDrawerOpen(false)}
                    onKeyDown={() => setDrawerOpen(false)}
                >
                    <List
                    >
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} component={Link} to={item.link} style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
};

export default Navbar;
