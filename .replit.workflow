workflow:
  run:
    run: npx prisma generate && npx next dev
    language: nodejs
    working-dir: "."