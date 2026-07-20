import sqlite3
import json

DB_PATH = r'C:\Users\LAPTOOL TECHNOLOGY\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Continue Distill session parts (20+)
sid = 'ses_086e501c6fferX37pDOTP5jro6'
print(f"=== DISTILL SESSION PARTS (continued) ===")
cur.execute("SELECT * FROM part WHERE session_id = ? ORDER BY time_created", (sid,))
parts = cur.fetchall()
for i, p in enumerate(parts):
    if i < 20:
        continue  # skip already seen
    data = json.loads(p['data'])
    ptype = data.get('type', 'unknown')
    print(f"\n--- Part {i} [{ptype}] ---")
    if ptype == 'text':
        print(f"  text: {data.get('text', '')[:500]}")
    elif ptype == 'tool':
        tool = data.get('tool', '')
        state = data.get('state', {})
        inp = state.get('input', {})
        out = state.get('output', '')
        print(f"  tool: {tool}")
        if isinstance(inp, dict):
            for k, v in inp.items():
                val_str = str(v)[:300]
                print(f"    input.{k}: {val_str}")
        if isinstance(out, str):
            print(f"  output: {out[:500]}")
        elif isinstance(out, dict):
            print(f"  output: {str(out)[:500]}")
    elif ptype == 'reasoning':
        print(f"  reasoning: {data.get('text', data.get('reasoning', ''))[:500]}")
    else:
        for k, v in data.items():
            if k != 'type':
                val_str = str(v)[:300]
                print(f"  {k}: {val_str}")

print(f"\n\nTotal parts: {len(parts)}")

# Check user messages
print(f"\n=== USER MESSAGES ===")
cur.execute("SELECT * FROM message WHERE session_id = ? AND data LIKE '%\"role\":\"user\"%' ORDER BY time_created", (sid,))
for m in cur.fetchall():
    data = json.loads(m['data'])
    content = data.get('content', '')
    if isinstance(content, list):
        for block in content:
            if isinstance(block, dict) and block.get('type') == 'text':
                print(f"  User: {block['text'][:300]}")
    elif isinstance(content, str):
        print(f"  User: {content[:300]}")

conn.close()
