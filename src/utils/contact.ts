export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function submitContact(
  payload: ContactPayload
): Promise<{ ok: boolean; status: number }> {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
  if (!endpoint) {
    return { ok: false, status: 0 };
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok, status: res.status };
}

export function isFormspreeConfigured(): boolean {
  return Boolean(import.meta.env.VITE_FORMSPREE_ENDPOINT);
}
