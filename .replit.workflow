{
  "workflows": {
    "Run": {
      "commands": [
        "bash run.sh"
      ],
      "restartOn": {
        "files": [
          "app/**/*.ts",
          "app/**/*.tsx",
          "app/**/*.css",
          "public/**/*",
          "*.js",
          "*.json"
        ]
      }
    }
  }
}