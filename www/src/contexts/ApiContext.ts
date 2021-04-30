import { DefaultApi } from "otter-den-api-client";
import { createContext, useContext } from "react";

export const ApiContext = createContext<DefaultApi | null>(null);

export const useApi = (): DefaultApi => {
  const ctx = useContext(ApiContext);

  if (!ctx) {
    throw new TypeError(`no ApiContext`);
  }

  return ctx;
};
