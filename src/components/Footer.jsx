import React from "react";
import { Grid, Paper, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";


const Footer = () => {


    return (
        <div>
            <Paper
                elevation={3}
                style={{
                    ...styles.footerContainer,
                    ...styles.rowContainer,
                    height: "100vh",
                }}
            >
                <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{ ...styles.rowContainer, flexDirection: "column", justifyContent: 'space-between' }}
                >
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography
                            button
                            variant="body1"
                            style={{ ...styles.objective, fontSize: "22px", fontWeight: '700' }}
                        >
                            "Nuestro objetivo es proporcionar vehículos de alta calidad que
                            cubran las necesidades de nuestros clientes"
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1" style={{ fontSize: '22px' }}>Síguenos en redes sociales:</Typography>
                        <IconButton>
                            <FacebookIcon style={{ fontSize: "44px", color: "blue" }} />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon
                                style={{
                                    fontSize: "44px",
                                    color: "#dc2743",
                                }}
                            />
                        </IconButton>
                        <IconButton>
                            <TwitterIcon style={{ fontSize: "44px", color: "#2284E0" }} />
                        </IconButton>
                        <IconButton>
                            <WhatsAppIcon style={{ fontSize: "44px", color: "green" }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <div style={{ fontSize: '22px' }}>
                            <Grid item>
                                <Typography variant="body1" component="a" style={{ fontSize: '20px' }}>
                                    Vehicle Sales & Real Estate © 2024
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" component="a" href="/legal" style={styles.link}>
                                    Términos y Condiciones
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" component="a" href="/politic" style={styles.link}>
                                    Política de Privacidad
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

const styles = {
    footerContainer: {
        backgroundColor: "#f2f2f2",
    },
    objective: {
        fontStyle: "italic",
    },
    rowContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        textAlign: "center",
    },
};

export default Footer;
