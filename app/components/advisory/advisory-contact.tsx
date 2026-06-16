'use client';

import { useState, useEffect } from 'react';
import { Send, CircleCheck, X, Mail } from 'lucide-react';
import StageSelect from './stage-select';

interface AdvisoryContactProps {
  interest: string;
  onClearInterest: () => void;
  onSelectInterest: (value: string) => void;
}

const SUBJECTS = ['Build', 'Grow', 'Scale'];

const STAGES = [
  'Idea',
  'Pre-seed / Seed',
  'Series A / B',
  'Series C+',
  'Pre-IPO',
  'Growth',
];

type FillInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  ariaLabel: string;
  type?: string;
  required?: boolean;
};

function FillInput({ value, onChange, placeholder, ariaLabel, type = 'text', required }: FillInputProps) {
  return (
    <span className="inline-grid max-w-full align-baseline">
      <span
        aria-hidden="true"
        className={`col-start-1 row-start-1 invisible whitespace-pre leading-tight px-0.5 ${value ? 'font-semibold' : 'font-normal italic'}`}
      >
        {value || placeholder}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        size={1}
        className="col-start-1 row-start-1 w-full min-w-0 bg-transparent border-b-2 border-white/30 text-[#c9b6ff] font-semibold leading-tight px-0.5 pb-0.5 focus:outline-none focus:border-[#c9b6ff] placeholder:text-white/30 placeholder:font-normal placeholder:italic transition-colors"
      />
    </span>
  );
}

export default function AdvisoryContact({ interest, onClearInterest, onSelectInterest }: AdvisoryContactProps) {
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
    <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
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
          className="bg-[#2a313a] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          {/* Compose window header */}
          <div className="flex items-center gap-2 border-b-2 border-black bg-[#242a31] px-4 py-2">
            <Mail className="w-4 h-4 text-[#c9b6ff]" aria-hidden="true" />
            <span className="text-sm font-bold text-white">New message</span>
            <span className="ml-auto flex items-center gap-2.5" aria-hidden="true">
              <span className="block h-0.5 w-3 bg-white/30" />
              <span className="block h-2.5 w-2.5 border-2 border-white/30" />
              <X className="h-3.5 w-3.5 text-white/30" />
            </span>
          </div>

          {/* To */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2">
            <span className="w-16 shrink-0 text-sm text-white/45">To</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#242a31] py-1 pl-1 pr-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7f54dc] text-xs font-bold text-white">
                S
              </span>
              <span className="text-sm text-white/90">Samir</span>
            </span>
            <span className="ml-auto text-sm text-white/35" aria-hidden="true">
              Cc Bcc
            </span>
          </div>

          {/* Subject */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
            <span className="w-16 shrink-0 text-sm text-white/45">Subject</span>
            <span className="text-sm font-semibold text-white">
              Let&apos;s{' '}
              <StageSelect
                value={interest}
                onChange={onSelectInterest}
                options={SUBJECTS}
                placeholder="Build"
              />{' '}
              together
            </span>
          </div>

          {/* Body */}
          <div className="px-4 py-5 sm:px-6">
          <div className="text-white text-sm sm:text-lg">
            <p className="mb-3 sm:mb-4 text-base sm:text-xl font-bold">Hey Samir,</p>
            <p className="leading-[2.0] sm:leading-[2.4]">
              My name is{' '}
            <FillInput
              required
              value={form.name}
              onChange={update('name')}
              placeholder="Dee Hock"
              ariaLabel="Your name"
            />
            , and I run{' '}
            <FillInput
              value={form.company}
              onChange={update('company')}
              placeholder="Visa"
              ariaLabel="Your company"
            />
            , a{' '}
            <StageSelect
              value={form.stage}
              onChange={(v) => setForm((prev) => ({ ...prev, stage: v }))}
              options={STAGES}
              placeholder="Growth"
            />{' '}
            stage fintech (
            <FillInput
              value={form.website}
              onChange={update('website')}
              placeholder="visa.com"
              ariaLabel="Your website"
            />
            ). I&apos;m looking for advisory for{' '}
            <FillInput
              value={form.comments}
              onChange={update('comments')}
              placeholder="how to launch a new payment protocol"
              ariaLabel="What you need advisory for"
            />
            . Let&apos;s connect, my email is{' '}
            <FillInput
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder="dee@visa.com"
              ariaLabel="Your email"
            />
              .
            </p>
          </div>

            {status === 'error' && (
              <p role="alert" className="mt-5 text-sm font-bold text-red-300 bg-red-900/30 border-2 border-red-400/40 px-3 py-2">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Compose footer */}
          <div className="flex items-center justify-between gap-3 border-t-2 border-black bg-[#242a31] px-4 py-2.5">
            <span className="text-xs text-white/40">Goes straight to my inbox.</span>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-wide text-sm px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              {status === 'submitting' ? 'Sending…' : 'Send'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
