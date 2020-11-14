// GET /entries
connection.query('SELECT * FROM entries', function (error, results, fields) {
  if (error) throw error;
  console.log('Results', results);
});


// GET /entries/:entryId
connection.query('SELECT * FROM entries WHERE id = ?', [entryId], function (error, results, fields) {
  if (error) throw error;
  // ...
});


// POST /entries
const entry  = { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' };
const query = connection.query('INSERT INTO entries SET ?', entry, function (error, results, fields) {
  if (error) throw error;

  console.log(results.insertId);
});
console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'


// PUT /entries/:entryId
connection.query('UPDATE entries SET text = ?, otherProperty = ? WHERE id = ?', ['Lorem ipsum, 'another prop value', entryId], function (error, results, fields) {
  if (error) throw error;
  // ...
});
// question: can we do this one like previous one, using object?


// DELETE /entries/:entryId
connection.query('DELETE FROM entries WHERE id = ?', [entryId], function (error, results, fields) {
  if (error) throw error;
  console.log('deleted ' + results.affectedRows + ' rows');
})


// Statements referenced from: https://www.npmjs.com/package/mysql
