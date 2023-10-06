import { Connection, Client } from "@temporalio/client";
import { transfer } from "./workflows";

async function run() {
  const connection = await Connection.connect();

  const client = new Client({
    connection,
  });

  const handle = await client.workflow.start(transfer, {
    args: ["abc-123", "def-456", 100],
    taskQueue: "bank-transfer-tq",
    workflowId: "bank-transfer-wf",
  });

  console.log(`Started workflow ${handle.workflowId}`);

  const result = await handle.result();

  console.log(`Got result ${result}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
