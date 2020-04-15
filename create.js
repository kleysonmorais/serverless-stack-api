import { v4 as uuidv4 } from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      columnistId: uuidv4(),
      firstName: data.firstName,
      lastName: data.lastName,
      attachment: data.attachment,
      id: data.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call("put", [params]);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
