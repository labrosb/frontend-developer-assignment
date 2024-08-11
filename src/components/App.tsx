import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <TimescaleLogo />
    </ChakraProvider>
  );
};

export default App;
