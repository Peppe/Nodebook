/*
 * POST new user.
 */
exports.add = function(db) {
  console.log("in add user");
  return function(req, res){
    console.log(req.body);
    db.collection('users').insert(req.body, function(err, result){
      console.log('db adding done, result:' + err);
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
  }
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
