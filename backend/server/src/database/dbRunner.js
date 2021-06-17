const db = require("./mysql");


class dbRunner {

    runQuery = async (str, replacements) => {
        return new Promise((resolve) => {
            db.query(str, replacements, (err, rows) => {
                if (err) rejects(err.toString());
                resolve(rows);
            });
        });
    };

}

module.exports = new dbRunner();