export type SubscribeResult = {
  success: boolean
  message: string
  status?: 'subscribed' | 'unconfirmed' | 'existing'
}

function getWordPressBaseUrl() {
  const raw = import.meta.env.VITE_WORDPRESS_URL as string | undefined

  if (!raw) {
    throw new Error('VITE_WORDPRESS_URL is not configured.')
  }

  return raw.replace(/\/$/, '')
}

export async function subscribeEmail(
  email: string,
  website = '',
): Promise<SubscribeResult> {
  const body = new URLSearchParams({
    email,
    website,
  })

  let response: Response

  try {
    response = await fetch(
      `${getWordPressBaseUrl()}/wp-json/kevin-inks/v1/subscribe`,
      {
        method: 'POST',
        // Deliberately do not set Content-Type manually.
        // URLSearchParams makes this a standard form-encoded request and avoids
        // the JSON CORS preflight that some WordPress.com staging sites reject.
        body,
      },
    )
  } catch {
    throw new Error(
      'Could not reach the email service. Please try again in a moment.',
    )
  }

  let data: Partial<SubscribeResult> = {}

  try {
    data = (await response.json()) as Partial<SubscribeResult>
  } catch {
    // WordPress can occasionally return an HTML error page. Keep a useful
    // frontend fallback instead of exposing raw markup to the visitor.
  }

  if (!response.ok) {
    throw new Error(
      data.message || 'Unable to join the email list right now. Please try again.',
    )
  }

  return {
    success: data.success ?? true,
    message: data.message || 'You’re on the list.',
    status: data.status,
  }
}