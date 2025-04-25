entrypoint = "start-nextjs.sh"
run = ["bash", "start-nextjs.sh"]
modules = ["nodejs-20:v8-20230920-bd784b9"]
hidden = [".config", "package-lock.json"]

[languages]

[languages.typescript]
pattern = "**/{*.ts,*.js,*.tsx,*.jsx}"

[languages.typescript.languageServer]
start = "typescript-language-server --stdio"

[nix]
channel = "stable-22_11"

[env]
XDG_CONFIG_HOME = "/home/runner/.config"

[gitHubImport]
requiredFiles = [".replit", "replit.nix", ".config"]

[deployment]
run = ["bash", "start-nextjs.sh"]
deploymentTarget = "cloudrun"