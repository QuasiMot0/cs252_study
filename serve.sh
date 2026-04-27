#!/bin/bash
PORT=8252
DIR="$(cd "$(dirname "$0")" && pwd)"

# Kill anything already on this port
lsof -ti tcp:$PORT | xargs kill -9 2>/dev/null || true

echo "CS252 Quiz → http://localhost:$PORT"
echo "Press Ctrl+C to stop."

cd "$DIR"
python3 -m http.server $PORT &
SERVER_PID=$!

sleep 0.4
open "http://localhost:$PORT" 2>/dev/null || true

wait $SERVER_PID
