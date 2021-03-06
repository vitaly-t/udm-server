module.exports = (prefixes, session, autobahn, _udm) => new Promise((resolve, reject) => {
  const create = args => {
    const d = autobahn.when.defer();
    const user = args[0];
    _udm.user.create(user)
      .then( user => d.resolve(user))
      .catch( err => d.reject(err) );

    return d.promise;
  };
  const remove = args => {
    const d = autobahn.when.defer();
    const userId = args[0];
    _udm.user.remove(userId)
      .then( userId => d.resolve(userId))
      .catch( err => d.reject(err) );

    return d.promise;
  };
  const login = args => {
    const d = autobahn.when.defer();
    const user = args[0];
    _udm.user.login(user.username)
      .then( user => d.resolve(user))
      .catch( err => d.reject(err) );

    return d.promise;
 
  };
  const retrieve = args => {       
    const d = autobahn.when.defer();
    const userIdOrName = args[0];
    _udm.user.retrieve(userIdOrName)
      .then( user => d.resolve(user))
      .catch( err => d.reject(err) );

    return d.promise;
  };
  const update = args => {
    const d = autobahn.when.defer();
    const user = [0]
    _udm.user.update(user.id, user)
      .then( user => d.resolve(user))
      .catch( err => d.reject(err) );

    return d.promise;
  };
  const prefix = prefixes.api + '.' + prefixes.domain;
  console.log("---------------------------------------------------");
  console.log("registering methods for " + prefix);
  console.log("---------------------------------------------------");
  const endpoints = [
    {name: 'create', cb: create},
    {name: 'remove', cb: remove},
    {name: 'login', cb: login},
    {name: 'retrieve', cb: retrieve},
    {name: 'update', cb:update}
  ];
  const promises = endpoints.map(endpoint => {
    const fqn = prefix + '.' + endpoint.name;

    console.log(fqn);
    session.register(fqn, endpoint.cb)
  })
  Promise.all(promises)
    .then(() => resolve() )
    .catch( err => reject(err));
});
