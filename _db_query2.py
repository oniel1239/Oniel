import sqlite3
import json

DB_PATH = r'C:\Users\LAPTOOL TECHNOLOGY\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Current project sessions
project_sessions = [
    'ses_086e501c6fferX37pDOTP5jro6',  # Auto Distill
    'ses_086e501d6ffed7OGEr4k66mbpi',  # Auto Dream
    'ses_086e50244ffeiGctl0AIcwhOja',  # Greeting
]

for sid in project_sessions:
    print(f"\n{'='*60}")
    print(f"SESSION: {sid}")
    
    # Get messages
    cur.execute("SELECT * FROM message WHERE session_id = ? ORDER BY time_created", (sid,))
    messages = cur.fetchall()
    print(f"  Messages: {len(messages)}")
    for m in messages:
        data = json.loads(m['data'])
        role = data.get('role', 'unknown')
        agent_id = m['agent_id'] or ''
        content_preview = ''
        if 'content' in data:
            content = data['content']
            if isinstance(content, str):
                content_preview = content[:150]
            elif isinstance(content, list):
                for block in content:
                    if isinstance(block, dict) and block.get('type') == 'text':
                        content_preview = block['text'][:150]
                        break
        print(f"    [{role}] agent={agent_id}: {content_preview[:120]}...")
    
    # Get parts
    cur.execute("SELECT * FROM part WHERE session_id = ? ORDER BY time_created LIMIT 30", (sid,))
    parts = cur.fetchall()
    print(f"  Parts: {len(parts)}")
    for p in parts:
        data = json.loads(p['data'])
        ptype = data.get('type', 'unknown')
        tool = data.get('tool', '')
        text_preview = ''
        if ptype == 'text':
            text_preview = data.get('text', '')[:100]
        elif ptype == 'tool':
            inp = data.get('state', {}).get('input', {})
            if isinstance(inp, dict):
                # Show tool name and brief input
                text_preview = f"tool={tool} input_keys={list(inp.keys())[:5]}"
            else:
                text_preview = f"tool={tool}"
        print(f"    [{ptype}] {text_preview}")

    # Get tasks
    cur.execute("SELECT * FROM task WHERE session_id = ?", (sid,))
    tasks = cur.fetchall()
    print(f"  Tasks: {len(tasks)}")
    for t in tasks:
        print(f"    task: {dict(t)}")

conn.close()
