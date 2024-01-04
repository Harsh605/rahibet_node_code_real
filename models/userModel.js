module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("tbl_users", {
        wallet: {
            type: DataTypes.FLOAT,
            defaultValue:0
        },
        user_type: {
            type: DataTypes.INTEGER,
            allowNull:true
        },
        name: {
            type: DataTypes.STRING,
        },
        bank_detail: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        adhar_card: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        upi: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        mobile: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        source: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        gender: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        profile_pic: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        referral_code: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        referred_by: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        unutilized_wallet: {
            type: DataTypes.DOUBLE,
            allowNull:true,
            defaultValue:0,
            
        },
        winning_wallet: {
            type: DataTypes.DOUBLE,
            allowNull:true,
            defaultValue:0
        },
        bonus_wallet: {
            type: DataTypes.DOUBLE,
            allowNull:true,
            defaultValue:0
        },
        spin_remaining: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        fcm: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        table_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0

        },
        poker_table_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        head_tail_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        rummy_table_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        ander_bahar_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        dragon_tiger_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        jackpot_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        seven_up_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        rummy_pool_table_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        rummy_deal_table_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        color_prediction_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        color_prediction_1_min_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        color_prediction_3_min_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        car_roulette_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        animal_roulette_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        ludo_table_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        red_black_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        baccarat_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        jhandi_munda_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        roulette_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        rummy_tournament_table_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        target_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }
        ,
        ander_bahar_plus_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        golden_wheel_room_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        game_played: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        token: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }, 
        premium: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        app_version: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }, 
        user_category_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }, 
        unique_token: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
        }, 
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        }, 
        added_date: {
            type: DataTypes.STRING,
            allowNull:true
        },
         updated_date: {
            type: DataTypes.STRING,
            allowNull:true
        },
    },{timestamps:false})

    return User

}