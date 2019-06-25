let start_flag = true;
let search_term = "";
let base = "http://127.0.0.1:5000/api/";
let results_table = {};

function search() {
    function load() {
        fetch(base + "query?q=" + encodeURIComponent(search_term))
            .then(async function (resp) {
                return resp.json();
            }).then(function (resp) {
                return resp;
            }).then(function (resp) {
                let results = document.getElementById("results");
                resp.forEach(function (r) {
                    results_table[r[0]] = r[1];
                    let h1 = document.createElement("h1");
                    h1.innerText = r[0];
                    h1.style.fontFamily = "sans-serif";
                    h1.addEventListener(
                        "click",
                        function () {
                            let hook = document.getElementsByTagName("body")[0];
                            results.innerHTML = "";
                            let definitions = document.createElement("div");
                            definitions.id = "definitions";
                            definitions.style.top = "15vh";
                            definitions.style.width = "100%";
                            definitions.style.position = "absolute";
                            definitions.style.textAlign = "center";
                            definitions.appendChild(h1.cloneNode(true));
                            r[1].forEach(function (def) {
                                let bq = document.createElement("blockquote");
                                bq.innerText = def;
                                bq.style.width = "50%";
                                bq.style.margin = "auto";
                                h1.style.fontFamily = "sans-serif";
                                let line = document.createElement("hr");
                                line.style.width = "25%";
                                definitions.append(line);
                                definitions.appendChild(bq);
                            });
                            definitions.append(document.createElement("br"));
                            definitions.append(document.createElement("br"));
                            definitions.append(document.createElement("br"));
                            definitions.append(document.createElement("br"));
                            let add_def_modal = document.createElement("div");
                            add_def_modal.style.textAlign = "center";
                            definitions.appendChild(add_def_modal);
                            hook.appendChild(definitions);
                            let title = document.createElement("h1");
                            title.innerText = "Add A Definition";
                            title.style.fontFamily = "sans-serif";
                            add_def_modal.appendChild(title);
                            add_def_modal.append(document.createElement("br"));
                            let tb = document.createElement("textarea");
                            tb.id = "tb";
                            tb.style.margin = "auto";
                            tb.style.width = "50vw";
                            tb.style.height = "20vh";
                            add_def_modal.appendChild(tb);
                            let submit = document.createElement("input");
                            submit.type = "submit";
                            submit.value = "Publish!";
                            submit.addEventListener(
                                "click",
                                function () {
                                    let data = {"word": r[0], "definition": document.getElementById("tb").value};
                                    fetch(base + "add_definition", {
                                        method: 'POST', // or 'PUT'
                                        body: JSON.stringify(data), // data can be `string` or {object}!
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }).then(function (r) {
                                        alert("Your definition is now" +
                                            " published. Reload this page" +
                                            " and search for this word to" +
                                            " see it!");
                                    })
                                },
                                false
                            );
                            add_def_modal.append(document.createElement("br"));
                            add_def_modal.append(document.createElement("br"));
                            add_def_modal.appendChild(submit);
                            title = document.createElement("h1");
                            title.innerText = "Add A Word";
                            title.style.fontFamily = "sans-serif";
                            add_def_modal.appendChild(title);
                            tb = document.createElement("input");
                            tb.id = "word";
                            tb.style.width = "25vw";
                            tb.style.height = "5vh";
                            tb.style.textAlign = "center";
                            tb.style.fontSize = "xx-large";
                            add_def_modal.appendChild(tb);
                            add_def_modal.append(document.createElement("br"));
                            submit = document.createElement("input");
                            submit.type = "submit";
                            submit.value = "Publish!";
                            submit.addEventListener(
                                "click",
                                function () {
                                    let data = {"word": document.getElementById("word").value};
                                    fetch(base + "add_word", {
                                        method: 'POST', // or 'PUT'
                                        body: JSON.stringify(data), // data can be `string` or {object}!
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }).then(function (r) {
                                        alert("Your word is now" +
                                            " published. Reload this page" +
                                            " and search for it!");
                                    })
                                },
                                false
                            );
                            add_def_modal.append(document.createElement("br"));
                            add_def_modal.append(document.createElement("br"));
                            add_def_modal.appendChild(submit);
                        },
                        false
                    );
                    results.appendChild(h1);
                })
            })
    }
    if (start_flag) {
        let elem = document.getElementById("search");
        let pos = 47.5;
        let id = setInterval(frame, 1);
        function frame() {
            if (pos <= 5.0) {
                clearInterval(id);
                load()
            } else {
                pos -= (0.05 + (pos / 150));
                elem.style.marginTop = pos.toString() + "vh";
            }
        }
        start_flag = false;
    } else {
        load()
    }
}

function listener(e) {
    if (e.keyCode == 13) {
        try {
            let elem = document.getElementById("definitions");
            elem.parentNode.removeChild(elem);
        } catch (e) {

        }
        search_term = document.getElementById("search").value;
        search();
    }
}

window.onload = function () {
    var search_box = document.getElementById("search");
    search_box.addEventListener("keydown", function (e) {

    });
};