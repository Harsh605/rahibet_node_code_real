const db = require('../../models')
var format = require('date-format');
const Sequelize  = require('sequelize');
const UserModel = db.user
const GameModel = db.game
const SettingModel = db.setting
const jwt = require('jsonwebtoken');


// 1. Betting

const addUser =  async (req, res) => {
    if(!req.body.mobile || !req.body.name || !req.body.password){
        return res.status(200).send({code:100,message:"Invalid Parameter"})
    }
    const user=await getUser(req.body.mobile)
    if(user){
        return res.status(200).send({code:404,message:"User Already exists."})
    }
    let info = {
        name: req.body.name,
        mobile: req.body.mobile,
        user_type:0,
        password: req.body.password,
        added_date:format.asString(new Date()),
    }
    const result =  await UserModel.create(info)
    res.status(200).send(result)

}

const login =  async (req, res) => {
    if(!req.body.mobile || !req.body.password){
        return res.status(200).send({code:100,message:"Invalid Parameter"})
    }
    try {
        const user = await UserModel.findOne({ mobile: req.body.mobile });
        if (user) {
          const userData = { ...user.toJSON() };
            if (req.body.password==user.password) {
              delete userData.password;
              jwt.sign({userData},process.env.JWTKEY,(err,token)=>{
                if(err){
                  return res.status(200).json({
                    code: '406',
                    message: err,
                  });
                }
                else{
                return res.status(200).json({
                  code: '200',
                  message: 'You Have Successfully Logged In',
                  userData,
                  token: token,
                });
              }
              })
              
          } else {
            return res.status(200).json({
              code: '406',
              message: 'Please Enter Valid Password',
            });
          }
        } else {
          return res.status(200).json({
            code: '406',
            message: 'Please Enter Valid Mobile Number',
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
          code: '500',
          message: error,
        });
      }
}

// 3. get user
const getUser = (mobile) => {
    return  UserModel.findOne({ where: { mobile: mobile }})
}

// 3. get user
const getUserLogin = (req) => {
    return  UserModel.findOne({ where: { password: req.body.password, [Sequelize.or]: [
        { mobile: req.body.user_name },
        { email: req.body.user_name }
      ]}})
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


// public function login_post()
// {
//     $user = $this->Users_model->LoginUser($this->data['mobile'],$this->data['password']);
//     if($user)
//     {
//         if($user[0]->status==1)
//         {
//             $data['message'] = 'You are blocked, Please contact to admin';
//             $data['code'] = HTTP_NOT_FOUND;
//             $this->response($data, HTTP_OK);
//             exit();
//         }

//         $data['message'] = 'Success';
//         $data['user_data'] = $user;
//         $data['code'] = HTTP_OK;
//         $this->response($data, HTTP_OK);
//         exit();
//     }
//     else
//     {
//         if($this->Users_model->UserProfileByMobile($this->data['mobile']))
//         {
//             $data['message'] = 'Incorrect Password';
//             $data['code'] = 408;
//             $this->response($data, HTTP_OK);
//             exit();
//         }
//         else
//         {
//             $data['message'] = 'User Not Found With This Mobile Number';
//             $data['code'] = HTTP_NOT_FOUND;
//             $this->response($data, HTTP_OK);
//             exit();
//         }
//     }
// }


// 5. delete product by id

const deleteUser = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}

module.exports = {
    addUser,
    login
}