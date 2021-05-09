import { Static } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = addFormats(new Ajv({ strict: true }), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
])
  .addKeyword("kind")
  .addKeyword("modifier");

export function assert<T>(input: unknown, Type: T): asserts input is Static<T> {
  const validate = ajv.compile(Type);
  if (!validate(input)) {
    console.error(validate.errors);
    throw new TypeError("validation error");
  }
}

export function check<T>(input: unknown, Type: T): input is Static<T> {
  return ajv.validate(Type, input);
}

export const filter = <T>(Type: T) =>
  function (input: unknown): input is Static<T> {
    return check(Type, input);
  };
