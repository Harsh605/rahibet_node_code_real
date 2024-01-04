const db = require('../../models')
var format = require('date-format');
const Sequelize  = require('sequelize');
const BetModel = db.aviator
const UserModel = db.user
const GameModel = db.game
const SettingModel = db.setting

// 1. Betting
const addBet =  async (req, res) => {
    if(!req.body.user_id || !req.body.amount || !req.body.game_id){
        return res.status(200).send({code:100,message:"Invalid Parameter"})
    }
    const user=await getUser(req.body.user_id)
    if(!user){
        return res.status(200).send({code:404,message:"Invalid User"})
    }
    const game= await getGame(req.body.game_id);
    // console.log(game)
    if(!game){
        return res.status(200).send({code:101,message:"Invalid Game Id"})
    }
    if (user.wallet<req.body.amount) {
        return res.status(200).send({code:102,message:"Insufficient Wallet Amount"})
    }
    let info = {
        dragon_tiger_id: req.body.game_id,
        user_id: req.body.user_id,
        bet: 0,
        amount: req.body.amount,
        winning_amount:0,
        user_amount:0,
        comission_amount:0,
        added_date:format.asString(new Date()),
    }
    const result =  await BetModel.create(info)
    if(result){
        minusAmount((user.wallet-req.body.amount),req.body.user_id)
    }
    res.status(200).send(result)

}


const userInfo =  async (req, res) => {
    if(!req.body.user_id){
        return res.status(200).send({code:100,message:"Invalid Parameter"})
    }
    const user=await getUser(req.body.user_id)
    if(!user){
        return res.status(200).send({code:404,message:"Invalid User"})
    }
    res.status(200).send(user)

}


// 2. get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}

// 3. get user
const getUser = (user_id) => {
    return  UserModel.findOne({ where: { id: user_id }})
}
// bet table
const getGame =  (game_id) => {
    return GameModel.findOne({ where: { id: game_id }})
}

// get bet amount
const getBetAmount =  (bet_id) => {
    return BetModel.findOne({ where: { id: bet_id }})
}


const getSetting =  (admin_id) => {
    return SettingModel.findOne({ where: { id: admin_id }})
}

// 4. minus amount after betting

const redeem =  async (req,res) => {
    const setting=await getSetting(1)
    // console.log(setting.admin_commission);
    let multiplyAmount=req.body.amount;
    let user_id=req.body.user_id;
    let bet_id=req.body.bet_id;
    let game_id=req.body.game_id;
    if(!multiplyAmount || !user_id || !bet_id || !game_id){
        return res.status(200).send({code:100,message:"Invalid Parameter"})
    }
    const betAmount=await getBetAmount(bet_id);
    let amount= betAmount.amount*multiplyAmount;
    let admin_winning_amt = (amount * (setting.admin_commission/100).toFixed(2));
    let user_winning_amt = (amount - admin_winning_amt).toFixed(2);
    let bet_info = {
        winning_amount:amount,
        user_amount:user_winning_amt,
        comission_amount:admin_winning_amt,
    }
    BetModel.update(bet_info, { where: { user_id: user_id ,id:bet_id}})
    // Sequelize.sync({ logging: console.log })

    let game_info = {
        winning_amount:Sequelize.literal('winning_amount+'+amount),
        user_amount:Sequelize.literal('user_amount+'+user_winning_amt),
        comission_amount:Sequelize.literal('comission_amount+'+admin_winning_amt),
    }
    GameModel.update(game_info, { where: { id: game_id}})
    let user_info = {
        wallet:Sequelize.literal('wallet+'+user_winning_amt),
        winning_wallet:Sequelize.literal('winning_wallet+'+user_winning_amt),
        // updated_date:format.asString(new Date()),
    }
    UserModel.update(user_info, { where: { id: user_id}})
    return res.status(200).send({code:200,data:await getUser(user_id),message:"Redeemd success"})
}


// 4. minus amount after betting

const minusAmount =  (amount, user_id) => {
    let info = {
        wallet:amount,
        updated_date:format.asString(new Date()),
    }
    return UserModel.update(info, { where: { id: user_id }})
}

// 4. update winning amount

const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id }})

    res.status(200).send(product)
   

}

// 5. delete product by id

const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products =  await Product.findAll({ where: { published: true }})

    res.status(200).send(products)

}

// 7. connect one to many relation Product and Reviews

const getProductReviews =  async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}

module.exports = {
    addBet,
    redeem,
    userInfo
}