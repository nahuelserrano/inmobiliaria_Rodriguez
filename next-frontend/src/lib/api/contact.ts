const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface ContactPayload {
  name: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => null)) as ContactResponse & {
    message?: string | string[];
  } | null;
  if (!response.ok) {
    const message = Array.isArray(data?.message)
      ? data.message.join(' ')
      : (data?.message ?? 'No pudimos enviar tu consulta. Revisá los datos e intentá nuevamente.');
    throw new Error(message);
  }
  return {
    success: data?.success ?? true,
    message: Array.isArray(data?.message) ? data.message.join(' ') : (data?.message ?? 'Consulta enviada correctamente.'),
  };
}
