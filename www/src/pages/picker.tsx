import { Heading, Flex, Text, Container } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  Button,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { DenLightLightIdPostRequest } from "otter-den-api-client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useMutation } from "react-query";

import { useApi } from "../contexts/ApiContext";

const PickerPage: FunctionComponent = () => {
  const api = useApi();
  const {
    isOpen: isAlertOpen,
    onClose: onCloseAlert,
    onOpen: onOpenAlert,
  } = useDisclosure();

  const [color, setColor] = useState<undefined | string>(undefined);

  const handleChange = (color: ColorResult): void => setColor(color.hex);
  const postLightState = useMutation((params: DenLightLightIdPostRequest) =>
    api.denLightLightIdPost(params),
  );

  useEffect(onOpenAlert, [postLightState.status]);

  return (
    <Flex minH="100vh" flexDirection="column" alignItems="center">
      <Container position="fixed">
        {postLightState.isSuccess && isAlertOpen && (
          <Alert status="success">
            <AlertIcon />
            Update sent to Remembrall
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onCloseAlert}
            />
          </Alert>
        )}
        {postLightState.isError && isAlertOpen && (
          <Alert status="error">
            <AlertIcon />
            {`Update failed ${JSON.stringify(postLightState.error)}`}
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onCloseAlert}
            />
          </Alert>
        )}
      </Container>
      <Heading mt={24} mb={8}>
        Choose a color!
      </Heading>
      <CirclePicker color={color} onChangeComplete={handleChange} />
      <br />
      <Button
        isDisabled={typeof color === `undefined`}
        isLoading={postLightState.isLoading}
        onClick={() =>
          color &&
          postLightState.mutate({
            lightId: `remembrall`,
            inlineObject: { color },
          })
        }
      >
        Update remembrall
      </Button>
      <br />

      <Text fontSize="2xl" mb={6}>
        🦦🦦🦦🦦🦦🦦
      </Text>
    </Flex>
  );
};

export default PickerPage;
