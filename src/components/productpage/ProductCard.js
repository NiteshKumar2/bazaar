"use client";
import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Container,
  Link,
  Rating,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  },
  cardContent: {
    padding: "8px 6px",
  },
  cardActions: {
    padding: "1px 1px",
    paddingTop: 0,
  },
  title: {
    textAlign: "center",
    marginBottom: 3,
  },
});

function CardItem({ card }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
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
            {card.gender}
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
            {card.stockstatus}
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
              {card.discount}
            </Typography>
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
}

function ProductCard({ productDetail }) {
  const classes = useStyles();

  return (
    <Box>

      <Container sx={{ padding: 0 ,marginBottom:10}}>
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
