export PATH=/usr/bin:/bin:/usr/sbin:/sbin:$PATH
echo "Checking for available tools..."
env | grep PATH
ls -l /bin/python* /usr/bin/python* /bin/node* /usr/bin/node* /bin/bash 2>/dev/null || echo "No standard Python/Node.js installations found"
chmod +x start.sh && ./start.sh
