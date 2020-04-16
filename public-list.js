import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event) {
  console.log("Public List");

  const params = {
    TableName: process.env.tableName,
  };

  const onScan = (err) => {
    if (err) {
      console.error(
        "Unable to scan the table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    }
  };

  try {
    const result = await dynamoDbLib.call("scan", [params, onScan]);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
