export const PHONE_WA = '542494575588';
export const PHONE_WA_ADMIN = '542494069605';
export const CONTACT_EMAIL = 'inmobiliariarodriguez@yahoo.com.ar';
export const CONTACT_ADDRESS = 'Belgrano 319, Tandil';
export const INSTAGRAM_HANDLE = 'inmobiliaria.rodriguez.tandil';
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export function waLink(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${PHONE_WA}${text}`;
}
