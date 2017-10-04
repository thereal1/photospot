const { authenticate } = require('../../middleware/authenticate')

module.exports = (app, db) => {

    // CREATE

    app.post('/spots', (req, res) => {
        db.spots.create({
            user_id: req.body.user_id,
            lat: req.body.lat,
            lon: req.body.lon,
            upvotes: 0,            
            description: req.body.description,
            photo_url: req.body.photo_url
        })
            .then(post => res.status(200).send())
            .catch(e => res.status(400))
    })



    // DELETE

    app.delete('/spots/delete/', (req, res) => {
        db.spots.destroy({
            where: { id: req.body.id }
        })
            .then(post => res.status(200).send())
            .catch(e => res.status(400))
    })



    // RETREIVE

    app.get('/spots/initial', (req, res) => {
        db.sequelize.query('SELECT spots.id, spots.lat, spots.lon, spots.upvotes, spots.description, spots.created_at, spots."photo_url", spots.user_id, users.username FROM spots JOIN users ON users.id = spots.user_id GROUP BY spots.id, users.username ORDER BY spots.id DESC LIMIT 15')
            .then(spots => res.status(200).json(spots))
            .catch(e => res.status(404))
    })

    app.get('/spots/newer/:id', (req, res) => {
        db.sequelize.query(`SELECT spots.id, spots.lat, spots.lon, spots.upvotes, spots.description, spots.created_at, spots."photo_url", users.username, spots.user_id FROM spots JOIN users ON users.id = spots.user_id WHERE spots.id > ${req.params.id} GROUP BY spots.id, users.username ORDER BY spots.id DESC LIMIT 15`)
            .then(spots => res.status(200).json(spots))
            .catch(e => res.status(404))
    })

    // ?????
    // app.get('/spots/newer/:id/:lowest_post_id', (req, res) => {
    //   db.sequelize.query(`SELECT spots.id, spots.created_at, spots.text, users.username, spots.user_id, array_agg(likes.user_id) AS likersids FROM spots JOIN users ON users.id = spots.user_id LEFT JOIN likes ON likes.post_id = spots.id WHERE spots.id > ${req.params.id} GROUP BY spots.id, users.username ORDER BY spots.id DESC LIMIT 15`)
    //     .then (spots => {
    //       db.sequelize.query(`SELECT spots.id, array_agg(likes.user_id) AS likersids FROM spots LEFT JOIN likes ON likes.post_id = spots.id WHERE spots.id >= ${req.params.lowest_post_id} GROUP BY spots.id ORDER BY spots.id DESC`)
    //         .then (likes => res.status(200).json({spots, likes}))
    //     })
    //     .catch (e => res.status(404))
    // })

    app.get('/spots/older/:id', (req, res) => {
        db.sequelize.query(`SELECT spots.id, spots.lat, spots.lon, spots.upvotes, spots.description, spots.created_at, spots."photo_url", users.username, spots.user_id FROM spots JOIN users ON users.id = spots.user_id WHERE spots.id < ${req.params.id} GROUP BY spots.id, users.username ORDER BY spots.id DESC LIMIT 15`)
            .then(spots => res.status(200).json(spots))
            .catch(e => res.status(404))
    })

    app.get('/spots/initial/:user_id', (req, res) => {
        db.sequelize.query(`SELECT spots.id, spots.lat, spots.lon, spots.upvotes, spots.description, spots.created_at, spots."photo_url" users.username, spots.user_id FROM spots JOIN users ON users.id = spots.user_id WHERE users.id = ${req.params.user_id} GROUP BY spots.id, users.username ORDER BY spots.id DESC LIMIT 15`)
            .then(spots => res.status(200).json(spots))
            .catch(e => res.status(404))
    })

    app.get('/spots/newer/:user_id/:id', (req, res) => {
        db.sequelize.query(`SELECT spots.id, spots.lat, spots.lon, spots.upvotes, spots.description, spots.created_at, spots."photo_url", users.username, spots.user_id FROM spots JOIN users ON users.id = spots.user_id WHERE spots.id > ${req.params.id} AND users.id = ${req.params.user_id} GROUP BY spots.id, users.username ORDER BY spots.id DESC LIMIT 15`)
            .then(spots => res.status(200).json(spots))
            .catch(e => res.status(404))
    })

    app.get('/spots/older/:user_id/:id', (req, res) => {
        db.sequelize.query(`SELECT spots.id, spots.lat, spots.lon, spots.upvotes, spots.description, spots.created_at, spots."photo_url", users.username, spots.user_id FROM spots JOIN users ON users.id = spots.user_id WHERE spots.id < ${req.params.id} AND users.id = ${req.params.user_id} GROUP BY spots.id, users.username ORDER BY spots.id DESC LIMIT 15`)
            .then(spots => res.status(200).json(spots))
            .catch(e => res.status(404))
    })

}
