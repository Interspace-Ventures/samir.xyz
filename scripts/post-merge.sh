#!/bin/bash
set -e

npm install
npx prisma db push --skip-generate
npx prisma generate
