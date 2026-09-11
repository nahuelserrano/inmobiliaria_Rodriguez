export const PHONE_WA = '542494575588';
export const CONTACT_EMAIL = 'inmobiliariarodriguez@yahoo.com.ar';
export const CONTACT_ADDRESS = 'Belgrano 319, Tandil';

export function waLink(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${PHONE_WA}${text}`;
}
