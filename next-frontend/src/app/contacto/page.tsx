import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = { title: 'Contacto' };

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
              <p className="my-1 text-navy">Belgrano 319, Tandil</p>
              <p className="my-1 text-navy">Lunes a Viernes de 9 a 15 h</p>
              <p className="my-1 text-navy">Sábados de 9:30 a 12:30 h</p>
            </div>
          </li>
          <li className="flex items-start gap-[0.85rem]">
            <Phone size={24} strokeWidth={1.8} aria-hidden className="mt-[0.15rem] shrink-0 text-gold" />
            <a href="tel:+542494575588" className="self-center font-bold text-navy">2494 57-5588</a>
          </li>
          <li className="flex items-start gap-[0.85rem]">
            <Mail size={24} strokeWidth={1.8} aria-hidden className="mt-[0.15rem] shrink-0 text-gold" />
            <a href="mailto:inmobiliariarodriguez@yahoo.com.ar" className="self-center break-all font-bold text-navy">inmobiliariarodriguez@yahoo.com.ar</a>
          </li>
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}
