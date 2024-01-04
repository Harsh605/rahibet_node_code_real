const express = require('express')
require("dotenv").config();
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
var dateTime = require('node-datetime');
const dbConfig = require('./config/dbConfig.js');
const Sequelize = require('sequelize');
var request = require('request');
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    logging: false,
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
  }
);

sequelize.authenticate()
sequelize.options.logging = false

const cors = require('cors');
app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads",express.static('uploads'))
// app.use(bodyParser.urlencoded({extended: true}))



var dt = dateTime.create();
var current_datetime = dt.format('Y-m-d H:M:S');
//routers
// const router = require('./routes/socketRouter')
const aviatorRouter = require('./routes/aviatorRouter');
// aviatorRouter.addAviator
//use

// app.use('/api/websocket', router)
app.use('/api', aviatorRouter)
//api

//socket instances
const ander_bahar_socket=io.of('/ander_bahar')
const seven_up_down_socket=io.of('/seven_up_down')
const ander_bahar_plus_socket=io.of('/ander_bahar_plus')
const animal_roulette_socket=io.of('/animal_roulette')
const baccarat_socket=io.of('/baccarat')
const car_roulette_socket=io.of('/car_roulette')
const color_prediction_socket=io.of('/color_prediction')
const color_prediction_1min_socket=io.of('/color_prediction_1min')
const color_prediction_3min_socket=io.of('/color_prediction_3min')
const dragon_tiger_socket=io.of('/dragon_tiger')
const golden_wheel_socket=io.of('/golden_wheel')
const head_tail_socket=io.of('/head_tail')
const jackpot_socket=io.of('/jackpot')
const jhandi_munda_socket=io.of('/jhandi_munda')
const red_black_socket=io.of('/red_black')
const roulette_socket=io.of('/roulette')
const target_socket=io.of('/target')

const teenpatti_socket=io.of('/teenpatti')
const rummy_socket=io.of('/rummy')
const rummy_pool_socket=io.of('/rummy_pool')
const rummy_deal_socket=io.of('/rummy_deal')

const aviator_socket=io.of('/aviator')

function timer(callback, delay) {
  // console.log(callback)
  var id, started, remaining = delay, running

  this.start = function() {
      running = true
      started = new Date()
      id = setTimeout(callback, remaining)
  }

  this.pause = function() {
      running = false
      clearTimeout(id)
      remaining -= new Date() - started
  }

  this.stop = function() {
    running = false
    clearTimeout(id)
    remaining = 0
  }

  this.getTimeLeft = function() {
    if (running) {
        this.pause()
        this.start()
    }

    return remaining
  }

  this.getStateRunning = function() {
      return running
  }

  this.start()
}

//Sockets
require('./sockets/anderBaharSocket.js')(ander_bahar_socket,request)
require('./sockets/anderBaharPlusSocket.js')(ander_bahar_plus_socket,request)
require('./sockets/sevenUpDownSocket.js')(seven_up_down_socket,request)
require('./sockets/animalRouletteSocket.js')(animal_roulette_socket,request)
require('./sockets/baccaratSocket.js')(baccarat_socket,request)
require('./sockets/carRouletteSocket.js')(car_roulette_socket,request)
require('./sockets/colorPredictionSocket.js')(color_prediction_socket,request)
require('./sockets/colorPrediction1MinSocket.js')(color_prediction_1min_socket,request)
require('./sockets/colorPrediction3MinSocket.js')(color_prediction_3min_socket,request)
require('./sockets/dragonTigerSocket.js')(dragon_tiger_socket,request)
require('./sockets/goldenWheelSocket.js')(golden_wheel_socket,request)
require('./sockets/headTailSocket.js')(head_tail_socket,request)
require('./sockets/jackpotSocket.js')(jackpot_socket,request)
require('./sockets/jhandiMundaSocket.js')(jhandi_munda_socket,request)
require('./sockets/redBlackSocket.js')(red_black_socket,request)
require('./sockets/rouletteSocket.js')(roulette_socket,request)
require('./sockets/targetSocket.js')(target_socket,request)

require('./sockets/teenpattiSocket.js')(teenpatti_socket, request, timer)
require('./sockets/rummySocket.js')(rummy_socket, request, timer)
require('./sockets/rummyPoolSocket.js')(rummy_pool_socket, request, timer)
require('./sockets/rummyDealSocket.js')(rummy_deal_socket, request, timer)

require('./sockets/aviatorSocket.js')(aviator_socket,Sequelize,sequelize,current_datetime)

//port

const PORT = process.env.PORT || 3002

//server 

server.listen(PORT, () => {
  console.log(`server is runnig ${PORT}`)
})
