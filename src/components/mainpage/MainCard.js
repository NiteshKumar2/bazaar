"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
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
});

function MainCard() {
  const classes = useStyles();

  const cardInfo = [
    {
      title: "Star Showroom",
      description: "Women suit available",
      price: "$99.99",
      minutes: "31 min",
      image: "/shopping1.png",
      button: "Shop Now",
    },
    {
      title: "Galaxy Store",
      description: "Men suit collection",
      price: "$129.99",
      minutes: "31 min",
      image: "/shopping1.png",
      button: "Shop Now",
    },
    {
      title: "Fashion Hub",
      description: "Latest fashion trends",
      price: "$79.99",
      minutes: "31 min",
      image: "/shopping1.png",
      button: "Shop Now",
    },
    {
      title: "Fashion Hub",
      description: "Latest fashion trends",
      price: "$79.99",
      minutes: "31 min",
      image: "/shopping1.png",
      button: "Shop Now",
    }, {
      title: "Fashion Hub",
      description: "Latest fashion trends",
      price: "$79.99",
      minutes: "31 min",
      image: "/shopping1.png",
      button: "Shop Now",
    },
    // Add more items as needed...
  ];

  return (
    <Box
   
    >
      <Box
        sx={{
          marginTop: { xs: 3, sm: 6, md: 6 },
          marginBottom: 3,
          display: "flex",
          justifyContent: "Left",
        }}
      >
        <Typography
          variant="h5"
          sx={{ // Margin below heading
            textAlign: "center",
            marginLeft: { xs: 2, sm: 50, md: 50 }, // Centered heading
          }}
        >
          Shopes near me
        </Typography>

      </Box>

      <Container sx={{ padding: 0 }}>

        <Link
          href={"/shop_with_us"}
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "left",
            }}
          >
            {cardInfo.map((card, index) => (
              <Box
                key={index}
                sx={{
                  flexBasis: {
                    xs: "100%", // 1 item per row in phone mode
                    sm: "48%",  // 2 items per row in tablet mode
                    md: "30%",  // 3 items per row in window mode
                  },
                  m: {
                    xs: 1, // 1 item per row in phone mode
                    sm: 2.3,  // 2 items per row in tablet mode
                    md: 2.3,  // 3 items per row in window mode
                  },
                }}
              >
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    alt={card.title}
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
                        {card.title}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={4.2}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
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
                        {card.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "black",
                          fontSize: "0.8rem",
                        }}
                      >
                        {card.price}
                      </Typography>
                    </Box>
                    <CardActions className={classes.cardActions}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          marginBottom: -2,
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
                          {card.minutes}
                        </Typography>
                      </Box>
                    </CardActions>
                  </CardContent>
                </Card>
              </Box>
            ))}

          </Box>
        </Link>
      </Container>
    </Box>
  );
}

export default MainCard;
