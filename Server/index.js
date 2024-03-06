require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);


app.use(express.json());
app.use(cors());


app.post("http://localhost:7000/api/create-checkout-session", async (req, res) => {
    const { products } = req.body;


    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.productName,
                images: [product.imgUrl],
            },
            unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity
    }));
    console.log(lineItems.imgUrl)


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id })

})

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with the origin you want to allow
    methods: 'POST',      // Specify which HTTP methods are allowed
    optionsSuccessStatus: 200      // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


app.listen(7000, () => {
    console.log("server start")
})