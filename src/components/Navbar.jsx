import React, { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import HomeImage from '../img/home.jpeg';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Home', link: '/VK' },
        { text: 'Products', link: '/products' },
        { text: 'About', link: '/about' },
        { text: 'Succursal', link: '/succursal' },
    ];

    return (
        <div>
            <AppBar position="static" style={{ background: '#ffffff', color: '#000', fontWeight:'800' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Logo" src={HomeImage} sx={{ width: 300, height: 40, marginRight: 1 }} />
                    </Typography>

                    {isMobile && (
                        <div sx={{ display: 'flex', marginLeft: 'auto' }}>
                            <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                    )}

                    <Drawer
                        anchor="left"
                        open={isDrawerOpen}
                        onClose={toggleDrawer(false)}
                        sx={{
                            width: '100%',
                            height: '100vh',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& .MuiDrawer-paper': {
                                width: '100%',
                                maxWidth: '100%',
                                padding: 2,
                                textAlign: 'center'
                            },
                        }}
                    >
                        <List>
                            {menuItems.map((item, index) => (
                                <ListItem button key={index} component={Link} to={item.link}
                                    onClick={toggleDrawer(false)}
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>

                    {!isMobile && (
                        <div sx={{ display: 'flex' }} style={{fontWeight:'600'}}>
                            <Button component={Link} to="/VK" color="inherit">
                                Home
                            </Button>
                            <Button component={Link} to="/products" color="inherit">
                                Products
                            </Button>
                            <Button component={Link} to="/about" color="inherit">
                                About
                            </Button>
                            <Button component={Link} to="/succursal" color="inherit">
                                Succursal
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
