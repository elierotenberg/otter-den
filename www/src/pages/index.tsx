import { Heading, Flex, Text } from "@chakra-ui/layout";
import React, { FunctionComponent } from "react";

const HomePage: FunctionComponent = () => {
  return (
    <Flex minH="100vh" flexDirection="column" alignItems="center">
      <Heading mt={24} mb={8}>
        Hello otters!
      </Heading>
      <Text fontSize="2xl">🦦🦦🦦🦦🦦🦦</Text>
    </Flex>
  );
};

export default HomePage;
