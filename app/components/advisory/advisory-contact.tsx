'use client';

import { useState, useEffect } from 'react';
import { Send, CircleCheck, X } from 'lucide-react';

interface AdvisoryContactProps {
  interest: string;
  onClearInterest: () => void;
}

const STAGES = [
  'Idea / Pre-seed',
  'Seed',
  'Series A',
  'Series B+',
  'Growth / Later',
  'Other',
];

const fillClass =
  'inline-block bg-transparent border-b-2 border-white/30 text-[#c9b6ff] font-semibold text-left align-baseline px-1 pb-1 focus:outline-none focus:border-[#c9b6ff] placeholder:text-white/30 placeholder:font-normal placeholder:italic transition-colors';

export default function AdvisoryContact({ interest, onClearInterest }: AdvisoryContactProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    stage: '',
    comments: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Reset back to the form view if the visitor picks a new package after success.
  useEffect(() => {
    if (interest && status === 'success') {
      setStatus('idle');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interest]);

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, interest }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      setStatus('success');
      setForm({ name: '', email: '', company: '', website: '', stage: '', comments: '' });
      onClearInterest();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <section id="contact" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-8">Let&apos;s talk</h2>

      {status === 'success' ? (
        <div className="bg-[#2a313a] border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
          <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#7f54dc] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
            <CircleCheck className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Thanks, got it.</h3>
          <p className="text-white/70">
            Your message is in. I&apos;ll get back to you shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#2a313a] border-2 border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-5"
        >
          {interest && (
            <div className="flex items-center justify-between gap-3 bg-[#7f54dc] border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-sm font-bold text-white">
                Inquiring about: {interest}
              </span>
              <button
                type="button"
                onClick={onClearInterest}
                className="text-white hover:text-black shrink-0"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}

          <div className="text-white text-lg sm:text-xl">
            <p className="mb-6 text-2xl sm:text-3xl font-bold">Hey Samir,</p>
            <p className="leading-[2.9]">
              my name is{' '}
            <input
              type="text"
              required
              value={form.name}
              onChange={update('name')}
              className={`${fillClass} w-36`}
              placeholder="your name"
              aria-label="Your name"
            />
            , and I run{' '}
            <input
              type="text"
              value={form.company}
              onChange={update('company')}
              className={`${fillClass} w-36`}
              placeholder="company"
              aria-label="Your company"
            />
            , a{' '}
            <select
              value={form.stage}
              onChange={update('stage')}
              className={`${fillClass} w-40`}
              aria-label="Company stage"
            >
              <option value="" className="text-black">
                stage
              </option>
              {STAGES.map((s) => (
                <option key={s} value={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>{' '}
            stage fintech (
            <input
              type="text"
              value={form.website}
              onChange={update('website')}
              className={`${fillClass} w-32`}
              placeholder="yoursite.com"
              aria-label="Your website"
            />
            ). I&apos;m looking for advisory for{' '}
            <input
              type="text"
              value={form.comments}
              onChange={update('comments')}
              className={`${fillClass} w-64`}
              placeholder="what you need"
              aria-label="What you need advisory for"
            />
            . Let&apos;s connect, my email is{' '}
            <input
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              className={`${fillClass} w-56`}
              placeholder="you@email.com"
              aria-label="Your email"
            />
              .
            </p>
          </div>

          {status === 'error' && (
            <p role="alert" className="text-sm font-bold text-red-300 bg-red-900/30 border-2 border-red-400/40 px-3 py-2">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-wide text-sm px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            {status === 'submitting' ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}
    </section>
  );
}
