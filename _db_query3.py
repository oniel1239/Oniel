import sqlite3
import json

DB_PATH = r'C:\Users\LAPTOOL TECHNOLOGY\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Look at the Distill session messages in detail
sid = 'ses_086e501c6fferX37pDOTP5jro6'
print(f"=== AUTO DISTILL SESSION: {sid} ===")
cur.execute("SELECT * FROM message WHERE session_id = ? ORDER BY time_created", (sid,))
messages = cur.fetchall()
for m in messages:
    data = json.loads(m['data'])
    role = data.get('role', 'unknown')
    content = data.get('content', '')
    if isinstance(content, str):
        text = content
    elif isinstance(content, list):
        text = ''
        for block in content:
            if isinstance(block, dict) and block.get('type') == 'text':
                text += block['text'] + '\n'
    else:
        text = str(content)
    print(f"\n--- [{role}] ---")
    print(text[:500])

# Look at the Greeting session
print(f"\n\n{'='*60}")
sid2 = 'ses_086e50244ffeiGctl0AIcwhOja'
print(f"=== GREETING SESSION: {sid2} ===")
cur.execute("SELECT * FROM message WHERE session_id = ? ORDER BY time_created", (sid2,))
messages = cur.fetchall()
for m in messages:
    data = json.loads(m['data'])
    role = data.get('role', 'unknown')
    content = data.get('content', '')
    if isinstance(content, str):
        text = content
    elif isinstance(content, list):
        text = ''
        for block in content:
            if isinstance(block, dict) and block.get('type') == 'text':
                text += block['text'] + '\n'
    else:
        text = str(content)
    print(f"\n--- [{role}] ---")
    print(text[:500])

conn.close()
