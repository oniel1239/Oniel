import sqlite3
import json

DB_PATH = r'C:\Users\LAPTOOL TECHNOLOGY\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Check message table schema
cur.execute("PRAGMA table_info(message)")
cols = cur.fetchall()
print("=== MESSAGE COLUMNS ===")
for c in cols:
    print(f"  {c['name']} ({c['type']})")

# Check part table schema
cur.execute("PRAGMA table_info(part)")
cols = cur.fetchall()
print("\n=== PART COLUMNS ===")
for c in cols:
    print(f"  {c['name']} ({c['type']})")

# Look at the Distill session parts in detail
sid = 'ses_086e501c6fferX37pDOTP5jro6'
print(f"\n=== DISTILL SESSION PARTS ===")
cur.execute("SELECT * FROM part WHERE session_id = ? ORDER BY time_created LIMIT 20", (sid,))
parts = cur.fetchall()
for i, p in enumerate(parts):
    data = json.loads(p['data'])
    ptype = data.get('type', 'unknown')
    print(f"\n--- Part {i} [{ptype}] ---")
    if ptype == 'text':
        print(f"  text: {data.get('text', '')[:300]}")
    elif ptype == 'tool':
        tool = data.get('tool', '')
        state = data.get('state', {})
        inp = state.get('input', {})
        out = state.get('output', '')
        print(f"  tool: {tool}")
        if isinstance(inp, dict):
            for k, v in inp.items():
                val_str = str(v)[:200]
                print(f"    input.{k}: {val_str}")
        if isinstance(out, str):
            print(f"  output: {out[:300]}")
        elif isinstance(out, dict):
            print(f"  output: {str(out)[:300]}")
    elif ptype == 'reasoning':
        print(f"  reasoning: {data.get('text', data.get('reasoning', ''))[:300]}")
    else:
        # Print everything
        for k, v in data.items():
            if k != 'type':
                val_str = str(v)[:200]
                print(f"  {k}: {val_str}")

conn.close()
