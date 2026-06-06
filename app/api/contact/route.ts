/**
 * Contact API Route
 *
 * Handles advisory-practice contact submissions. Persists each enquiry to the
 * ContactSubmission table so Samir can see who's reaching out, which package
 * they're interested in, and what they need.
 */

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const name = clean(body.name);
    const email = clean(body.email);
    const company = clean(body.company);
    const website = clean(body.website);
    const stage = clean(body.stage);
    const comments = clean(body.comments);
    const interest = clean(body.interest);

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        website: website || null,
        stage: stage || null,
        comments: comments || null,
        interest: interest || null,
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact submission failed:', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    );
  }
}
