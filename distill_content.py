import sqlite3, json, os

db_path = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Get the interesting session IDs (not "hello" sessions)
# 1. The forex agent session
# 2. The resume editing session
# 3. The file analysis session
sessions_of_interest = [
    'ses_086e867afffet0X2ckmaoZbp54',  # forex agent
    'ses_086e8681fffes2HuezRWxSjMwt',  # resume editing
    'ses_086e86885ffeM6Z5DZPhfS8Y3B',  # file analysis
]

for sid in sessions_of_interest:
    c.execute("SELECT title, directory FROM session WHERE id=?", (sid,))
    s = c.fetchone()
    print(f"\n{'='*80}")
    print(f"SESSION: {sid}")
    print(f"TITLE: {s['title']}")
    print(f"DIR: {s['directory']}")
    print(f"{'='*80}")
    
    # Get all messages for this session
    c.execute("""
        SELECT m.id, json_extract(m.data, '$.role') as role, m.time_created
        FROM message m
        WHERE m.session_id = ?
        ORDER BY m.time_created ASC
    """, (sid,))
    messages = c.fetchall()
    
    for msg in messages:
        role = msg['role']
        # Get text parts for this message
        c.execute("""
            SELECT json_extract(data, '$.text') as text
            FROM part
            WHERE message_id = ? AND json_extract(data, '$.type') = 'text'
        """, (msg['id'],))
        texts = c.fetchall()
        
        for t in texts:
            if t['text']:
                preview = t['text'][:500]
                print(f"\n[{role}]: {preview}")
                if len(t['text']) > 500:
                    print(f"  ... ({len(t['text'])} chars total)")

conn.close()
