const { response } = require("express");
const stripe = require("stripe")("sk_test_51IrxfTFhAO44cnt8UgckxiEBwEtAeKalt7hGSKSSUXB2cBkxGpg7kqjJjMIKUSMF7GL49lRDKjMeKQXhxbwftV4O0008PV7NRr")
const uuid = require("uuid").v4

//Add Latest news 
const addPayment = async (req, res) => {
    
    const {payment , token } = req.body;
    // console.log("Payment",payment);
    // console.log("Price",payment.price);

    // To avoid duplication for payments
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email:token.email,
        source:token.id
    })
    .then(customer =>{
        stripe.charges.create({
            amount: payment.price * 100,
            currency:'usd',
            customer:customer.id,
            receipt_email: token.email,
            description: `purchase of $(payment.name)`,
            // shipping: {
            //     name: token.card.name,
            //     address:{
            //         country:token.card.address_country
            //     }
            // }
        },{idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => {console.log(err)})


    
    
}

module.exports = {addPayment};

