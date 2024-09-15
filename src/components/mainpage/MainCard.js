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
      <Link href={`/shopnearme/shop?email=${card.email}`}  style={{ textDecoration: "none" }}>
      <CardMedia
        component="img"
        alt={card.name}
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
            {card.name}
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
            {card.rating}
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
              {card.city}
            </Typography>
          </Box>
        </CardActions>
      </CardContent>
      </Link>
    </Card>
  );
}

function MainCard({ userDetail }) {
  const classes = useStyles();

  return (
    <Box>
      <Box sx={{ textAlign: "center", marginTop: 6, marginBottom: 3 }}>
        <Typography variant="h5" className={classes.title}>
          Shops near me
        </Typography>
      </Box>

      <Container sx={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 2,
            }}
          >
            {userDetail.map((card) => (
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

export default MainCard;
