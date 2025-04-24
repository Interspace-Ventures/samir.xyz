# This file provides a reference for how to configure the .replit file
# You will need to copy these settings to your .replit file using Replit's configuration UI

# Run command configuration
run = "bash start-nextjs.sh"

# Environment variables (already in .env but repeated here for clarity)
[env]
PORT = "3000"
HOST = "0.0.0.0"

# Port configuration
[[ports]]
localPort = 3000
externalPort = 3000

# Workflow configuration for Run button
[workflows.workflow]
name = "NextJS App"
author = "replit"
mode = "sequential"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "bash start-nextjs.sh"