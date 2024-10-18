import type { Schema } from "@repo/backend/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

// ListOptions 타입 정의
// export interface ListOptions<T> {
//   filter?: Partial<T>; // 특정 필드를 기반으로 필터링
//   limit?: number; // 가져올 아이템의 최대 개수
//   nextToken?: string; // 페이징을 위한 토큰
//   sort?: {
//     field: keyof T; // 정렬할 필드
//     direction: "asc" | "desc"; // 정렬 방향
//   };
// }

// 모델 타입 정의
type Reservation = Schema["Reservation"]["type"];
type User = Schema["User"]["type"];
type Resource = Schema["Resource"]["type"];

// 클라이언트 생성
const client = generateClient<Schema>();

// Reservation 관련 함수들
export const createReservation = async (reservationData: Reservation) => {
  return await client.models.Reservation.create(reservationData);
};

export const getReservation = async (id: string) => {
  return await client.models.Reservation.get({ id });
};

export const searchReservations = async () => {
  return true;
};

export const updateReservation = async (reservationData: Reservation) => {
  return await client.models.Reservation.update(reservationData, {
    authMode: "lambda",
  });
};

// User 관련 함수들
export const createUser = async (userData: User) => {
  return await client.models.User.create(userData, {
    authMode: "lambda",
  });
};

export const getUser = async (id: string) => {
  return await client.models.User.get({ id });
};

export const searchUsers = async () => {
  // return await client.models.User.list(config);
  return true;
};

export const updateUser = async (userData: User) => {
  return await client.models.User.update(userData, {
    authMode: "lambda",
  });
};

// Resource 관련 함수들
export const createResource = async (resourceData: Resource) => {
  return await client.models.Resource.create(resourceData, {
    authMode: "lambda",
  });
};

export const getResource = async (id: string) => {
  return await client.models.Resource.get(
    { id },
    {
      authMode: "lambda",
    },
  );
};

export const searchResources = async () => {
  // return await client.models.Resource.list(config);
  return true;
};

export const updateResource = async (resourceData: Resource) => {
  return await client.models.Resource.update(resourceData, {
    authMode: "lambda",
  });
};

export const getReservationListByResource = async (resourceId: string) => {
  return await client.models.Reservation.listByResource(
    { resourceId },
    {
      sortDirection: "DESC",
    },
  );
};
