import sqlite3 as db


db\
	.connect("db.sqlite")\
	.execute("""CREATE TABLE words (word text, definitions text, tags text)""")