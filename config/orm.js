const connection = require ('./connection.js');

//helper for SQL syntax
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}



// object of sql statement functions
var orm = {
	
	selectAll: function(tableInput, cb) {		
		var queryString = "SELECT * FROM " + tableInput + ";";		
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	insertOne: function(table, cols, vals, cb) {		
		var queryString = "INSERT INTO " + table;
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}			
			cb(result);
		});
	},

	updateOne: function(table, objColVals, condition, cb) {
		// Construct the query string that updates a single entry in the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	}
};

// Export orm object for use in models
module.exports = orm;