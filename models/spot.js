module.exports = (sequelize, DataTypes) => {
    
    const Spot = sequelize.define('spot', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lat: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lon: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        upvotes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.CHAR(140),
            allowNull: false
        },
        photo_url: {
            type: DataTypes.STRING,
            allowNull: true,
            isUrl: true
        }
    }, {
        paranoid: false,
        underscored: true
    })

    return Spot
}
    