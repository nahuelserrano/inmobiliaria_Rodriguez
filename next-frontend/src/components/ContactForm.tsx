'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { sendContact } from '@/lib/api/contact';
import styles from './ContactForm.module.css';

type Status = { type: 'success' | 'error'; text: string } | null;

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const data = new FormData(form);

    setSending(true);
    try {
      const result = await sendContact({
        name: String(data.get('name') ?? '').trim(),
        phone: String(data.get('phone') ?? '').trim(),
        message: String(data.get('message') ?? '').trim(),
      });
      setStatus({ type: 'success', text: result.message });
      form.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        text: error instanceof Error ? error.message : 'No pudimos enviar tu consulta. Intentá nuevamente.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Dejanos tu mensaje</h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate={false}>
        <label className={styles.field}>
          <span className={styles.srOnly}>Nombre y apellido</span>
          <input name="name" type="text" placeholder="Nombre y apellido" required minLength={2} maxLength={100} autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.srOnly}>Teléfono</span>
          <input name="phone" type="tel" placeholder="Teléfono" required minLength={6} maxLength={20} autoComplete="tel" />
        </label>
        <label className={styles.field}>
          <span className={styles.srOnly}>Mensaje</span>
          <textarea name="message" placeholder="¿En qué podemos ayudarte?" required minLength={10} maxLength={2000} rows={5} />
        </label>
        {status && (
          <p role={status.type === 'error' ? 'alert' : 'status'} className={`${styles.status} ${status.type === 'error' ? styles.statusError : styles.statusSuccess}`}>
            {status.text}
          </p>
        )}
        <button type="submit" className={styles.submit} disabled={sending}>
          {sending ? 'Enviando…' : 'Enviar consulta'}
        </button>
      </form>
    </div>
  );
}
