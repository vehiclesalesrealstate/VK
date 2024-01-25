import * as React from "react";
import { styled, keyframes } from "@mui/material/styles";
import { Card, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

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
    const [expanded, setExpanded] = React.useState(false);
    const [location] = React.useState(null);

    const [buttonColor, setButtonColor] = React.useState(
        { share: 'inherit' });


    const handleExpandClick = (id) => {
        setExpanded(!expanded);
    };

    const handleShareClick = () => {

        setButtonColor((prevColors) => ({
            ...prevColors,
            share: 'blue',

        }));



    };

    const succursales = [
        {
            id: 1,
            name: "Sucursal A",
            address: "Dirección A",
            schedule: "9:00 AM - 6:00 PM, Lun-Vie",
            contact: "123-456-7890",
        },
        {
            id: 2,
            name: "Sucursal B",
            address: "Dirección B",
            schedule: "10:00 AM - 7:00 PM, Lun-Sáb",
            contact: "987-654-3210",
        },
    ];

    return (
        <div
            className="pages_container"
            style={{
                justifyContent: "center",
                textAlign: "center",
                alignContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <Grid
                container
                spacing={2}
                style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                {succursales.map((succursal) => (
                    <Grid
                        item
                        key={succursal.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        style={{
                            justifyContent: "center",
                            textAlign: "center",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ScatterCard
                            style={{
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image="/static/images/cards/paella.jpg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    This impressive paella is a perfect party dish and a fun meal
                                    to cook together with your guests. Add 1 cup of frozen peas
                                    along with the mussels, if you like.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="share" onClick={handleShareClick} style={{ color: buttonColor.share }}>
                                    <ShareIcon />
                                </IconButton>
                                {location && (
                                    <IconButton aria-label="location" disabled style={{ color: 'inherit' }}>
                                        <LocationOnIcon />
                                    </IconButton>
                                )}

                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit style={{ background: '#FAFAFA', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <CardContent style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <MapContainer
                                        center={[-4.38333951039743, -79.94823236096013]}
                                        zoom={13}
                                        style={{
                                            marginTop: '40%', width: "100%", height: "200px", justifyContent: 'center',
                                            alignContent: 'center', alignItems: 'center'
                                        }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <Marker position={[-4.38333951039743, -79.94823236096013]}>
                                            <Popup>Your Location</Popup>
                                        </Marker>
                                    </MapContainer>
                                </CardContent>
                            </Collapse>
                        </ScatterCard>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
