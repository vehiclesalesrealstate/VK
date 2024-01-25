import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// Animation color
const changeColor = keyframes`
  0% {
    background-color: #B2F0DC;
  }
  50% {
    background-color: #FFD3B6;
  }
  100% {
    background-color: #a6e4d0;
  }
`;

// Styled card with animation
const StyledCard = styled(Card)`
  animation: ${changeColor} 4s infinite;
`;

const About = () => {
    // Customer service information
    const customerServiceInfo = [
        { id: 1, name: 'Name 1', email: 'correo1@example.com', phone: '123-456-7890', skills: 'Habilitates 1', position: 'Cargo 1' },
        { id: 2, name: 'Name 2', email: 'correo2@example.com', phone: '987-654-3210', skills: 'Habilitates 2', position: 'Cargo 2' },
        { id: 3, name: 'Name 3', email: 'correo3@example.com', phone: '987-654-3210', skills: 'Habilitates 3', position: 'Cargo 3' },
    ];

    return (
        <div className='pages_container' style={{ padding: '20px' }}>
            <Grid container spacing={2}>
                {customerServiceInfo.map((person) => (
                    <Grid item key={person.id} xs={12} sm={12} md={6} lg={4}>
                        <StyledCard>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {person.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Email:</strong> {person.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Phone:</strong> {person.phone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Habilitates:</strong> {person.skills}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Cargo:</strong> {person.position}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default About;
