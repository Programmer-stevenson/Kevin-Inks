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
  const response = await fetch(
    `${getWordPressBaseUrl()}/wp-json/kevin-inks/v1/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        website,
      }),
    },
  )

  let data: Partial<SubscribeResult> = {}

  try {
    data = (await response.json()) as Partial<SubscribeResult>
  } catch {
    // Keep a useful fallback if WordPress returns a non-JSON error page.
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
