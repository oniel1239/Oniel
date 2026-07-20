import sqlite3, json, os

db_path = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
conn = sqlite3.connect(db_path)
c = conn.cursor()

# List tables
c.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in c.fetchall()]
print("Tables:", tables)

for t in tables:
    c.execute("PRAGMA table_info({})".format(t))
    cols = [r[1] for r in c.fetchall()]
    c.execute("SELECT count(*) FROM {}".format(t))
    cnt = c.fetchone()[0]
    print("  {} ({} rows): {}".format(t, cnt, cols))

conn.close()
