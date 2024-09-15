import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
  CardActionArea,
  Link,
  Stack,
} from "@mui/material";

export default function LandingCard() {
  return (
    <Container sx={{ marginY:12 }}>
      <Stack
        spacing={4}
        direction={{ xs: "column", sm: "row" }} // Stack items in column on small screens, row on larger screens
        justifyContent="center"
        alignItems="center" // Center items horizontally
      >
        <Link href="/shopnearme?gender=female" underline="none">
          <Card sx={{ width:{ xs: 320, sm: 360, md: 360 }, margin: "0 auto" }}> {/* Set width directly */}
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="shopping1.png"
                alt="Order Online"
                style={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="primary"
                >
                  Female
                </Typography>
                <Typography variant="body2" color="text.secondary">
                A-Line Dress || Maxi Dress || Wrap Dress
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link href="/shopnearme?gender=male" underline="none">
        <Card sx={{ width:{ xs: 320, sm: 380, md: 380 }, margin: "0 auto" }}> {/* Set width directly */}
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="shopping1.png"
              alt="Shop Review"
              style={{ borderRadius: "5px" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="primary"
              >
                Male
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Blazer || Tuxedo || Casual Dress Shirt
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Link>
        <Link href="/shopnearme?gender=child" underline="none">
        <Card sx={{ width:{ xs: 320, sm: 380, md: 380 }, margin: "0 auto" }}> {/* Set width directly */}
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="shopping1.png"
              alt="Night Shopping"
              style={{ borderRadius: "5px" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="primary"
              >
                Child
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Party Dress || Tutu Dress || Summer Dress
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Link>
      </Stack>
    </Container>
  );
}
