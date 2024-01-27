import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Alert } from '@mui/material';
import { getDatabase, ref, get } from 'firebase/database';
import { useAuth } from '../routes/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertMessage('');
        setAlertSeverity('info');

        const db = getDatabase();
        const usersRef = ref(db, 'Users/Client');

        get(usersRef).then((snapshot) => {
            let userFound = false;
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const user = childSnapshot.val();
                    if (user.email === email && user.password === password) {
                        userFound = true;
                        login({ email: email });
                        navigate('/');
                    }
                });
                if (!userFound) {
                    setAlertMessage('Usuario no encontrado o contraseña incorrecta');
                    setAlertSeverity('error');
                }
            }
        }).catch((error) => {
            setAlertMessage(`Error al obtener usuarios: ${error}`);
            setAlertSeverity('error');
        });

    };

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {alertMessage && (
                        <Alert severity={alertSeverity} sx={{ width: '100%', mb: 2 }}>
                            {alertMessage}
                        </Alert>
                    )}
                    <Typography component="h1" variant="h5">
                        Sign In
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
                            onChange={e => setEmail(e.target.value)}
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
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default SignIn;
