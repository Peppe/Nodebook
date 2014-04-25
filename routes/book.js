/*
 * POST new user.
 */
exports.add = function(db) {
  return function(req, res){
    var person = req.body;
    person._id = (1e4*(Date.now()+Math.random())).toString(16);
    db.collection('users').insert(person, function(err, result){
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
exports.update = function(db){
  return function(req, res){
    db.collection('users').update( { _id:req.body._id }, req.body, function(err, result){
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
  }
};


/*
 * DELETE user.
 */
exports.delete = function(db){
  return function(req, res){
    db.collection('users').remove( { _id:req.params.id }, function(err, result){
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
  }
};
