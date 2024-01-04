module.exports = (sequelize, DataTypes) => {

    const Setting = sequelize.define("tbl_admin", {
        admin_commission: {
            type: DataTypes.DOUBLE,
        },
    },{tableName:'tbl_admin',timestamps:false})

    return Setting

}