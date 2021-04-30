import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { FunctionComponent, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultApi, Configuration } from "otter-den-api-client";

import { getEnv } from "../lib/env";
import { ApiContext } from "../contexts/ApiContext";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const { NEXT_PUBLIC_API_BASE_PATH } = useMemo(() => getEnv(), []);
  const apiClient = useMemo(
    () =>
      new DefaultApi(
        new Configuration({ basePath: NEXT_PUBLIC_API_BASE_PATH }),
      ),
    [NEXT_PUBLIC_API_BASE_PATH],
  );

  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <ApiContext.Provider value={apiClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </ApiContext.Provider>
  );
};

export default App;
