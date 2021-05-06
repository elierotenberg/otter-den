import { Static } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = addFormats(new Ajv(), [
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
  ajv.validate(Type, input);
}

export function check<T>(input: unknown, Type: T): input is Static<T> {
  try {
    ajv.validate(Type, input);
    return true;
  } catch {
    return false;
  }
}

export const filter = <T>(Type: T) =>
  function (input: unknown): input is Static<T> {
    return check(Type, input);
  };
