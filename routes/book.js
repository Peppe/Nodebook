/*
 * POST new user.
 */
exports.add = function(db) {
  console.log("in add user");
  return function(req, res){
    console.log(req.body);
    var person = req.body;
    person._id = (1e4*(Date.now()+Math.random())).toString(16);
    console.log(person);
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
  console.log('in update');
  return function(req, res){
    console.log(req.body);
    console.log('Updating...');
    console.log(req.body._id);

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
    var errorMethod = function(err, result) {
      if (!err) {
        console.log('VR deleted!');
      } else {
        console.log('ERROR!!!1: ' + err);
      }
    };
    console.log(req.params.id);
    db.collection('users').remove( { _id:req.params.id }, function(err, result){
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
  }
};
