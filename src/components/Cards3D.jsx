import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { getDatabase, ref, onValue } from "firebase/database";

const styles = {
    container: {
        padding: "10px",
        display: "grid",
        gridTemplateColumns: "1fr",
        alignItems: "center",
    },
    columnContainer: {
        textAlign: "center",
    },
    rowContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cardContainer: {
        marginTop: "20px",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
    },
};

export default function CardLayers3d({
    searchTerm,
    imageUrls: propImageUrls,
}) {
    const [imageUrls, setImageUrls] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const db = getDatabase();
        const productsRef = ref(
            db,
            `Users/Products/imges/motos_img/Daytona/${searchTerm}`
        );
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            // Convierte el objeto de datos en un arreglo de productos
            if (data) {
                const productsArray = Object.keys(data).map((key) => ({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    precio: data[key].precio,
                    imageUrls: data[key].imageUrls,
                }));
                setProducts(productsArray);
                setImageUrls(propImageUrls);
            }
        });

    }, [propImageUrls, searchTerm]);

    return (
        <div
            style={{
                height: "auto",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                transition: "background-image 2s ease-in-out",
            }}
        >
            <Grid
                container
                item
                xs={12}
                style={{
                    ...styles.rowContainer,
                    ...styles.cardContainer,
                    marginBottom: "20px",
                }}
            >
                <Box style={{ ...styles.rowContainer, height: "auto" }}>
                    <Grid
                        container
                        item
                        xs={12}
                        style={{ ...styles.rowContainer, ...styles.cardContainer }}
                    >
                        {imageUrls
                            .filter((url) => url.toLowerCase().includes(searchTerm))
                            .map((url, index) => (
                                <Grid key={index} item padding="5px">
                                    <Card style={{ maxWidth: 345 }}>
                                        <CardContent>
                                            <h3>{products[index]?.name}</h3>
                                        </CardContent>
                                        <CardMedia
                                            component="img"
                                            alt={`Image ${index}`}
                                            height="140"
                                            image={products[index]?.imageUrls}
                                            loading="lazy"
                                        />
                                        <CardContent>
                                            <h2>{"$" + products[index]?.precio}</h2>
                                            <p>{products[index]?.description}</p>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            </Grid>
        </div>
    );
}
