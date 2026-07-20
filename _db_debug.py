import sqlite3
import json
import os

DB_PATH = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Debug: print raw data of first user message
cur.execute("SELECT data FROM message WHERE json_extract(data, '$.role') = 'user' LIMIT 3")
for r in cur.fetchall():
    data = json.loads(r['data'])
    print("User message keys:", list(data.keys()))
    content = data.get('content', '')
    print(f"  content type: {type(content).__name__}")
    if isinstance(content, str):
        print(f"  content: '{content[:200]}'")
    elif isinstance(content, list):
        print(f"  content blocks: {len(content)}")
        for i, block in enumerate(content[:3]):
            if isinstance(block, dict):
                print(f"    block {i} type={block.get('type','?')}: {str(block)[:200]}")
    print()

# Debug: print raw data of first assistant message
cur.execute("SELECT data FROM message WHERE json_extract(data, '$.role') = 'assistant' LIMIT 3")
for r in cur.fetchall():
    data = json.loads(r['data'])
    print("Assistant message keys:", list(data.keys()))
    content = data.get('content', '')
    print(f"  content type: {type(content).__name__}")
    if isinstance(content, str):
        print(f"  content: '{content[:200]}'")
    elif isinstance(content, list):
        print(f"  content blocks: {len(content)}")
        for i, block in enumerate(content[:3]):
            if isinstance(block, dict):
                print(f"    block {i} type={block.get('type','?')}: {str(block)[:300]}")
    print()

# Get all unique session directories
cur.execute("SELECT DISTINCT directory FROM session")
dirs = cur.fetchall()
print("All session directories:")
for d in dirs:
    print(f"  {d['directory']}")

conn.close()
