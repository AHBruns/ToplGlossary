import sqlite3 as db
import json as j


def query(search_term):
	search_term = "%" + search_term + "%"
	with db.connect("db.sqlite", isolation_level="EXCLUSIVE") as c:
		c.execute("BEGIN TRANSACTION")
		r = c.execute("""SELECT word, definitions FROM words where 
			word LIKE ?""", (search_term,)).fetchall()
		return [[line[0], j.loads(line[1])] for line in r]


def add_word(word):
	with db.connect("db.sqlite", isolation_level="EXCLUSIVE") as c:
		c.execute("BEGIN TRANSACTION")
		c.execute("""INSERT INTO words VALUES (? ,? ,?)""", (word, "[]", "[]"))


def add_definition(word, definition):
	with db.connect("db.sqlite", isolation_level="EXCLUSIVE") as c:
		c.execute("BEGIN TRANSACTION")
		definitions = c.execute("""SELECT definitions FROM words WHERE word = 
			?""", (word,)).fetchone()[0]
		definitions = j.loads(definitions)
		definitions.append(definition)
		definitions = j.dumps(definitions)
		c.execute("""UPDATE words SET definitions = ? WHERE word = ?""",
			(definitions, word))