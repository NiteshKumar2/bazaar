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
  Skeleton,
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

function CardItem({ card, isLoading }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {/* Conditionally render skeletons while loading */}
      {isLoading ? (
        <Skeleton variant="rectangular" height={190} />
      ) : (
        <Link
          href={`/shopnearme/${card.email}`}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            alt={card.name}
            height="190"
            image={card.image}
          />
        </Link>
      )}

      <CardContent className={classes.cardContent}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isLoading ? (
            <Skeleton width="50%" />
          ) : (
            <Typography
              gutterBottom
              variant="body2"
              sx={{ color: "red", fontSize: "0.8rem" }}
            >
              {card.name}
            </Typography>
          )}
          {isLoading ? (
            <Skeleton width={30} height={20} />
          ) : (
            <Rating
              name="read-only"
              value={card.rating}
              precision={0.1}
              readOnly
              size="small"
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          {isLoading ? (
            <Skeleton width="40%" />
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontSize: "0.8rem",
              }}
            >
              {card.description}
            </Typography>
          )}

          {isLoading ? (
            <Skeleton width="20%" />
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "black",
                fontSize: "0.8rem",
              }}
            >
              {card.location}
            </Typography>
          )}
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
            {isLoading ? (
              <Skeleton width={50} height={20} />
            ) : (
              <Button size="small">{card.button}</Button>
            )}
            {isLoading ? (
              <Skeleton width="30%" />
            ) : (
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  fontSize: "0.8rem",
                }}
              >
                {card.city}
              </Typography>
            )}
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
}

function MainCard({ userDetail, isFetching }) {
  const classes = useStyles();

  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingBottom: 12,
        backgroundColor: "rgb(236 235 227)",
      }}
    >
      <Box sx={{ textAlign: "center", marginTop: 6, marginBottom: 3 }}>
        <Typography variant="h4" className={classes.title}>
          Shops near me
        </Typography>
      </Box>

      <Container sx={{ padding: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 2,
          }}
        >
          {(isFetching ? Array.from(new Array(6)) : userDetail).map(
            (card, index) => (
              <Box
                key={index}
                sx={{
                  flexBasis: {
                    xs: "100%",
                    sm: "48%",
                    md: "30%",
                  },
                  boxSizing: "border-box",
                }}
              >
                {/* Pass isLoading prop to CardItem to show skeleton */}
                <CardItem card={card || {}} isLoading={isFetching} />
              </Box>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default MainCard;
