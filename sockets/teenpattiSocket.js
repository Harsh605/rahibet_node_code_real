
const db = require('../models')
const Sequelize  = require('sequelize');
const UserModel = db.user

module.exports = function (teenpatti_socket, request, timer) {
    
    var timeoutArr = {};
    const timeout_time = 15000;

    teenpatti_socket.on('connection', (socket) => {
        console.log("New Connection Teenpatti ",socket.id)

        socket.on('get-table', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var boot_value = msg.boot_value;
            var token = msg.token;
            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    // console.log(userData.table_id);

                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/get_table',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token,
                        'boot_value': boot_value
                        }
                    };
                    request(options, function (error, response) {
                    if (error) throw new Error(error);
                    // console.log(response.body);
                        console.log("get-table",response.body);
                        socket.emit('get-table',response.body);
                        var body = JSON.parse(response.body);
                        socket.join("room"+body.table_data[0].table_id);
                        teenpatti_socket.in("room"+body.table_data[0].table_id).emit('trigger', "call_status");
                        // console.log("get-table Tigger","room"+body.table_data[0].table_id);
                        // console.log(teenpatti_socket.sockets.adapter);
                        var clients = teenpatti_socket.adapter.rooms.get("room"+body.table_data[0].table_id);
                        var numClients = clients ? clients.size : 0;
                        console.log("No of Users - ",numClients);
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid Table';
                    socket.emit('get-table',res);
                }

            });
        });

        socket.on('get-customise-table', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var boot_value = msg.boot_value;
            var token = msg.token;
            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/get_customise_table',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token,
                        'boot_value': boot_value
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        console.log("get-customise-table",response.body);
                        socket.emit('get-customise-table',response.body);
                        var body = JSON.parse(response.body);
                        socket.join("room"+body.table_data[0].table_id);
                        teenpatti_socket.in("room"+body.table_data[0].table_id).emit('trigger', "call_status");
                        var clients = socket.sockets.adapter.rooms.get("room"+body.table_data[0].table_id);
                        var numClients = clients ? clients.size : 0;
                        console.log("No of Users - ",numClients);
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid Table';
                    socket.emit('get-customise-table',res);
                }

            });
        });

        socket.on('get-private-table', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var boot_value = msg.boot_value;
            var token = msg.token;
            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/get_private_table',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token,
                        'boot_value': boot_value
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        console.log("get-private-table",response.body);
                        socket.emit('get-private-table',response.body);
                        var body = JSON.parse(response.body);
                        socket.join("room"+body.table_data[0].table_id);
                        teenpatti_socket.in("room"+body.table_data[0].table_id).emit('trigger', "call_status");
                        var clients = socket.sockets.adapter.rooms.get("room"+body.table_data[0].table_id);
                        var numClients = clients ? clients.size : 0;
                        console.log("No of Users - ",numClients);
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid Table';
                    socket.emit('get-customise-table',res);
                }
            });
        });

        socket.on('join-table', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var table_id = msg.table_id;
            var token = msg.token;
            var res = {};
        
            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/join_table',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'table_id': table_id,
                        'token': token,
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        console.log("join-table",response.body);
                        socket.emit('join-table',response.body);
                        var body = JSON.parse(response.body);
                        socket.join("room"+body.table_data[0].table_id);
                        teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid User';
                    socket.emit('join-table',res);
                }
        
            });
        });

        socket.on('start-game', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var blind_1 = msg.blind_1;
            var token = msg.token;
            var table_id = msg.table_id;
            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                var userData = user.toJSON();
                var options = {
                    'method': 'POST',
                    'url': 'https://admin.luckystar365.in/api/game/start_game',
                    'headers': {
                    'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                    'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                    },
                    formData: {
                    'user_id': user_id,
                    'token': token,
                    }
                };
                request(options, function (error, response) {
                    if (error) throw new Error(error);
                    // console.log(response.body);
                    console.log("start-game",response.body);
                    socket.emit('start-game',response.body);
                    var body = JSON.parse(response.body);
                    if(body.game_id!==undefined){
                        teenpatti_socket.in("room"+userData.table_id).emit('trigger', ""+body.game_id);
                    }else{
                        teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                    }
                    
                });
                }
                else{
                res['code'] = 201;
                res['message'] = 'Invalid User';
                socket.emit('start-game',res);
                }

            });
        });

        socket.on('chaal', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var token = msg.token;
            var plus = msg.plus;

            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var roomname = "room"+userData.table_id;
                    teenpatti_socket.in(roomname).emit('trigger', "call_status");

                    if(timeoutArr[roomname]!==undefined){
                        console.log("Timer is Remaining - ",timeoutArr[roomname].getStateRunning())
                        timeoutArr[roomname].stop();
                    }
                    timeoutArr[roomname] = new timer(function() { autochaal(userData.table_id) }, timeout_time)
                    
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/chaal',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token,
                        'plus': plus
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        socket.emit('chaal',response.body);
                        var body = JSON.parse(response.body);
                        // console.log(body);
                        console.log("chaal",response.body);
                        // teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");

                        teenpatti_socket.in(roomname).emit('trigger', "call_status");

                        // var bot_timeout = 0;
                        // if(body.bot!==undefined && body.bot==1){
                            // new timer(function() { teenpatti_socket.in(roomname).emit('trigger', "call_status"); }, 10)
                            // bot_timeout = 10;
                        // }

                        if(timeoutArr[roomname]!==undefined){
                            console.log("Timer is Remaining - ",timeoutArr[roomname].getStateRunning())
                            timeoutArr[roomname].stop();
                        }
                        if(body.message!='Pot Show'){
                            timeoutArr[roomname] = new timer(function() { autochaal(userData.table_id) }, timeout_time)
                        }
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid User';
                    socket.emit('chaal',res);
                }

            });
        });

        socket.on('show-game', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var token = msg.token;

            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/show_game',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token,
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        console.log("show-game",response.body);
                        socket.emit('show-game',response.body);
                        var body = JSON.parse(response.body);
                        var roomname = "room"+userData.table_id;
                        teenpatti_socket.in(roomname).emit('trigger', "call_status");

                        if(timeoutArr[roomname]!==undefined){
                            console.log("Timer is Remaining - ",timeoutArr[roomname].getStateRunning())
                            timeoutArr[roomname].stop();
                        }
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid User';
                    socket.emit('show-game',res);
                }
            });
        });

        socket.on('do-slide-show', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var token = msg.token;
            var slide_id = msg.slide_id;
            var type = msg.type;

            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/do_slide_show',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token,
                        'slide_id': slide_id,
                        'type': type,
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        console.log("do-slide-show",response.body);
                        socket.emit('do-slide-show',response.body);
                        var body = JSON.parse(response.body);
                        teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid User';
                    socket.emit('do-slide-show',res);
                }
            });
        });

        socket.on('slide-show', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var token = msg.token;
            var prev_user_id = msg.prev_user_id;

            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/slide_show',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token,
                        'prev_user_id': prev_user_id,
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        console.log("slide-show",response.body);
                        socket.emit('slide-show',response.body);
                        var body = JSON.parse(response.body);
                        teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid User';
                    socket.emit('slide-show',res);
                }
            });
        });

        socket.on('switch-table', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var token = msg.token;

            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/switch_table',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        console.log("switch-table",response.body);
                        socket.emit('switch-table',response.body);
                        var body = JSON.parse(response.body);
                        teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid User';
                    socket.emit('switch-table',res);
                }
            });
        });

        socket.on('see-card', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var token = msg.token;

            var res = {};

            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                    var userData = user.toJSON();
                    var options = {
                        'method': 'POST',
                        'url': 'https://admin.luckystar365.in/api/game/see_card',
                        'headers': {
                        'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                        'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                        },
                        formData: {
                        'user_id': user_id,
                        'token': token
                        }
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        // console.log(response.body);
                        console.log("see-card",response.body);
                        socket.emit('see-card',response.body);
                        var body = JSON.parse(response.body);
                        teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                    });
                }
                else{
                    res['code'] = 201;
                    res['message'] = 'Invalid User';
                    socket.emit('see-card',res);
                }
            });
        });

        socket.on('leave-table', msg => {
        // socket.join("");
        var user_id = msg.user_id;
        var token = msg.token;
        var game_id = msg.game_id;

        var res = {};

        UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
            if (user) {
            var userData = user.toJSON();
            var options = {
                'method': 'POST',
                'url': 'https://admin.luckystar365.in/api/game/leave_table',
                'headers': {
                'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                },
                formData: {
                'user_id': user_id,
                'token': token,
                }
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                // console.log(response.body);
                console.log("leave-game",response.body);
                socket.emit('leave-table',response.body);
                var body = JSON.parse(response.body);
                teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                socket.leave("room"+userData.table_id);
            });
            }
            else{
            res['code'] = 201;
            res['message'] = 'Invalid User';
            socket.emit('leave-table',res);
            }
        });
        });

        socket.on('pack-game', msg => {
        // socket.join("");
        var user_id = msg.user_id;
        var game_id = msg.game_id;
        var timeout = msg.timeout;
        var token = msg.token;

        var res = {};

        UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
            if (user) {
            var userData = user.toJSON();
            var options = {
                'method': 'POST',
                'url': 'https://admin.luckystar365.in/api/game/pack_game',
                'headers': {
                'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                },
                formData: {
                'user_id': user_id,
                'token': token,
                'timeout': timeout,
                }
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                // console.log(response.body);
                console.log("pack-game",response.body);
                socket.emit('pack-game',response.body);
                // console.log(response.body);
                var body = JSON.parse(response.body);
                teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
            });
            }
            else{
            res['code'] = 201;
            res['message'] = 'Invalid User';
            socket.emit('pack-game',res);
            }
        });
        });

        socket.on('tip', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var tip = msg.tip;
            var token = msg.token;
    
            var res = {};
    
            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                var userData = user.toJSON();
                var options = {
                    'method': 'POST',
                    'url': 'https://admin.luckystar365.in/api/game/tip',
                    'headers': {
                    'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                    'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                    },
                    formData: {
                    'user_id': user_id,
                    'token': token,
                    'tip': tip,
                    }
                };
                request(options, function (error, response) {
                    if (error) throw new Error(error);
                    // console.log(response.body);
                    console.log("tip",response.body);
                    socket.emit('tip',response.body);
                    // console.log(response.body);
                    var body = JSON.parse(response.body);
                    teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                });
                }
                else{
                res['code'] = 201;
                res['message'] = 'Invalid User';
                socket.emit('tip',res);
                }
            });
        });

        socket.on('chat', msg => {
            // socket.join("");
            var user_id = msg.user_id;
            var chat = msg.chat;
            var token = msg.token;
    
            var res = {};
    
            UserModel.findOne({ where: { id: user_id, token: token, isDeleted: 0 }}).then(user => {
                if (user) {
                var userData = user.toJSON();
                var options = {
                    'method': 'POST',
                    'url': 'https://admin.luckystar365.in/api/game/chat',
                    'headers': {
                    'token': 'c7d3965d49d4a59b0da80e90646aee77548458b3377ba3c0fb43d5ff91d54ea28833080e3de6ebd4fde36e2fb7175cddaf5d8d018ac1467c3d15db21c11b6909',
                    'Cookie': 'ci_session=ql4u3d0569peintlo3clko0vftbg0ni2; ci_session=mmo9qqjgcpk00r04ll9dcqaohrir95pe'
                    },
                    formData: {
                    'user_id': user_id,
                    'token': token,
                    'chat': chat,
                    }
                };
                request(options, function (error, response) {
                    if (error) throw new Error(error);
                    // console.log(response.body);
                    console.log("chat",response.body);
                    socket.emit('chat',response.body);
                    // console.log(response.body);
                    var body = JSON.parse(response.body);
                    teenpatti_socket.in("room"+userData.table_id).emit('trigger', "call_status");
                });
                }
                else{
                res['code'] = 201;
                res['message'] = 'Invalid User';
                socket.emit('chat',res);
                }
            });
        });

        socket.on("disconnect", (reason) => {
            console.log("User Disconnected - " + socket.id + " reason - " + reason);
        });

        function autochaal(room_id){
            var options = {
                'method': 'GET',
                'url': 'https://admin.luckystar365.in/api/cron/teenpatti_socket/'+room_id
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                // console.log(response.body);
                console.log("auto-chaal",response.body);
                teenpatti_socket.in("room"+room_id).emit('trigger', "call_status");
                var roomname = "room"+room_id;

                timeoutArr[roomname].stop();

                var clients = teenpatti_socket.adapter.rooms.get("room" + room_id);
                var numClients = clients ? clients.size : 0;
                console.log("Stop Autochaal No of Users - ", numClients);
                if(numClients>1){
                    timeoutArr[roomname] = new timer(function() { autochaal(room_id) }, timeout_time)
                }
            });
        }
    });
}
