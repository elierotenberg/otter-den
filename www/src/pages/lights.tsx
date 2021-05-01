import { Heading, Flex, Text, HStack, Container } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Switch,
  useToast,
} from "@chakra-ui/react";
import {
  DenLightLightIdDeleteRequest,
  DenLightLightIdPostRequest,
} from "otter-den-api-client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { CirclePicker, HSLColor } from "react-color";
import { useMutation, useQuery } from "react-query";

import { useApi } from "../contexts/ApiContext";

type State = {
  readonly lightId: null | string;
  readonly hsl: HSLColor;
  readonly pulse: boolean;
};

const LightsPage: FunctionComponent = () => {
  const api = useApi();
  const [state, setState] = useState<State>({
    lightId: null,
    hsl: {
      h: 0,
      s: 0,
      l: 0,
    },
    pulse: false,
  });

  const lights = useQuery([`denLightGet`], () => api.denLightGet());

  useEffect(
    () =>
      setState((state) => {
        if (lights.status !== `success`) {
          return {
            ...state,
            lightId: null,
          };
        }
        if (
          !state.lightId ||
          lights.data.every((light) => light.lightId !== state.lightId)
        ) {
          return {
            ...state,
            lightId: lights.data[0]?.lightId ?? null,
          };
        }
        return state;
      }),
    [lights.status, lights?.data],
  );

  const postLightState = useMutation(
    (params: DenLightLightIdPostRequest) => api.denLightLightIdPost(params),
    {
      onSuccess: () => {
        toast({ status: `success`, title: `Remembrall updated!` });
      },
      onError: () => {
        toast({ status: `error`, title: `Remembrall update failed.` });
      },
    },
  );

  const deleteLightState = useMutation(
    (params: DenLightLightIdDeleteRequest) => api.denLightLightIdDelete(params),
    {
      onSuccess: () => {
        toast({ status: `success`, title: `Remembrall updated!` });
      },
      onError: () => {
        toast({ status: `error`, title: `Remembrall update failed.` });
      },
    },
  );

  const toast = useToast({ position: `bottom` });

  const isLoading =
    postLightState.isLoading ||
    deleteLightState.isLoading ||
    lights.status !== `success`;

  return (
    <Container>
      <Flex
        minH="100vh"
        flexDirection="column"
        alignItems="center"
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (state.lightId) {
            postLightState.mutate({
              lightId: state.lightId,
              inlineObject: {
                hsl: state.hsl,
                period: state.pulse ? 3000 : undefined,
              },
            });
          }
        }}
      >
        <Heading mt={4} mb={8}>
          Choose a color!
        </Heading>

        <Flex
          alignItems="center"
          justifyContent="center"
          sx={{
            "& > .circle-picker > span > div": {
              m: `10px !important`,
            },
          }}
        >
          <CirclePicker
            color={state.hsl}
            circleSize={56}
            onChangeComplete={(result) =>
              setState((state) => ({ ...state, hsl: result.hsl }))
            }
          />
        </Flex>

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={4}
        >
          <FormLabel htmlFor="pulse">Pulse</FormLabel>
          <Switch
            id="pulse"
            isChecked={state.pulse}
            onChange={({ target: { checked: pulse } }) =>
              setState((state) => ({ ...state, pulse }))
            }
          />
        </FormControl>

        <Select
          isDisabled={lights.status !== `success` || lights.data.length === 1}
          value={state.lightId ?? ``}
          onChange={({ target: { value: lightId } }) =>
            setState((state) => ({ ...state, lightId }))
          }
        >
          {lights.status === `success` &&
            lights.data.map(({ lightId, label }) => (
              <option key={lightId} value={lightId}>
                {label}
              </option>
            ))}
        </Select>

        <HStack>
          <Button
            type="button"
            variant="outline"
            my={4}
            isLoading={isLoading}
            onClick={() => deleteLightState.mutate({ lightId: `remembrall` })}
          >
            Turn off
          </Button>
          <Button
            textColor={`hsl(${state.hsl.h}, ${state.hsl.s * 100}%, ${
              state.hsl.l * 100
            }%)`}
            borderColor={`hsl(${state.hsl.h}, ${state.hsl.s * 100}%, ${
              state.hsl.l * 100
            }%)`}
            variant="outline"
            type="submit"
            my={4}
            isLoading={isLoading}
          >
            Update
          </Button>
        </HStack>

        <Text fontSize="2xl" mb={6}>
          🦦🦦🦦🦦🦦🦦
        </Text>
      </Flex>
    </Container>
  );
};

export default LightsPage;
