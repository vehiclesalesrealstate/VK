import * as React from "react";
import { styled, keyframes } from "@mui/material/styles";
import { Card, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import port2 from "../img/portada.jpeg";
import port from "../img/port_1.png";
import port3 from "../img/port_2.png";
import Carousel from "react-material-ui-carousel";
import Maps from "../components/Maps";

const images = [port, port2, port3];

const scatterAnimation = keyframes`
0% {
    transform: translate(0, 0);
    opacity: 0;
}
50% {
    transform: translate(${Math.random() * 50}px, ${Math.random() * 50}px);
    opacity: 1;
}
100% {
    transform: translate(0, 0);
    opacity: 1;
}
`;

const ScatterCard = styled(Card)`
  animation: ${scatterAnimation} 1s ease;
`;

export default function Succursal() {
    return (
        <>
            <div className='pages_container' style={{
                padding: "10px"
            }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <ScatterCard>
                            <Grid container>
                                <Grid item xs={12} sm={6} style={{ padding: "10px" }}>
                                    <Carousel>
                                        {images.map((image, i) => (
                                            <CardMedia
                                                key={i}
                                                component="img"
                                                style={{ width: '100%', height: 'auto' }}
                                                image={image}
                                                alt="Imagen descriptiva"
                                            />
                                        ))}
                                    </Carousel>
                                    <hr/>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                        Vehicle Sales &amp; Real Estate. Guayaquil
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Concesionaria de motocicletas
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Asesor comercial: +593 99 073 0185
                                        </Typography>
                                    </CardContent>
                                    <hr/>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{ padding: "10px" }}>
                                    <Maps />
                                </Grid>
                            </Grid>
                        </ScatterCard>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
