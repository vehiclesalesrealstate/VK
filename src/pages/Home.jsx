import React, { useState, useEffect } from 'react';

import {
  Grid,
  Paper,
} from "@mui/material";
import Cards3D from "../components/Cards3D";
import "firebase/storage";
import img_1 from '../img/img_1.jpg'
import img_2 from '../img/img_2.jpg'
import img_3 from '../img/img_3.jpg'


const Home = ({ producto }) => {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {

      setCurrentImage((prevImage) => (prevImage % 3) + 1);
    }, 5500);


    return () => clearInterval(intervalId);
  }, []);

  function getImageUrl() {

    switch (currentImage) {
      case 1:
        return img_1;
      case 2:
        return img_2;
      case 3:
        return img_3;
      default:
        return img_1;
    }
  };

  return (
    <>
      <div
        style={{
          height: "auto",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          alignItems: "center",
          transition: "background-image 2s ease-in-out",
        }}
      >
        <Paper
          elevation={3}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Grid
            container
            className="container_port"
            spacing={2}
            style={{
              ...styles.portImgCont,
              backgroundImage: `url(${getImageUrl()})`,

            }}
          >
            <Grid item xs={12} style={styles.columnContainer}>
              <h1 style={{
                ...styles.welcomeText,
                fontWeight: '800'
              }}>"RUEDA CON PASIÓN, VIAJA CON CONFIANZA: TU DESTINO, NUESTRA GARANTÍA."</h1>
            </Grid>
          </Grid>
        </Paper >
        <Cards3D />
      </div>
    </>
  );
};

const styles = {
  portImgCont: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    width: "100%",
    height: "80vh",
    fontSize: "14px",
    display: "grid",
    gridTemplateColumns: "1fr",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    padding: "20px",
    margin: "0",
  },
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
  button: {
    width: "100%",
    maxWidth: "200px",
    marginBottom: "10px",
  },
  textField: {
    width: "100%",
    maxWidth: "250px",
    marginBottom: "10px",
  },
  cardContainer: {
    marginTop: "20px",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  welcomeText: {
    display: "inline-block",
    color: "wheat",
    padding: "20px",
  },
};

export default Home;
