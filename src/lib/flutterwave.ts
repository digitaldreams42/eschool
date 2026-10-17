import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY!,
  process.env.FLW_SECRET_KEY!
);

export default flw;

// Flutterwave payment types for Africa
export const FLW_PAYMENT_TYPES = {
  MOBILE_MONEY: 'mobile_money',
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
  USSD: 'ussd',
} as const;

// African mobile money providers
export const FLW_MOBILE_MONEY_PROVIDERS = {
  MTN: 'mtn',
  AIRTEL: 'airtel',
  VODAFONE: 'vodafone',
  TIGO: 'tigo',
  M_PESA: 'mpesa',
} as const;

// Create a payment link for group subscription
export async function createPaymentLink({
  amount,
  currency,
  customerEmail,
  customerName,
  redirectUrl,
  groupTitle,
}: {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  redirectUrl: string;
  groupTitle: string;
}) {
  const payload = {
    tx_ref: `eschool-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    amount,
    currency,
    redirect_url: redirectUrl,
    customer: {
      email: customerEmail,
      name: customerName,
    },
    customizations: {
      title: `eSchool — ${groupTitle}`,
      description: `Subscription to ${groupTitle}`,
      logo: 'https://eschool.co.zm/logo.png',
    },
  };

  const response = await flw.Payment.create(payload);
  return response;
}

// Verify a payment
export async function verifyPayment(transactionId: string) {
  const response = await flw.Transaction.verify({ id: transactionId });
  return response;
}

// Create a subscription plan
export async function createPlan({
  name,
  amount,
  interval,
  currency,
}: {
  name: string;
  amount: number;
  interval: 'monthly' | 'yearly';
  currency: string;
}) {
  const response = await flw.Plan.create({
    name,
    amount,
    interval,
    currency,
  });
  return response;
}

// Create a subscriber
export async function createSubscriber({
  planId,
  customerEmail,
}: {
  planId: string;
  customerEmail: string;
}) {
  const response = await flw.Subscriptions.create({
    plan: planId,
    customer: customerEmail,
  });
  return response;
}
