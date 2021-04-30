type Env = {
  readonly NEXT_PUBLIC_API_BASE_PATH: string;
};

export const getEnv = (): Env => {
  const NEXT_PUBLIC_API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH;
  if (typeof NEXT_PUBLIC_API_BASE_PATH !== `string`) {
    throw new TypeError(`NEXT_PUBLIC_API_BASE_PATH is unset`);
  }
  return { NEXT_PUBLIC_API_BASE_PATH };
};
