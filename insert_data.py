import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS traffic(
id INTEGER PRIMARY KEY AUTOINCREMENT,
vehicles INTEGER,
signals INTEGER,
emergency INTEGER,
roads INTEGER
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS contact(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
email TEXT,
message TEXT
)
""")

cursor.execute(
"INSERT INTO traffic(vehicles,signals,emergency,roads) VALUES(1200,65,8,14)"
)

conn.commit()
conn.close()

print("Database Created Successfully")