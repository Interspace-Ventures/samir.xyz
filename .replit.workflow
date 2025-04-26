run = ["bash", "start-nextjs.sh"]
onBoot = false

hidden = []

[nix]
channel = "stable-23_11"

[deployment]
run = ["node", "server.js"]
deploymentTarget = "cloudrun"