import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set} from 'firebase/database';

import {
    Button,
    TextField,
    Typography,
    Container,
    Box,
    Snackbar,
} from "@mui/material";
import { useAuth } from '../routes/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uuid = uuidv4();

        const db = getDatabase();
        const userRef = ref(db, 'Users/Client/' + uuid);

        setOpenSnackbar(true);
        
        setErrorMessage("");

        set(userRef, {
            email: email,
            password: password
        }).then(() => {
            console.log("Usuario registrado con éxito");
            navigate('/');
        }).catch((error) => {
            console.error("Error al registrar al usuario: ", error);
        });
        console.error(console.error());
        setErrorMessage(console.error());
    }


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="User registered successfully"
            />
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </Container>
    );
};

export default SignUp;
