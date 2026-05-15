'use client'
import { Box } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Banner } from "../components/Banner";
import { Destaques } from "../components/Destaques";
import { QuoteSection } from "../components/QuoteSection";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <Box minH="100vh" bg="#fff" color="black" fontFamily="sans-serif">
      <Header />
      <Banner />
      <Destaques />
      <QuoteSection />
      <Footer />
    </Box>
  );
}