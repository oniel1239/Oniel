import sqlite3
import json
import os
from datetime import datetime, timedelta

DB_PATH = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# 1. Search for user messages containing key decision/rule patterns
keywords = [
    'always', 'never', 'remember', 'rule', 'must', 'must not',
    'decision', 'decided', 'tradeoff', 'reason', 'prefer',
    'repeat', 'again', 'every time', 'workflow',
    'style', 'design', 'color', 'font', 'layout',
    'language', 'type', 'framework'
]

print("=== USER MESSAGES WITH KEY PATTERNS ===")
for kw in keywords:
    cur.execute("SELECT id, session_id, time_created, data FROM message WHERE data LIKE ? AND json_extract(data, '$.role') = 'user' ORDER BY time_created DESC", (f'%{kw}%',))
    rows = cur.fetchall()
    for r in rows:
        data = json.loads(r['data'])
        content = data.get('content', '')
        if isinstance(content, list):
            for block in content:
                if isinstance(block, dict) and block.get('type') == 'text':
                    text = block['text']
                    if kw.lower() in text.lower():
                        print(f"\n  [{kw}] session={r['session_id']}")
                        print(f"  {text[:300]}")
        elif isinstance(content, str):
            if kw.lower() in content.lower():
                print(f"\n  [{kw}] session={r['session_id']}")
                print(f"  {content[:300]}")

# 2. Search assistant text for decisions/rules
print("\n\n=== ASSISTANT TEXT WITH DECISIONS/RULES ===")
cur.execute("SELECT id, session_id, time_created, data FROM message WHERE json_extract(data, '$.role') = 'assistant' ORDER BY time_created DESC")
for m in cur.fetchall():
    data = json.loads(m['data'])
    content = data.get('content', '')
    if isinstance(content, list):
        for block in content:
            if isinstance(block, dict) and block.get('type') == 'text':
                text = block['text']
                lower = text.lower()
                if any(kw in lower for kw in ['decision', 'architecture', 'recommend', 'pattern', 'rule', 'important']):
                    print(f"\n  [assistant] session={m['session_id']}")
                    print(f"  {text[:300]}")

# 3. Look at the project-specific sessions more carefully
print("\n\n=== PROJECT SESSIONS DETAILED ===")
project_sessions = [
    'ses_086e501c6fferX37pDOTP5jro6',
    'ses_086e501d6ffed7OGEr4k66mbpi',
    'ses_086e50244ffeiGctl0AIcwhOja',
]

for sid in project_sessions:
    cur.execute("SELECT id, data FROM message WHERE session_id = ? ORDER BY time_created", (sid,))
    msgs = cur.fetchall()
    print(f"\n--- Session: {sid} ({len(msgs)} messages) ---")
    for m in msgs:
        data = json.loads(m['data'])
        role = data.get('role', 'unknown')
        content = data.get('content', '')
        text = ''
        if isinstance(content, str):
            text = content
        elif isinstance(content, list):
            for block in content:
                if isinstance(block, dict) and block.get('type') == 'text':
                    text += block['text'] + '\n'
        if text.strip():
            print(f"  [{role}] {text[:200]}")

# 4. Look at todos
print("\n\n=== TODOS ===")
cur.execute("SELECT * FROM todo ORDER BY rowid DESC LIMIT 20")
for t in cur.fetchall():
    print(f"  {dict(t)}")

# 5. Check workflow_run
print("\n\n=== WORKFLOW RUNS ===")
cur.execute("SELECT * FROM workflow_run ORDER BY rowid DESC LIMIT 10")
for w in cur.fetchall():
    print(f"  {dict(w)}")

conn.close()
