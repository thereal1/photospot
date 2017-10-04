const { authenticate } = require('../../middleware/authenticate')
const User = require('../../models/User')

module.exports = (app, db) => {


    // AUTHENTICATION

    app.post('/users/register', (req, res) => {
        db.users.create({
            email: req.body.email,
            password: req.body.password,
            profile_image_url: req.body.profile_image_url
        })
            .then(user => {
                return user.generateAuthToken()
                    .then(token => {
                        return { 'token': token, 'user': user }
                    })
            })
                .then(token => res.set('x-auth', token.token.token).json(token.user))
                .catch(e => res.status(400).json(e));
    });

    app.post('/users/login', (req, res) => {
        db.users.findByCredentials(req.body.email, req.body.password)
            .then(user => {
                return db.tokens.destroy({
                    where: { user_id: user.id }
                })
                    .then(token => user.generateAuthToken())
                    .then(token => {
                        return { 'token': token, 'user': user };
                    })
            })
                .then(tkn => res.set('x-auth', tkn.token.token).json(tkn.user))
                .catch(e => res.status(400).send())
    })



    // DELETE

    app.delete('/users/delete/:id', (req, res) => {
        db.users.destroy({
            where: { id: req.params.id }
        })
            .then(post => res.status(200).send())
            .catch(e => res.status(400))
    })



    // UPDATE

    app.patch('/users/update/profileImage', (req, res) => {
        db.users.update(
            { where: { id: req.body.user_id } },
            { profile_image_url: req.body.profile_image_url }
        )
            .then(user => res.status(200).send())
            .catch(e => res.status(400))
    })

    app.patch('/users/update/coordinates', (req, res) => {
        db.users.update(
            { where: { id: req.body.user_id } },
            {
                lat: req.body.lat,
                lon: req.body.lon
            }
        )
            .then(user => res.status(200).send())
            .catch(e => res.status(400))            
    })



    // RETREIVE

    app.get('/users/:id', (req, res) => {
        db.users.findOne({
            where: {
                id: { $eq: req.params.id }
            }
        })
            .then(user => res.status(200).json(user))
            .catch(e => res.status(400).json(e))
    })

    app.get('/users/newer/:id', (req, res) => {
        db.users.findAll({
            order: [
                ['id', 'DESC']
            ],
            where: {
                id: { $gt: req.params.id }
            },
            limit: 30
        })
            .then(users => res.status(200).json(users))
            .catch(e => res.status(400).json(e))
    })

    app.get('/users/older/:id', (req, res) => {
        db.users.findAll({
            order: [
                ['id', 'DESC']
            ],
            where: {
                id: { $lt: req.params.id }
            },
            limit: 30
        })
            .then(users => res.status(200).json(users))
            .catch(e => res.status(400).json(e))
    })

    
    // POINTLESS ?

    app.get('/users/find/:email', (req, res) => {
        db.users.findAll ({
            where: {
                email: { $like: `%${req.params.email}%` }
            },
            limit: 30
        })
            .then(users => res.status(200).json(users))
            .catch(e => res.status(400).json(e))
    })

}
