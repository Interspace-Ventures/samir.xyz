workflows:
  "/nextjs":
    defaultRunner: bash
    command: ./start-nextjs.sh
    runOptions:
      sleep: 500ms
    restartOn:
      file-change:
        - "**/*.{js,jsx,ts,tsx,css}"
        - "next.config.js"
        - "package.json"