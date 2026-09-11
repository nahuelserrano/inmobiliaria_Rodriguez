'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { sendContact } from '@/lib/api/contact';

type Status = { type: 'success' | 'error'; text: string } | null;

const inputClass =
  'w-full border border-line bg-white px-4 py-[0.85rem] text-navy placeholder:text-[#9aa5b1] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand';

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
    <div className="flex h-full flex-col bg-mist p-8 max-[800px]:p-6">
      <h2 className="mb-5 text-2xl text-navy">Dejanos tu mensaje</h2>
      <form onSubmit={handleSubmit} className="grid flex-1 gap-[0.85rem]" noValidate={false}>
        <label className="block">
          <span className="sr-only">Nombre y apellido</span>
          <input name="name" type="text" placeholder="Nombre y apellido" required minLength={2} maxLength={100} autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="sr-only">Teléfono</span>
          <input name="phone" type="tel" placeholder="Teléfono" required minLength={6} maxLength={20} autoComplete="tel" className={inputClass} />
        </label>
        <label className="block">
          <span className="sr-only">Mensaje</span>
          <textarea name="message" placeholder="¿En qué podemos ayudarte?" required minLength={10} maxLength={2000} rows={5} className={`${inputClass} min-h-[130px] resize-y`} />
        </label>
        {status && (
          <p
            role={status.type === 'error' ? 'alert' : 'status'}
            className={`rounded-sm px-4 py-[0.8rem] text-[0.95rem] ${status.type === 'error' ? 'bg-[#fdecea] text-[#9c2b1f]' : 'bg-[#e6f4ea] text-[#1a5c2e]'}`}
          >
            {status.text}
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="mt-auto cursor-pointer bg-navy p-4 font-bold text-white transition-colors duration-200 hover:bg-navy-soft disabled:cursor-wait disabled:opacity-70 motion-reduce:transition-none"
        >
          {sending ? 'Enviando…' : 'Enviar consulta'}
        </button>
      </form>
    </div>
  );
}
