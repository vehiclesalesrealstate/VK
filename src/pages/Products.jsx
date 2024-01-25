import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

const ProductoCard = ({ producto }) => {
    const { description, imageUrl, name, precio } = producto;
    const [buttonColor, setButtonColor] = React.useState("inherit");
    const [likeCount, setLikeCount] = React.useState(
        parseInt(localStorage.getItem("likeCount")) || 0
    );

    const handleShareClick = () => {
        setLikeCount((prevCount) => {
            const newCount = prevCount + 1;
            localStorage.setItem("likeCount", newCount.toString());
            return newCount;
        });
        setButtonColor("red");
    };

    return (
        <Card>
            <CardMedia component="img" alt={name} height="140" image={imageUrl} />
            <CardContent>
                <Typography gutterBottom component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between", alignContent: 'center' }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography color="text.secondary">Precio: ${precio}</Typography>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="body1"> {likeCount}</Typography>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={handleShareClick}
                            style={{ color: buttonColor }}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const TuComponenteReact = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(
                    "https://akvehicle45-default-rtdb.firebaseio.com/Users/Products/imges/motos_img/Daytona.json"
                );
                const data = response.data;
                 
                const carpetas = Object.keys(data);
                const fetchPromises = carpetas.map(async (carpeta) => {
                    const response = await axios.get(
                        `https://akvehicle45-default-rtdb.firebaseio.com/Users/Products/imges/motos_img/Daytona/${carpeta}.json`
                    );
                    const productosData = response.data;

                    const productosArray = Object.values(productosData);
                    const productosConFolder = productosArray.map((producto) => ({
                        ...producto,
                        folder: carpeta,
                    }));
                    return productosConFolder;
                });
                const productosData = await Promise.all(fetchPromises);
                const allProductos = productosData.flat();
                setProductos(allProductos);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>Error al cargar los datos: {error.message}</p>;
    }

    return (
        <div className="pages_container_products">
            <div style={{ padding: "20px" }}>
                <Grid container spacing={2}>
                    {productos.map((producto, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <ProductoCard key={index} producto={producto} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default TuComponenteReact;
