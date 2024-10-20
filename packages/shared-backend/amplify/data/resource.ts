import {
  a,
  defineData,
  // defineFunction,
  type ClientSchema,
} from "@aws-amplify/backend";
import { reservationConflictHandler } from "../function/reservationConflictHandler/resource";

const schema = a.schema({
  // User Table
  User: a
    .model({
      id: a.id().required(),
      username: a.string().required(),
      email: a.string().required(),
      role: a.enum(["ADMIN", "MEMBER"]),
      team: a.string(),
      profileImage: a.url(),
    })
    .authorization((allow) => [allow.guest()])
    .secondaryIndexes((index) => [
      index("role"), // role에 따른 멤버들 리스트 보여줌 - 관리자 페이지
      // TODO: team으로 1차 정렬하고, username으로 2차 정렬
      // TODO: 최신순, 오래된순, 가나다순 정렬
    ]),

  // Resource Table
  Resource: a
    .model({
      // resourceId: a.id().required(),
      resourceType: a.enum(["Room", "Seat", "Equipment"]),
      resourceSubtype: a.string(),
      name: a.string().required(),
      description: a.string(),
      // image: a.url(),
      reservations: a.hasMany("Reservation", "resourceId"),
    })
    // .identifier(["resourceId"])
    .secondaryIndexes((index) => [index("resourceType")])
    // ex) resourceType 기준으로 쿼리
    // const { data, errors } = await client.models.Resource.listResourceByResourceType({
    //   resourceType: 'Seat',
    // });

    .authorization((allow) => [allow.guest()]),

  // Reservation Table
  ReservationStatus: a.enum(["CONFIRMED", "CANCELED", "PASSED"]),

  Reservation: a
    .model({
      resourceId: a.id().required(), // 연결된 리소스 id
      resource: a.belongsTo("Resource", "resourceId"), // Resource 컬렉션(테이블)에서 [Reservation의 resourceId]를 사용해서 리소스를 연결
      date: a.date().required(), // DATE,SO 8601 확장 날짜 문자열 (형식: YYYY-MM-DD)
      startTime: a.time().required(), // TIME, ISO 8601 확장 시간 문자열 (형식: hh:mm:ss.sss)
      endTime: a.time().required(), // TIME, ISO 8601 확장 시간 문자열 (형식: hh:mm:ss.sss)
      status: a.ref("ReservationStatus").required(), // 예약 상태
      participants: a.string().array(), // 참여자 목록, 유저 id를 배열로 저장
    })
    .secondaryIndexes((index) => [
      //  ** 리소스 id 별 예약 데이터 index **
      //  await client.models.Reservation.listByResource({
      //   resourceId: 'RESOURCE_ID',
      //   date: {
      //     eq: "2024-10-15",
      //   }
      index("resourceId")
        .sortKeys(["date", "startTime", "status"])
        .queryField("listByResource"),
    ])
    .authorization((allow) => [allow.guest()]),

  reservationConflictHandler: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(reservationConflictHandler))
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // lambdaAuthorizationMode: {
    //   function: defineFunction({
    //     entry: "./custom-authorizer.ts",
    //   }),
    //   timeToLiveInSeconds: 300, // 토큰 유지 시간
    // },
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
