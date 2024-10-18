import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import type {
  AppSyncAuthorizerEvent,
  AppSyncAuthorizerResult,
} from "aws-lambda";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * AWS Cognito에서 발급한 JWT 토큰을 검증하고 사용자 정보를 추출하여
 * 특정 GraphQL 요청에 대한 권한 부여를 수행하는 Lambda 함수입니다.
 */

// TODO: region 환경 변수로 분리
const dynamoDB = new DynamoDBClient({ region: "ap-northeast-2" });

// 어드민 권한이 필요한 GraphQL 작업 이름들
const ADMIN_ALLOWED_OPERATIONS = [
  // "createUser",
  "createResource",
  "updateResource",
  "deleteResource",
];

// 참가자 권한이 필요한 GraphQL 작업 이름들
const PARTICIPANTS_ALLOWED_OPERATIONS = [
  "updateReservation",
  "deleteReservation",
];

// 인증 실패와 성공에 대한 기본 응답 객체
const AUTHORIZER_RESULT_FAILURE: AppSyncAuthorizerResult = {
  isAuthorized: false,
};
const AUTHORIZER_RESULT_SUCCESS: AppSyncAuthorizerResult = {
  isAuthorized: true,
};

/**
 * AWS AppSync Lambda 인증자 함수
 *
 * @param event - AppSync에서 전달된 인증 이벤트
 * @returns 인증 결과를 나타내는 AppSyncAuthorizerResult 객체
 */
export const handler = async (
  event: AppSyncAuthorizerEvent,
): Promise<AppSyncAuthorizerResult> => {
  // 이벤트 로깅 (선택 사항)
  console.log(`이벤트 ㅡㅡ 아오`);

  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { authorizationToken, requestContext } = event;

  // // 1. 토큰 검증 및 사용자 정보 추출
  // // 'sub' 클레임은 사용자 ID를 나타냅니다.
  // const userId = (await decodeTokenAndGetData(authorizationToken, "sub")) || "";
  // const userRole =
  //   (await decodeTokenAndGetData(authorizationToken, "role")) || "";

  // if (!userId) {
  //   // 사용자 ID가 없으면 인증 실패
  //   return AUTHORIZER_RESULT_FAILURE;
  // }

  // // 2. 요청된 GraphQL 작업(operationName)에 따라 권한 부여 로직 적용
  // const operationName = requestContext.operationName || "";

  // // 2-1. 어드민 권한이 필요한 경우
  // if (ADMIN_ALLOWED_OPERATIONS.includes(operationName)) {
  //   if (userRole === "member") {
  //     // 사용자 역할이 'member'이면 인증 실패
  //     return AUTHORIZER_RESULT_FAILURE;
  //   }
  // }

  // // 2-2. 예약 참여자 권한이 필요한 경우
  // if (PARTICIPANTS_ALLOWED_OPERATIONS.includes(operationName)) {
  //   // API 호출 시 input에 포함된 reservationId를 추출
  //   const reservationId = requestContext.variables?.input?.id;

  //   if (!reservationId) {
  //     // 예약 ID가 없으면 인증 실패
  //     return AUTHORIZER_RESULT_FAILURE;
  //   }

  //   // DynamoDB에서 해당 예약 정보 조회
  //   const params = {
  //     TableName: "ReservationsTable",
  //     Key: {
  //       id: { S: reservationId },
  //     },
  //   };

  //   try {
  //     const data = await dynamoDB.send(new GetItemCommand(params));
  //     const reservation = data.Item;

  //     if (!reservation) {
  //       // 예약 정보가 없으면 인증 실패
  //       return AUTHORIZER_RESULT_FAILURE;
  //     }

  //     // participants 필드를 가져옴 (문자열 세트)
  //     const participants = reservation.participants?.SS || [];

  //     // 4. 사용자 ID가 participants에 포함되어 있는지 확인
  //     if (!participants.includes(userId as string)) {
  //       // 포함되어 있지 않으면 인증 실패
  //       return AUTHORIZER_RESULT_FAILURE;
  //     }
  //   } catch (error) {
  //     // DynamoDB 오류 처리
  //     console.error("DynamoDB error:", error);
  //     return AUTHORIZER_RESULT_FAILURE;
  //   }
  // }

  // 5. 인증 성공 응답 반환
  return AUTHORIZER_RESULT_SUCCESS;
};

// TODO: 토큰 인증 검사 강화
/**
 * JWT 토큰을 디코딩하고 특정 필드를 추출합니다.
 *
 * @param token - 디코딩할 JWT 토큰
 * @param field - 디코딩된 토큰에서 추출할 필드 (예: 'sub', 'role')
 * @returns 지정된 필드의 값 또는 null 반환
 */
function decodeTokenAndGetData(
  token: string,
  field?: string,
): string | JwtPayload | null {
  try {
    // 토큰을 디코딩하여 페이로드를 가져옵니다.
    const decodedToken = jwt.decode(token) as JwtPayload;

    if (!decodedToken) {
      // 디코딩 실패 시 null 반환
      return null;
    }

    // 특정 필드가 지정된 경우 해당 필드의 값을 반환
    return field ? (decodedToken[field] ?? null) : decodedToken;
  } catch (error) {
    // 디코딩 실패 시 null 반환
    console.error("토큰 디코딩 실패:", error);
    return null;
  }
}
