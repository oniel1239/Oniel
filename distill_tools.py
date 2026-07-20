import sqlite3, json, os

db_path = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Get all messages and parts with tool calls
c.execute("""
    SELECT m.id as msg_id, m.session_id, m.time_created, 
           json_extract(m.data, '$.role') as role,
           p.id as part_id, p.data as part_data
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(p.data, '$.type') = 'tool'
    ORDER BY m.time_created ASC
""")

results = c.fetchall()
print(f"=== ALL TOOL CALLS: {len(results)} ===")
for r in results:
    pd = json.loads(r['part_data'])
    tool = pd.get('tool', '?')
    state = pd.get('state', {})
    inp = json.dumps(state.get('input', ''))[:200]
    role = r['role']
    sid = r['session_id']
    print(f"  [{role}] session={sid[-12:]} tool={tool}")
    print(f"    input: {inp}")

conn.close()
