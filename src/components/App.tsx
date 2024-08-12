import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Recipients } from "./Recipients";
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Container maxW="container.md" py="4">
        <TimescaleLogo />
        <Recipients />
      </Container>
    </ChakraProvider>
  );
};

export default App;
