import flask as f
import database as db


app = f.Flask(__name__)


@app.route('/')
def root():
	return f.render_template("ordliste.html")


@app.route('/api/query', methods=["GET"])
def query():
	r = f.jsonify(db.query(f.request.args.get("q", default="", type=str)))
	r.headers.add('Access-Control-Allow-Origin', '*')
	return r


@app.route('/api/add_word', methods=["POST"])
def add_word():
	db.add_word(f.request.get_json()["word"])
	return ""


@app.route('/api/add_definition', methods=["POST"])
def add_definition():
	db.add_definition(
		f.request.get_json()["word"],
		f.request.get_json()["definition"]
	)
	return ""



if __name__ == "__main__":
	app.run()