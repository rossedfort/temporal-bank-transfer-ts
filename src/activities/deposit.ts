import { ApplicationFailure, Context } from "@temporalio/activity";

export async function deposit(
  accountId: string,
  amount: number
): Promise<void> {
  const { log } = Context.current();

  // call a hypothetical flakey 3rd party api
  if (Math.random() < 0.5) {
    const message = `Unable to deposit $${amount} into account ${accountId}`;
    log.error(message);
    throw ApplicationFailure.create({ nonRetryable: false, message });
  }

  log.info(`Deposited $${amount} into account ${accountId}`);
}
