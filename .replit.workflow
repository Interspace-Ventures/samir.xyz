[dev]
name = "Run"
onStart = ["bash", "run.sh"]
restartTrigger = ["run.sh", "prisma/schema.prisma", "tsconfig.json", "next.config.js", "package.json", "app/globals.css", "tailwind.config.js", "app/components/ventures-grid.tsx", "app/components/venture-card.tsx"]