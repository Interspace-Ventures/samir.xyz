#!/bin/bash
npx prisma db push
npx tsx scripts/seed-db.ts