# HEARTBEAT.md
<!-- Active heartbeat tasks — processed every 30 min via heartbeat.py + lc_adapter -->

## Implementation

- **Script**: `sandboxes/langraph-echo-sandbox/heartbeat.py`
- **Adapter**: `lc_adapter.echo_invoke(mode="background", budget_key="background", task_reset=True)`
- **Cron**: registered in `cron/jobs.json` at `*/30 * * * *`
- **Log**: `/Users/pc/.openclaw/logs/heartbeat.jsonl`
- **Guard rails**: HARD STOP on quota/billing/hard_limit, 10-call cap, 100K token cap (background budget)

## Active Tasks (processed each tick)

### 1. Status Check

Respond with a 1-sentence status: current active tasks, blocking issues, or idle.

### 2. Budget Awareness

Check `workspace/budget.md` for any entries approaching cost thresholds.
Flag if month-to-date cost > 80% of target. One sentence max.

### 3. Session Health

If session token total > 80K, issue: "SESSION WARNING — approaching 100K cap."
If blocked by any HARD STOP condition, stop immediately and log to `logs/heartbeat.jsonl`.

## Notes

- All calls use `cache_key="echo-heartbeat-v1"` for prompt caching
- Heartbeat uses `mode="background"` + `budget_key="background"` — never competes with interactive RPM
- HARD STOP exits with code 2; cron operator logs the failure to `heartbeat.jsonl`
- To disable heartbeat: set `OPENCLAW_HEARTBEAT_ENABLED=0` (or create `~/.openclaw/cron/heartbeat.disabled`).
- 2026-03-13: LangChain dependency upgrade restored heartbeat execution
