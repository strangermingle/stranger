import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export interface CreateOrderParams {
  amount: number; // in paise
  currency: string;
  receipt: string;
}

export async function createRazorpayOrder({ amount, currency, receipt }: CreateOrderParams) {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_SECRET is not defined');
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    });

    return order;
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    throw new Error('Failed to create Razorpay order');
  }
}
