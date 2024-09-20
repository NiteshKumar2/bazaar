import React from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Image from "next/image";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Bazarnear © "}
      <Link href="https://bazarnear.com/" color="inherit">
        Copyright&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          width: "100%",
          gap: { xs: 4, sm: 2 },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ ml: "-15px" }}>
            <Image
              src="/logo.png"
              alt="BazarNear Logo"
              width={130}
              height={50}
            />
          </Box>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            Newsletter
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Subscribe to our newsletter for weekly updates and promotions.
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap>
            <TextField
              id="newsletter-email"
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Your email address"
              inputProps={{
                autoComplete: "off",
                "aria-label": "Enter your email address",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ flexShrink: 0 }}
            >
              Subscribe
            </Button>
          </Stack>
        </Box>
        <Box sx={{display:{ xs: "flex", sm: 'contents', md: 'contents' } }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} mb={1}>
            Product
          </Typography>
          <Stack spacing={0.5}>
            <Link color="text.secondary" href="#">
              Features
            </Link>
            <Link color="text.secondary" href="#">
              Testimonials
            </Link>
            <Link color="text.secondary" href="#">
              Highlights
            </Link>
            <Link color="text.secondary" href="#">
              Pricing
            </Link>
            <Link color="text.secondary" href="#">
              FAQs
            </Link>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} mb={1}>
            Company
          </Typography>
          <Stack spacing={0.5}>
            <Link color="text.secondary" href="#">
              About us
            </Link>
            <Link color="text.secondary" href="#">
              Careers
            </Link>
            <Link color="text.secondary" href="#">
              Press
            </Link>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} mb={1}>
            Legal
          </Typography>
          <Stack spacing={0.5}>
            <Link color="text.secondary" href="#">
              Terms
            </Link>
            <Link color="text.secondary" href="#">
              Privacy
            </Link>
            <Link color="text.secondary" href="#">
              Contact
            </Link>
          </Stack>
        </Box>
      </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/bazarnear"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://twitter.com/bazarnear"
            aria-label="Twitter"
            sx={{ alignSelf: "center" }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/company/bazarnear/"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
