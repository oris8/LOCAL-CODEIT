import { defineFunction } from "@aws-amplify/backend";

export const reservationConflictHandler = defineFunction({
  name: "reservationConflictHandler",
  entry: "./handler.ts",
});
