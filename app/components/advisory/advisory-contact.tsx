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

const inputClass =
  'w-full bg-white text-black border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(127,84,220,1)] placeholder:text-gray-400';
const labelClass = 'block text-sm font-bold text-white mb-1';

export default function AdvisoryContact({ interest, onClearInterest }: AdvisoryContactProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
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
      setForm({ name: '', email: '', company: '', stage: '', comments: '' });
      onClearInterest();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <section id="contact" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-2">Let&apos;s talk</h2>
      <p className="text-white/70 mb-8">
        Tell me a bit about what you&apos;re building and where you need a hand.
      </p>

      {status === 'success' ? (
        <div className="bg-[#2a313a] border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
          <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#7f54dc] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
            <CircleCheck className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Thanks &mdash; got it.</h3>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name <span className="text-[#c9b6ff]">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={update('name')}
                className={inputClass}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-[#c9b6ff]">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                className={inputClass}
                placeholder="jane@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="company" className={labelClass}>
                Company
              </label>
              <input
                id="company"
                type="text"
                value={form.company}
                onChange={update('company')}
                className={inputClass}
                placeholder="Company name"
              />
            </div>
            <div>
              <label htmlFor="stage" className={labelClass}>
                Stage
              </label>
              <select
                id="stage"
                value={form.stage}
                onChange={update('stage')}
                className={inputClass}
              >
                <option value="">Select a stage</option>
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="comments" className={labelClass}>
              Comments
            </label>
            <textarea
              id="comments"
              rows={4}
              value={form.comments}
              onChange={update('comments')}
              className={`${inputClass} resize-y`}
              placeholder="What are you working on, and where do you need help?"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm font-bold text-red-300 bg-red-900/30 border-2 border-red-400/40 px-3 py-2">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-wide text-sm px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Send message'}
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      )}
    </section>
  );
}
