#!/usr/bin/env bash
set -e

REQUESTED_STEP="$1"
STATE_FILE=".seed-state"
SEQUENCE_FILE="seed-sequence.json"

# Load sequence
SEQUENCE=$(jq -r '.sequence[]' "$SEQUENCE_FILE")
TOTAL=$(jq '.sequence | length' "$SEQUENCE_FILE")

# Load current index
CURRENT_INDEX=-1
if [ -f "$STATE_FILE" ]; then
  CURRENT_INDEX=$(cat "$STATE_FILE")
fi

NEXT_INDEX=$((CURRENT_INDEX + 1))

if [ "$NEXT_INDEX" -ge "$TOTAL" ]; then
  echo "✔ All seed steps already completed"
  exit 0
fi

EXPECTED_STEP=$(jq ".sequence[$NEXT_INDEX]" "$SEQUENCE_FILE")

if [ "$REQUESTED_STEP" -ne "$EXPECTED_STEP" ]; then
  echo "❌ Invalid seed step"
  echo "   Current index : $CURRENT_INDEX"
  echo "   Expected step : $EXPECTED_STEP (sequence index $NEXT_INDEX)"
  echo "   Requested     : $REQUESTED_STEP"
  exit 1
fi

echo "▶ Running seed step $REQUESTED_STEP (sequence index $NEXT_INDEX)"

npx keystone dev --seed-data-step "$REQUESTED_STEP"

echo "$NEXT_INDEX" > "$STATE_FILE"
echo "✔ Seed step completed"
