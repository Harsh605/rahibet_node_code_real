module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define("tbl_admin", {
        first_name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        sw_password: {
            type: DataTypes.STRING,
        },
        email_id: {
            type: DataTypes.STRING,
        },
        mobile: {
            type: DataTypes.STRING,
        },
        about_us: {
            type: DataTypes.STRING,
        },
        referral_amount: {
            type: DataTypes.INTEGER,
        },
        referral_link: {
            type: DataTypes.STRING,
        },
        referral_id: {
            type: DataTypes.STRING,
        },
        refund_policy: {
            type: DataTypes.STRING,
        },
        level_1: {
            type: DataTypes.INTEGER,
        },
        level_2: {
            type: DataTypes.INTEGER,
        },
        level_3: {
            type: DataTypes.INTEGER,
        },
        level_4: {
            type: DataTypes.INTEGER,
        },
        level_5: {
            type: DataTypes.INTEGER,
        },
        app_version: {
            type: DataTypes.STRING,
        },
        game_for_private: {
            type: DataTypes.STRING,
        },
        joining_amount: {
            type: DataTypes.INTEGER,
        },
        admin_commission: {
            type: DataTypes.DOUBLE,
        },   
        game_for_private: {
            type: DataTypes.STRING,
        },
        bonus: {
            type: DataTypes.TINYINT,
        },
        bonus_amount: {
            type: DataTypes.INTEGER,
        },
        upi_id: {
            type: DataTypes.STRING,
        },
        upi_merchant_id: {
            type: DataTypes.STRING
        },
        upi_secret_key: {
            type: DataTypes.STRING
        },
        whats_no: {
            type: DataTypes.STRING,
        },
        app_version: {
            type: DataTypes.STRING,
        },
        privacy_policy: {
            type: DataTypes.STRING,
        },
        help_support: {
            type: DataTypes.STRING,
        },
        terms: {
            type: DataTypes.STRING,
        },
        payment_gateway:{
            type: DataTypes.TINYINT,
        },
        neokred_client_secret:{
            type: DataTypes.STRING,
        },
        neokred_project_id:{
            type: DataTypes.STRING
        },
        symbol:{
            type: DataTypes.TINYINT
        },
        razor_api_key:{
            type: DataTypes.STRING
        },
        razor_secret_key:{
            type: DataTypes.STRING
        },
        cashfree_client_id:{
            type: DataTypes.STRING
        },
        cashfree_client_secret:{
            type: DataTypes.STRING
        },
        cashfree_stage:{
            type: DataTypes.STRING
        },
        paytm_mercent_id:{
            type: DataTypes.STRING
        },
        paytm_mercent_key:{
            type: DataTypes.STRING
        },
        share_text:{
            type: DataTypes.STRING
        },
        bank_detail_field:{
            type: DataTypes.STRING
        },
        adhar_card_field:{
            type: DataTypes.STRING
        },
        upi_field:{
            type: DataTypes.STRING
        },
        app_message:{
            type: DataTypes.TEXT
        },
        app_url:{
            type: DataTypes.STRING
        },
        logo:{
            type: DataTypes.STRING
        },
        payumoney_key:{
            type: DataTypes.STRING
        },
        payumoney_salt:{
            type: DataTypes.STRING
        },
        contact_us: {
            type: DataTypes.STRING,
        },
        
        
       
    },{tableName:'tbl_admin',timestamps:false})

    return Admin

}