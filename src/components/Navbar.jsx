import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    useMediaQuery,
    useTheme,
    Box
} from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import HomeImage from "../img/home.jpeg";
import { useAuth } from "../routes/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { Upload, VerifiedUserOutlined } from "@mui/icons-material";

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated, logout, currentUser } = useAuth();

    const isAdmin = () => {
        return isAuthenticated && currentUser?.role === 'Admin';

    };
    console.log(currentUser);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

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

    const handleAddClick = (eventoProducto) => {

        const producto = {
            id: eventoProducto.id,
            name: eventoProducto.name,
            precio: eventoProducto.precio,
            imageUrl: eventoProducto.imageUrl,

        };
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const index = carrito.findIndex((item) => item.id === producto.id);

        if (index === -1) {
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));

        navigate('/buy');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <AppBar
                position="static"
                style={{ background: "#ffffff", color: "#000", fontWeight: "800" }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Avatar
                            alt="Logo"
                            src={HomeImage}
                            sx={{ width: 300, height: 40, marginRight: 1 }}
                        />
                    </Typography>

                    {isMobile && (
                        <div >
                            <IconButton
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                    )}

                    <Drawer
                        anchor="left"
                        open={isDrawerOpen}
                        onClose={toggleDrawer(false)}
                        sx={{
                            width: "100%",
                            height: "100vh",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            "& .MuiDrawer-paper": {
                                width: "100%",
                                maxWidth: "100%",
                                padding: 2,
                                textAlign: "center",
                            },
                        }}
                    >
                        <List>
                            {menuItems.map((item, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    component={Link}
                                    to={item.link}
                                    onClick={toggleDrawer(false)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <div style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        {!isMobile && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",

                                    textAlign: "center",
                                }}
                                style={{ fontWeight: "600" }}
                            >
                                {menuItems.map((item, index) => (
                                    <Button
                                        key={index}
                                        component={Link}
                                        to={item.link}
                                        color="inherit"
                                    >
                                        {item.text}
                                    </Button>
                                ))}
                            </Box>
                        )}
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
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}

                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem >
                                        <Typography variant="subtitle1" component="span" sx={{ marginX: 2 }}>
                                            {currentUser?.email}
                                        </Typography>
                                    </MenuItem>
                                    {isAdmin() && (
                                        <>
                                            <MenuItem style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                                <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Link to="/upload" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Upload fontSize="small" />
                                                        Upload
                                                    </Link>
                                                </ListItemIcon>
                                            </MenuItem><MenuItem style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                                <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Link to="/SignUpAdmin" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <VerifiedUserOutlined fontSize="small" />
                                                        Sign Up Admin
                                                    </Link>
                                                </ListItemIcon>
                                            </MenuItem>
                                        </>
                                    )}
                                    {!isAdmin() && (


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
                                    )}
                                    <MenuItem onClick={handleClose} style={{ justifyContent: 'center', textAlign: 'center' }}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout} style={{ justifyContent: 'center', textAlign: 'center' }}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
