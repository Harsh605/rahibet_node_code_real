
module.exports = function (aviator_socket, Sequelize,sequelize,current_datetime) {
    var moment = require('moment'); // require
    const user_connected=0;
    aviator_socket.on('connection', (socket) => {
        console.log('aviator connected')
        // socket.on('dragon_tiger_timer', msg => {
            // connection.connect(function (err) {
            console.log('aviator');
            // });
        // });
    });

    function randomNumber(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }
    
    setInterval(aviator_timer_function, 15000);
      
    function aviator_timer_function() {
        const random_number = randomNumber(1, 3);
        const game = sequelize.define('tbl_aviator', {
            room_id: Sequelize.INTEGER,
            main_card: Sequelize.TEXT,
            status: Sequelize.INTEGER,
            winning_amount: Sequelize.FLOAT,
            user_amount: Sequelize.FLOAT,
            comission_amount: Sequelize.FLOAT,
            total_amount: Sequelize.FLOAT,
            admin_profit: Sequelize.FLOAT,
            winning: Sequelize.INTEGER,
            added_date: Sequelize.STRING,
            updated_date: Sequelize.STRING,
            end_datetime: Sequelize.STRING,
        }, {
            tableName: 'tbl_aviator',
            timestamps: false
        });
        var end_time = moment(current_datetime).add(random_number,'seconds').format('YYYY-MM-DD HH:mm:ss');
        game.create({
            room_id: 1,
            main_card: '',
            status: 0,
            winning_amount: 0,
            user_amount: 0,
            comission_amount: 0,
            total_amount: 0,
            admin_profit: 0,
            winning: 0,
            added_date: current_datetime,
            updated_date: current_datetime,
            end_datetime: end_time
        }).then(function (res) {
            if (res) {
                const result = { 'time': random_number, 'game_id': res.id };
                aviator_socket.emit('Game', result)
                console.log(result);
            } else {
                console.log('game is not creating')
            }
        });

    }

}