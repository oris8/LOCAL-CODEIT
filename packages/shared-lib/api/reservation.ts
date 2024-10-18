import type { Schema } from "@repo/backend/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

type Reservation = Schema["Reservation"]["type"];
type User = Schema["User"]["type"];
type Resource = Schema["Resource"]["type"];

const client = generateClient<Schema>();

export const createReservation = async (reservationData) => {
  return await client.models.Reservation.create(reservationData as Reservation);
};

export const getReservation = async (id: string) => {
  return await client.models.Reservation.get({ id });
};

export const searchReservations = async (config) => {
  return await client.models.Reservation.list(config);
};

export const updateReservation = async (reservationData) => {
  return await client.models.Reservation.update(reservationData, {
    authMode: "lambda",
  });
};

// User 관련 함수들
export const createUser = async (userData) => {
  return await client.models.User.create(userData as User, {
    authMode: "lambda",
  });
};

export const getUser = async (id: string) => {
  return await client.models.User.get({ id });
};

export const searchUsers = async (config) => {
  return await client.models.User.list(config);
};

export const updateUser = async (userData) => {
  return await client.models.User.update(userData, {
    authMode: "lambda",
  });
};

// Resource 관련 함수들
export const createResource = async (resourceData) => {
  return await client.models.Resource.create(resourceData as Resource);
};

export const getResource = async (id: string) => {
  return await client.models.Resource.get(
    { id },
    {
      authMode: "lambda",
    },
  );
};

export const searchResources = async (config) => {
  return await client.models.Resource.list(config);
};

export const updateResource = async (resourceData) => {
  return await client.models.Resource.update(resourceData, {
    authMode: "lambda",
  });
};
