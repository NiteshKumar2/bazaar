import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function LandingTypeshow() {
  return (
    <div
      style={{
        padding: "0 16px", // Default padding
        paddingTop: "24px",
        paddingBottom: "24px",
        margin: "0 auto", // Center alignment
        marginTop: "30px",
        marginBottom: "30px",
        maxWidth: "800px", // Max width for content
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "23px", // Margin below heading
          textAlign: "center", // Centered heading
        }}
      >
        Explore options near you
      </Typography>

      <Accordion
        sx={{
          marginBottom: { xs: "12px", sm: "16px" }, // Margin below each accordion
          padding: { xs: "8px", sm: "12px" }, // Padding inside each accordion
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Popular dress type near me</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Floral Print Dresses Casual Maxi Dresses Boho Chic Outfits Elegant
            Evening Gowns Classic Midi Dresses Street Style Fashion Comfortable
            Loungewear Party Cocktail Dresses Vintage Retro Dresses Sporty
            Athleisure Wear
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          marginBottom: { xs: "12px", sm: "16px" }, // Margin below each accordion
          padding: { xs: "8px", sm: "12px" }, // Padding inside each accordion
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Popular shop near me</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Fashion Boutique Trendy Threads Style Hub Urban Outfitters Chic
            Avenue Designer Haven Luxury Attire Vintage Vault Boutique Bliss
            Urban Chic
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          marginBottom: { xs: "12px", sm: "16px" }, // Margin below each accordion
          padding: { xs: "8px", sm: "12px" }, // Padding inside each accordion
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Cities we show</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Jind Delhi Chandigarh Gurugram Faridabad Noida Ghaziabad Jaipur
            Ambala Ludhiana Meerut
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
