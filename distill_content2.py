import sqlite3, json, os

db_path = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Get the file analysis session - more details
sid = 'ses_086e86885ffeM6Z5DZPhfS8Y3B'
c.execute("SELECT title, directory FROM session WHERE id=?", (sid,))
s = c.fetchone()
print(f"SESSION: {sid} - {s['title']}")

# Get all text parts
c.execute("""
    SELECT p.id, json_extract(p.data, '$.text') as text, m.data as msg_data
    FROM part p
    JOIN message m ON m.id = p.message_id
    WHERE m.session_id = ?
    ORDER BY p.time_created ASC
""", (sid,))
parts = c.fetchall()

for p in parts:
    role = json.loads(p['msg_data']).get('role', '?')
    text = p['text'] or ''
    if text:
        print(f"\n[{role}] ({len(text)} chars):")
        print(text[:800])
        if len(text) > 800:
            print(f"  ... truncated ...")

# Also get the tool calls for this session
print(f"\n\n=== TOOL CALLS IN SESSION ===")
c.execute("""
    SELECT json_extract(p.data, '$.tool') as tool,
           json_extract(p.data, '$.state.input') as inp,
           m.data as msg_data
    FROM part p
    JOIN message m ON m.id = p.message_id
    WHERE m.session_id = ?
      AND json_extract(p.data, '$.type') = 'tool'
    ORDER BY p.time_created ASC
""", (sid,))
tools = c.fetchall()

for t in tools:
    role = json.loads(t['msg_data']).get('role', '?')
    inp = json.dumps(json.loads(t['inp']))[:300] if t['inp'] else 'null'
    print(f"  [{role}] {t['tool']}: {inp}")

conn.close()
