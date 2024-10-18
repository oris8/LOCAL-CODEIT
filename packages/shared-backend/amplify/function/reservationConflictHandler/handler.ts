// import type { Schema } from "../resource";

// export const handler: Schema["echo"]["functionHandler"] = async (
//   event,
//   context,
// ) => {
//   const start = performance.now();
//   return {
//     content: `Echoing content: ${event.arguments.content}`,
//     executionDuration: performance.now() - start,
//   };
// };

// 예약 겹침 확인 및 저장하는 AWS Lambda gen2 함수 예시
// import type { Handler } from 'aws-lambda'; 문서랑 동일
// import {
//   DynamoDBClient,
//   QueryCommand,
//   PutItemCommand,
// } from "@aws-sdk/client-dynamodb";

// 필요한 모듈 및 타입을 가져옵니다.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { AppSyncResolverHandler } from "aws-lambda";

// DynamoDB 클라이언트를 초기화합니다.
const dynamoDBClient = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

// 이벤트의 인자 타입을 정의합니다.
interface ReservationArguments {
  resourceId: string;
  startTime: number;
  endTime: number;
}

// Lambda 핸들러를 정의합니다.
export const handler: AppSyncResolverHandler<
  ReservationArguments,
  any
> = async (event) => {
  const { resourceId, startTime, endTime } = event.arguments;

  // DynamoDB에서 해당 자원의 겹치는 예약을 조회
  const queryParams = {
    TableName: "ReservationsTable",
    KeyConditionExpression:
      "resourceId = :resourceId AND startTime <= :endTime",
    FilterExpression: "endTime >= :startTime",
    ExpressionAttributeValues: {
      ":resourceId": resourceId,
      ":startTime": startTime,
      ":endTime": endTime,
    },
  };

  try {
    const data = await dynamoDB.send(new QueryCommand(queryParams));

    // 겹치는 예약이 있으면 에러 반환
    if (data.Items && data.Items.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "예약 시간이 겹칩니다." }),
      };
    }

    // 예약이 겹치지 않으면 예약 정보 저장
    const putParams = {
      TableName: "ReservationsTable",
      Item: {
        resourceId,
        startTime,
        endTime,
      },
    };

    await dynamoDB.send(new PutCommand(putParams));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "예약 성공" }),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "서버 에러", error: error.message }),
    };
  }
};
