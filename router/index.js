const routes = [
    require('./routes/users'),
    require('./routes/spots')
]
  
module.exports = function router (app, db) {
    return routes.forEach((route) => {
        route(app, db)
    })
}