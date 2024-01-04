module.exports = (sequelize, DataTypes) => {

    const Game = sequelize.define("tbl_aviator", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true
        },
        winning_amount: {
            type: DataTypes.FLOAT,
        },
        user_amount: {
            type: DataTypes.FLOAT,
        },
        comission_amount: {
            type: DataTypes.FLOAT,
        },
        main_card:{
            type:DataTypes.TEXT
        }
    },{ tableName:'tbl_aviator',timestamps:false})

    return Game

}