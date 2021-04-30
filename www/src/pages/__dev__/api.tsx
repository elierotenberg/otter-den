import { Button } from "@chakra-ui/button";
import { Code, Container, Flex } from "@chakra-ui/layout";
import { DenLightLightIdPostRequest } from "otter-den-api-client";
import React, { FunctionComponent } from "react";
import { useMutation } from "react-query";

import { useApi } from "../../contexts/ApiContext";

const TestApiPage: FunctionComponent = () => {
  const api = useApi();
  const postLightState = useMutation((params: DenLightLightIdPostRequest) =>
    api.denLightLightIdPost(params),
  );

  return (
    <Container>
      <Flex flexDirection="column" alignItems="stretch">
        <Flex justifyContent="space-between">
          <Button
            onClick={() =>
              postLightState.mutate({
                lightId: `test id`,
                inlineObject: { color: `#abcdef` },
              })
            }
          >
            postLightState
          </Button>
          <Code>{JSON.stringify(postLightState.data, null, 2)}</Code>
        </Flex>
      </Flex>
    </Container>
  );
};

export default TestApiPage;
