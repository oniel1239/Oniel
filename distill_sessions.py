import sqlite3, json, os

db_path = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Get all sessions
c.execute("SELECT id, title, time_created, directory FROM session ORDER BY time_created DESC")
sessions = c.fetchall()
print("=== SESSIONS (most recent first) ===")
for s in sessions:
    print(f"  {s['id']}: '{s['title']}' | dir={s['directory']} | time={s['time_created']}")

print()

# Get recent sessions (last 30 days from now = July 19, 2026)
# time_created is in ms epoch
import datetime
now_ms = int(datetime.datetime.now(datetime.timezone.utc).timestamp() * 1000)
thirty_days_ago_ms = now_ms - (30 * 24 * 60 * 60 * 1000)
print(f"Now: {now_ms}, 30 days ago: {thirty_days_ago_ms}")
print()

c.execute("SELECT id, title, time_created, directory FROM session WHERE time_created > ? ORDER BY time_created DESC", (thirty_days_ago_ms,))
recent = c.fetchall()
print(f"=== RECENT SESSIONS (last 30 days): {len(recent)} ===")
for s in recent:
    print(f"  {s['id']}: '{s['title']}' | dir={s['directory']} | time={s['time_created']}")

print()

# Get all sessions regardless of time
c.execute("SELECT id, title, time_created, directory FROM session ORDER BY time_created DESC")
all_sessions = c.fetchall()
print(f"=== ALL SESSIONS: {len(all_sessions)} ===")
for s in all_sessions:
    t = datetime.datetime.fromtimestamp(s['time_created']/1000, tz=datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
    print(f"  {s['id']}: '{s['title']}' | dir={s['directory']} | {t}")

conn.close()
