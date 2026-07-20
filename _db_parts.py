import sqlite3
import json
import os

DB_PATH = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Get all user text parts (first part in each session is typically the user message)
print("=== ALL USER TEXT PARTS ===")
cur.execute("""
    SELECT p.session_id, p.data, p.time_created
    FROM part p
    JOIN message m ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'user'
    ORDER BY p.time_created
""")
for r in cur.fetchall():
    data = json.loads(r['data'])
    ptype = data.get('type', 'unknown')
    text = data.get('text', '')
    if text:
        print(f"\n  [user] session={r['session_id']}")
        print(f"  {text[:500]}")

# Get all assistant text parts
print("\n\n=== ALL ASSISTANT TEXT PARTS (longer than 50 chars) ===")
cur.execute("""
    SELECT p.session_id, p.data, p.time_created
    FROM part p
    JOIN message m ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
    AND json_extract(p.data, '$.type') = 'text'
    ORDER BY p.time_created
""")
for r in cur.fetchall():
    data = json.loads(r['data'])
    text = data.get('text', '')
    if len(text) > 50:
        print(f"\n  [assistant] session={r['session_id']}")
        print(f"  {text[:600]}")

conn.close()
