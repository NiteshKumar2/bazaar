import React from 'react'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilterSection from '@/components/mainpage/FilterSection';
import MainCard from '@/components/mainpage/MainCard';
import LandingTypeshow from '@/components/homepage/LandingTypeshow';
import CarouselSection from '@/components/mainpage/CarouselSection';

const products = () => {
    return (
        <>
            <FilterSection />
            <CarouselSection/>
            <MainCard/>
            <LandingTypeshow/>
            
        </>
        
    )
}

export default products
