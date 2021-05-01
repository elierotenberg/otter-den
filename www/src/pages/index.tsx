import { Alert } from "@chakra-ui/alert";
import { Heading, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { FunctionComponent } from "react";
import { useQuery } from "react-query";

import { useApi } from "../contexts/ApiContext";
import { match } from "../lib/Query";

const HomePage: FunctionComponent = () => {
  const api = useApi();
  const info = useQuery([`getInfo`], () => api.infoGet());
  return (
    <Flex minH="100vh" flexDirection="column" alignItems="center">
      <Heading mt={24} mb={8}>
        Hello otters!
      </Heading>
      <Text fontSize="2xl" mb={6}>
        🦦🦦🦦🦦🦦🦦
      </Text>
      {match(info)({
        loading: () => <Spinner />,
        error: (error) => <Alert status="error">{JSON.stringify(error)}</Alert>,
        success: (info) => (
          <Text>Server is up since {info.upSince.toString()}</Text>
        ),
      })}
    </Flex>
  );
};

export default HomePage;
