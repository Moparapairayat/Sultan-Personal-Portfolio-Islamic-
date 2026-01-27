"use server"

interface CreateChargeResponse {
  success: boolean
  message?: string
  redirect_url?: string
  error?: string
}

export async function createPiprapayCharge(
  amount: number,
  currency = "BDT", // Assuming BDT as default currency for Bangladeshi gateways
  customerName: string,
  customerEmail: string,
  orderId: string, // Unique identifier for the transaction
  productDescription = "Donation/Service Payment",
): Promise<CreateChargeResponse> {
  const PIPRAPAY_API_KEY = process.env.PIPRAPAY_API_KEY
  const CREATE_CHARGE_URL = "https://waasiflix.uk/api/create-charge"

  if (!PIPRAPAY_API_KEY) {
    console.error("PIPRAPAY_API_KEY is not set in environment variables.")
    return { success: false, error: "Server configuration error: API key missing." }
  }

  try {
    const response = await fetch(CREATE_CHARGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PIPRAPAY_API_KEY}`, // Assuming Bearer token authentication
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        customer_name: customerName,
        customer_email: customerEmail,
        order_id: orderId,
        product_description: productDescription,
        // Add other parameters as required by Piprapay API, e.g., callback URLs
        callback_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/payment-success`, // Example success URL
        cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/payment-cancel`, // Example cancel URL
      }),
    })

    const data = await response.json()

    if (response.ok) {
      // Assuming the API returns a redirect_url on success
      return { success: true, redirect_url: data.redirect_url, message: "Payment initiated successfully." }
    } else {
      console.error("Piprapay API error:", data)
      return { success: false, error: data.message || "Failed to create charge with Piprapay." }
    }
  } catch (error) {
    console.error("Error initiating Piprapay charge:", error)
    return { success: false, error: "Network error or unexpected issue." }
  }
}

// Placeholder for verify payment endpoint usage
export async function verifyPiprapayPayment(transactionId: string): Promise<any> {
  const PIPRAPAY_API_KEY = process.env.PIPRAPAY_API_KEY
  const VERIFY_PAYMENT_URL = "https://waasiflix.uk/api/verify-payments"

  if (!PIPRAPAY_API_KEY) {
    console.error("PIPRAPAY_API_KEY is not set in environment variables.")
    return { success: false, error: "Server configuration error: API key missing." }
  }

  try {
    const response = await fetch(`${VERIFY_PAYMENT_URL}?transaction_id=${transactionId}`, {
      method: "GET", // Assuming GET for verification based on common patterns
      headers: {
        Authorization: `Bearer ${PIPRAPAY_API_KEY}`,
      },
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, data: data, message: "Payment verification successful." }
    } else {
      console.error("Piprapay verification API error:", data)
      return { success: false, error: data.message || "Failed to verify payment with Piprapay." }
    }
  } catch (error) {
    console.error("Error verifying Piprapay payment:", error)
    return { success: false, error: "Network error or unexpected issue during verification." }
  }
}
