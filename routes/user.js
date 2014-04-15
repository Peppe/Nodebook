/*
 * POST new user.
 */
exports.add = function(req, res){
  res.send("respond with a resource");
};


/*
 * GET users listing.
 */
exports.users = function(db) {
  return function(req, res){

    db.collection('users').find().toArray(function (err, items) {
      res.json(items);
    });
  }
};

/*
 * UPDATE user.
 */
exports.update = function(req, res){
  res.send("respond with a resource");
};


/*
 * DELETE user.
 */
exports.delete = function(req, res){
  res.send("respond with a resource");
};
