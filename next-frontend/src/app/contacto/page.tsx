import type { Metadata } from 'next';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import InstagramIcon from '@/components/InstagramIcon';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_WA_ADMIN,
  waLink,
} from '@/constants/contact';

export const metadata: Metadata = { title: 'Contacto' };

const channels = [
  {
    label: 'Alquileres / Ventas',
    value: '2494 57-5588',
    href: waLink(),
    Icon: WhatsAppIcon,
  },
  {
    label: 'Administración',
    value: '2494 06-9605',
    href: `https://wa.me/${PHONE_WA_ADMIN}`,
    Icon: WhatsAppIcon,
  },
  {
    label: 'Instagram',
    value: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    Icon: InstagramIcon,
  },
];

export default function ContactPage() {
  return (
    <div className="container-site grid grid-cols-2 items-stretch gap-12 pb-16 pt-8 max-[800px]:grid-cols-1 max-[800px]:gap-8 max-[800px]:pb-12">
      <div>
        <p className="eyebrow">Estamos para ayudarte</p>
        <h1 className="mt-3 text-[clamp(2.4rem,4.5vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
          Hablemos de tu próximo lugar.
        </h1>
        <p className="mt-6 text-[1.08rem] leading-[1.7] text-ink">
          Visitá nuestra oficina o escribinos. Te respondemos con la atención que merecés.
        </p>
        <ul className="mt-10 grid list-none gap-5 border-t border-line p-0 pt-8 max-[800px]:mt-8 max-[800px]:pt-6">
          <li className="flex items-start gap-[0.85rem]">
            <MapPin size={24} strokeWidth={1.8} aria-hidden className="mt-[0.15rem] shrink-0 text-gold" />
            <div>
              <p className="font-bold text-navy">Oficina</p>
              <p className="my-1 text-navy">{CONTACT_ADDRESS}</p>
              <p className="my-1 text-navy">Lunes a Viernes de 9 a 15 h</p>
              <p className="my-1 text-navy">Sábados de 9:30 a 12:30 h</p>
            </div>
          </li>
          <li className="flex items-start gap-[0.85rem]">
            <Mail size={24} strokeWidth={1.8} aria-hidden className="mt-[0.15rem] shrink-0 text-gold" />
            <a href={`mailto:${CONTACT_EMAIL}`} className="self-center break-all font-bold text-navy">{CONTACT_EMAIL}</a>
          </li>
        </ul>
      </div>

      <div className="flex h-full flex-col bg-mist p-8 max-[800px]:p-6">
        <span aria-hidden className="block h-1 w-12 bg-gold" />
        <h2 className="mt-4 text-2xl font-bold text-navy">Escribinos</h2>
        <ul className="mt-6 grid list-none gap-4 p-0">
          {channels.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-lg bg-white px-4 py-4 shadow-card transition-shadow duration-200 hover:shadow-lift motion-reduce:transition-none"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                  <Icon size={22} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9rem] font-bold text-navy">{label}</span>
                  <span className="block truncate text-[0.95rem] text-ink">{value}</span>
                </span>
                <ArrowRight
                  size={20}
                  aria-hidden
                  className="ml-auto shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
