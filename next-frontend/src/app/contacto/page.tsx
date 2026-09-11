import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'Contacto' };

function MapPinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.itemIcon}>
      <path
        d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.itemIcon}>
      <path
        d="M5.4 3.5 8 2.8c.7-.2 1.4.2 1.7.8l1.2 2.9c.2.5.1 1-.3 1.4L9 9.5a15 15 0 0 0 5.5 5.5l1.6-1.6c.4-.4.9-.5 1.4-.3l2.9 1.2c.6.3 1 1 .8 1.7l-.7 2.6c-.2.7-.8 1.2-1.5 1.2C10.2 19.8 4.2 13.8 4.2 5c0-.7.5-1.3 1.2-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.itemIcon}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m4.5 7.5 7.5 5.5 7.5-5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className={`site-container ${styles.layout}`}>
      <div className={styles.info}>
        <p className={styles.eyebrow}>Estamos para ayudarte</p>
        <h1 className={styles.title}>Hablemos de tu próximo lugar.</h1>
        <p className={styles.lead}>
          Visitá nuestra oficina o escribinos. Te respondemos con la atención que merecés.
        </p>
        <ul className={styles.contactList}>
          <li className={styles.contactItem}>
            <MapPinIcon />
            <div>
              <p className={styles.contactTitle}>Oficina</p>
              <p>Belgrano 319, Tandil</p>
              <p>Lunes a Viernes de 9 a 15 h</p>
                <p>Sábados de 9:30 a 12:30 h</p>
            </div>
          </li>
          <li className={styles.contactItem}>
            <PhoneIcon />
            <a href="tel:+542494575588" className={styles.contactLink}>2494 57-5588</a>
          </li>
          <li className={styles.contactItem}>
            <MailIcon />
            <a href="mailto:inmobiliariarodriguez@yahoo.com.ar" className={styles.contactLink}>inmobiliariarodriguez@yahoo.com.ar</a>
          </li>
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}
