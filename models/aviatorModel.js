module.exports = (sequelize, DataTypes) => {

    const Aviator = sequelize.define("tbl_aviator_bet", {
        bet: {
            type: DataTypes.INTEGER,
        },
        dragon_tiger_id: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        user_amount: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        comission_amount: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        winning_amount: {
            type: DataTypes.TEXT,
            allowNull:true
        },
        amount: {
        type:DataTypes.FLOAT
        },
        added_date:{
            type:DataTypes.TEXT
        },        
    },{
        tableName:'tbl_aviator_bet',
        timestamps:false
    })

    return Aviator

}