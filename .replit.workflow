run = "bash run.sh"
language = "nodejs"
deploymentTarget = "cloudrun"

entrypoint = "."

[nix]
channel = "stable-23_05"

[deployment]
build = ["npm", "run", "build"]
run = ["npm", "start"]
deploymentTarget = "cloudrun"

[[ports]]
localPort = 8080
externalPort = 80