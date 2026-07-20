import sqlite3
import json
import os

DB_PATH = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Get the full user message from the Greeting session that contains the website requirements
sid = 'ses_086e50244ffeiGctl0AIcwhOja'
print(f"=== FULL CONTENT OF GREETING SESSION: {sid} ===")
cur.execute("SELECT p.data, m.data as msg_data FROM part p JOIN message m ON p.message_id = m.id WHERE p.session_id = ? ORDER BY p.time_created", (sid,))
for r in cur.fetchall():
    pdata = json.loads(r['data'])
    mdata = json.loads(r['msg_data'])
    role = mdata.get('role', 'unknown')
    ptype = pdata.get('type', 'unknown')
    text = pdata.get('text', '')
    if text:
        print(f"\n--- [{role}] [{ptype}] ---")
        print(text)

# Also look at the "i want an automate agent" session
print(f"\n\n{'='*60}")
sid2 = 'ses_086e867afffet0X2ckmaoZbp54'
print(f"=== FULL CONTENT OF AGENT SESSION: {sid2} ===")
cur.execute("SELECT p.data, m.data as msg_data FROM part p JOIN message m ON p.message_id = m.id WHERE p.session_id = ? ORDER BY p.time_created", (sid2,))
for r in cur.fetchall():
    pdata = json.loads(r['data'])
    mdata = json.loads(r['msg_data'])
    role = mdata.get('role', 'unknown')
    ptype = pdata.get('type', 'unknown')
    text = pdata.get('text', '')
    if text:
        print(f"\n--- [{role}] [{ptype}] ---")
        print(text[:600])

# Get the distill session's final summary
print(f"\n\n{'='*60}")
sid3 = 'ses_086e501c6fferX37pDOTP5jro6'
print(f"=== DISTILL SESSION FINAL TEXT ===")
cur.execute("SELECT p.data FROM part p JOIN message m ON p.message_id = m.id WHERE p.session_id = ? AND json_extract(p.data, '$.type') = 'text' ORDER BY p.time_created DESC LIMIT 3", (sid3,))
for r in cur.fetchall():
    pdata = json.loads(r['data'])
    text = pdata.get('text', '')
    if text and len(text) > 100:
        print(f"\n{text[:3000]}")
        break

# Check the forex agent session tool calls
print(f"\n\n{'='*60}")
print("=== TOOL CALLS IN AGENT SESSION ===")
cur.execute("""
    SELECT p.data
    FROM part p 
    JOIN message m ON p.message_id = m.id
    WHERE p.session_id = 'ses_086e867afffet0X2ckmaoZbp54'
    AND json_extract(p.data, '$.type') = 'tool'
    ORDER BY p.time_created
""")
for r in cur.fetchall():
    pdata = json.loads(r['data'])
    tool = pdata.get('tool', '')
    state = pdata.get('state', {})
    inp = state.get('input', {})
    if isinstance(inp, dict):
        # Show key info
        if tool == 'write':
            fp = inp.get('file_path', '')
            content_len = len(inp.get('content', ''))
            print(f"  write: {fp} ({content_len} chars)")
        elif tool == 'bash':
            cmd = inp.get('command', '')
            print(f"  bash: {cmd[:150]}")
        elif tool == 'AskUserQuestion':
            print(f"  AskUserQuestion")
        else:
            print(f"  {tool}: {str(inp)[:100]}")
    else:
        print(f"  {tool}")

conn.close()
