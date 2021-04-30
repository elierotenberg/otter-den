import { UseQueryResult } from "react-query";

import { never } from "./utils";

type MatchWith<Input, Output> = {
  readonly loading: () => Output;
  readonly idle?: () => Output;
  readonly error: (error: unknown) => Output;
  readonly success: (value: Input) => Output;
};

export const match = <Input, Output>(result: UseQueryResult<Input>) => (
  matchWith: MatchWith<Input, Output>,
): Output => {
  if (result.status === `idle`) {
    if (matchWith.idle) {
      return matchWith.idle();
    }
    return matchWith.loading();
  }
  if (result.status === `loading`) {
    return matchWith.loading();
  }
  if (result.status === `error`) {
    return matchWith.error(result.error);
  }
  if (result.status === `success`) {
    return matchWith.success(result.data);
  }
  return never();
};
