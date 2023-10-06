import { ApplicationFailure, Context } from "@temporalio/activity";

export async function withdraw(
  accountId: string,
  amount: number
): Promise<void> {
  const { log } = Context.current();

  // call a hypothetical flakey 3rd party api
  if (Math.random() < 0.5) {
    const message = `Unable to withdraw $${amount} from account ${accountId}`;
    log.error(message);
    throw ApplicationFailure.create({ message });
  }

  log.info(`Withdrew $${amount} from account ${accountId}`);
}
