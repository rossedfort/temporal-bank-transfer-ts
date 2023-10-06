import { proxyActivities } from "@temporalio/workflow";
import { ApplicationFailure } from "@temporalio/workflow";

import * as activities from "./activities";

const { deposit, withdraw } = proxyActivities<typeof activities>({
  startToCloseTimeout: "5 seconds",
});

export async function transfer(
  from: string,
  to: string,
  amount: number
): Promise<string> {
  try {
    await withdraw(from, amount);
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`;
    throw ApplicationFailure.create({ message });
  }

  try {
    await deposit(to, amount);
  } catch (error) {
    // TODO: deposit money back into source account
    const message = error instanceof Error ? error.message : `${error}`;
    throw ApplicationFailure.create({ message });
  }

  return `Transferred $${amount} from account ${from} to account ${to}`;
}
