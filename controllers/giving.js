const axios = require('axios');
const givingModel = require('../models/giving')
const givingController  = {
    index: (req, res) => {
        res.render('index')
    },

    giving: async (req, res, next) => {
        console.log('pay-by-prime');
        const post_data = {
            "prime": req.body.prime,
            "partner_key": "partner_FS6F79MtMnfUBKc3dinh6eOoT1QLdCltZb4slfzpBQuAdrCq3Pd5ViQA",
            "merchant_id": "thehopedev_CTBC",
            "amount": req.body.amount,
            "currency": req.body.currency,
            "details": "Test Giving.",
            "cardholder": {
                "phone_number": "+886923456789",
                "name": "王小明",
                "email": "LittleMing@Wang.com",
            },
            "remember": false
        }
        console.log(post_data.currency)
        console.log(post_data.cardholder.name)
        console.log(req.body.prime)
        console.log(req.body.amount)
        // const { name, phone_number, email } = req.body.cardholder
        try {
            const response = await axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', { // 替换为你要调用的外部API的URL
                "prime": req.body.prime,
                "partner_key": "partner_FS6F79MtMnfUBKc3dinh6eOoT1QLdCltZb4slfzpBQuAdrCq3Pd5ViQA",
                "merchant_id": "thehopedev_CTBC",
                "amount": req.body.amount,
                "currency": req.body.currency,
                "details": "Test Giving.",
                "cardholder": {
                    "phone_number": "+886923456789",
                    "name": "王小明",
                    "email": "LittleMing@Wang.com",
                },
                // "cardholder": req.body.cardholder,
                "remember": false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'partner_FS6F79MtMnfUBKc3dinh6eOoT1QLdCltZb4slfzpBQuAdrCq3Pd5ViQA'
                }
            });
    
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是從0開始的，所以要加1
            const day = String(date.getDate()).padStart(2, '0');
    
            const datetime = `${year}-${month}-${day}`;
    
            const externalResponse = response.data;
            // res.json(externalResponse);
            console.log(externalResponse);
            console.log(externalResponse.msg)  //Success
            
            console.log(post_data.currency)
            console.log(post_data.cardholder.name)
            console.log(post_data.amount)
            console.log(post_data.cardholder.phone_number)
            console.log(datetime)
            console.log(post_data.cardholder.email)
            // givingModel.add(post_data.cardholder.name, post_data.amount, post_data.currency, datetime, post_data.cardholder.phone_number, post_data.cardholder.email, (err) => {
            //     if (err) return console.log(err)
            // })
            res.status(200).json(externalResponse);
        } catch (error) {
            console.error('Error sending data to external API:', error);
            res.status(500).json({ error: 'Failed to send data to external API' });
        }
    }
}

module.exports = givingController