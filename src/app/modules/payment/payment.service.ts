import { PAYMENTSTATUS } from "./payment.constant";
import { paymentModel } from "./payment.model";
import { verifyPay } from "./payment.util";

// ! for verifying payment
const verifyPayment = async (transactionId: string) => {
  const verifyResult = await verifyPay(transactionId);

  if (verifyResult && verifyResult?.pay_status === "Successful") {
    await paymentModel.findOneAndUpdate(
      { transactionId: transactionId },
      {
        paymentStatus: PAYMENTSTATUS.Completed,
      },
      { new: true }
    );
  }

  return verifyResult;
};

//
export const paymentServices = {
  verifyPayment,
};
