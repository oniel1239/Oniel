import sqlite3
import json
import sys

DB_PATH = r'C:\Users\LAPTOOL TECHNOLOGY\.local\share\mimocode\mimocode.db'

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# List tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in cur.fetchall()]
print("=== TABLES ===")
print(tables)

# List sessions
print("\n=== SESSIONS ===")
cur.execute("SELECT * FROM session ORDER BY time_created DESC LIMIT 20")
for row in cur.fetchall():
    print(dict(row))

conn.close()
