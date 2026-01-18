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

LOG_FILE="/tmp/keystone-seed.log"

npx keystone dev --seed-data-step "$STEP" > "$LOG_FILE" 2>&1 &
KESTONE_PID=$!

echo "▶ Keystone started (pid $KESTONE_PID), waiting for seed to complete"

until grep -q "Seed data inserted" "$LOG_FILE"; do
  sleep 1
done

echo "▶ Seed completed, stopping keystone dev"
kill "$KESTONE_PID"
wait "$KESTONE_PID" || true

echo "$NEXT_INDEX" > "$STATE_FILE"

echo "✔ Seed step $STEP completed (index $NEXT_INDEX)"
