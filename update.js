import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      columnistId: event.pathParameters.id,
    },
    UpdateExpression:
      "SET firstName = :firstName, lastName = :lastName, attachment = :attachment, id = :id, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":firstName": data.firstName || null,
      ":lastName": data.lastName || null,
      ":attachment": data.attachment || null,
      ":id": data.id || null,
      ":updatedAt": Date.now(),
    },
    ReturnValues: "ALL_NEW",
  };
  try {
    await dynamoDbLib.call("update", [params]);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
