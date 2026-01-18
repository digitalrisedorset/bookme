#!/usr/bin/env bash
set -e

command -v jq >/dev/null 2>&1 || {
  echo "❌ jq is required but not installed"
  exit 1
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

STATE_FILE="$SCRIPT_DIR/.seed-state"
SEQUENCE_FILE="$SCRIPT_DIR/seed-sequence.json"

TOTAL=$(jq '.sequence | length' "$SEQUENCE_FILE")

CURRENT_INDEX=-1
if [ -f "$STATE_FILE" ]; then
  CURRENT_INDEX=$(cat "$STATE_FILE")
fi

NEXT_INDEX=$((CURRENT_INDEX + 1))

if [ "$NEXT_INDEX" -ge "$TOTAL" ]; then
  echo "✔ All seed steps already completed"
  exit 0
fi

STEP=$(jq ".sequence[$NEXT_INDEX]" "$SEQUENCE_FILE")

echo "▶ Running seed step $STEP (sequence index $NEXT_INDEX)"

# Safety: ensure port 3000 is free
if ss -ltn | grep -q ':3000'; then
  echo "❌ Port 3000 is already in use. Stop Keystone before seeding."
  exit 1
fi

LOG_FILE="/tmp/keystone-seed.log"

npx keystone dev --seed-data-step "$STEP" > "$LOG_FILE" 2>&1

# If we reach here, keystone dev exited successfully
echo "$NEXT_INDEX" > "$STATE_FILE"

echo "✔ Seed step $STEP completed (index $NEXT_INDEX)"

