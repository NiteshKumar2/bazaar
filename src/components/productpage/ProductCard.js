"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Modal,
  IconButton,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Importing Close Icon for the close button
import { makeStyles } from "@mui/styles";
import Image from "next/image";

const useStyles = makeStyles({
  card: {
    maxWidth: 450,
    border: "6px solid white",
    backgroundColor: "white",
    borderRadius: 20,
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
    cursor: "pointer", // Makes it clear that the card is clickable
  },
  cardContent: {
    padding: "8px 6px",
  },
  cardActions: {
    padding: "1px 1px",
    paddingTop: 0,
  },
  modalImage: {
    width: "80%", // Adjust image size in the modal
    maxHeight: "80vh", // Limit the height to ensure it fits on the screen
    objectFit: "contain", // Keeps the image aspect ratio intact
    margin: "auto",
  },
  modalBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    outline: "none", // Remove the default outline around modal content
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
    backgroundColor: "black",
    zIndex: 1000, // Ensure the close button is above the image
  },
});

function CardItem({ card }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Modal open/close handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Card Component */}
      <Card className={classes.card} onClick={handleOpen}>
        <CardMedia
          component="img"
          alt={"No Image"}
          height="190"
          image={card.image}
        />
        <CardContent className={classes.cardContent}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="body2"
              sx={{ color: "red", fontSize: "0.8rem" }}
            >
              {card.type}
            </Typography>

            <Typography
              gutterBottom
              variant="body2"
              sx={{ color: "red", fontSize: "0.8rem" }}
            >
              {card.size}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontSize: "0.8rem",
              }}
            >
              {card.subtype}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontSize: "0.8rem",
              }}
            >
              {card.color}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontSize: "0.8rem",
              }}
            >
              {new Date(card.updatedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontSize: "0.8rem",
              }}
            >
              {card.prizerange} & {card.discount}%
            </Typography>
          </Box>
          <CardActions className={classes.cardActions}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button size="small">{card.button}</Button>

              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  fontSize: "0.8rem",
                }}
              >
                {card.stockstatus}
              </Typography>
            </Box>
          </CardActions>
        </CardContent>
      </Card>

      {/* Modal for showing the full-size image */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-modal"
        aria-describedby="image-modal-description"
      >
        <Box className={classes.modalBox}>
          {/* Close Button */}
          <IconButton
            className={classes.closeButton}
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          {/* Display the large image */}
          <Image
            src={card.image} // Ensure the image URL is valid
            alt="Product"
            width={500} // Provide appropriate width
            height={500} // Provide appropriate height
            className={classes.modalImage} // Maintain class-based styling
            objectFit="cover" // Ensures the image covers the area without distortion (optional)
            placeholder="blur" // Optional: Blur effect while the image is loading
            blurDataURL="/path/to/low-res-placeholder.jpg" // Optional: Low-res placeholder image for blur effect
            priority={true} // Optional: Prioritize if the image is important for initial page load
          />
        </Box>
      </Modal>
    </>
  );
}

function ProductCard({ productDetail }) {
  const classes = useStyles();

  return (
    <Box>
      <Container sx={{ padding: 0, marginBottom: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 2,
          }}
        >
          {productDetail.map((card) => (
            <Box
              key={card._id}
              sx={{
                flexBasis: {
                  xs: "100%",
                  sm: "48%",
                  md: "30%",
                },
                boxSizing: "border-box",
              }}
            >
              <CardItem card={card} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default ProductCard;
