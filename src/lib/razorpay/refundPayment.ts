import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export interface RefundPaymentParams {
  paymentId: string;
  amount?: number; // optional, in paise. If not provided, full refund.
  notes?: Record<string, string>;
}

export async function createRazorpayRefund({ paymentId, amount, notes }: RefundPaymentParams) {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_SECRET is not defined');
  }

  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount,
      notes,
    });

    return refund;
  } catch (error) {
    console.error('Razorpay Refund Creation Error:', error);
    throw new Error('Failed to create Razorpay refund');
  }
}
