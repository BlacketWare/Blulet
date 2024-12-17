import stripeApi from "stripe";
import RateLimiter from "../../../middlewares/utils/RateLimiter";

export default {
    methods: ["post"],
    middlewares: [new RateLimiter({ max: 1, delay: 1000 }).execute()],
    post: async (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const { productId }: { productId: string } = req.body;
        if (!productId) return res.status(400).json({ error: "You must provide a product ID." });
        const stripe = new stripeApi(process.env.STRIPE_SECRET);
        const product = stripe.products.retrieve(productId);
        if (!product) return res.status(400).json({ error: "The product you are trying to purchase does not exist." });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product: productId
                },
                quantity: 1
            }],
            mode: "payment",
            success_url: "https://blulet.org/store/success",
            cancel_url: "https://blulet.org/store/cancel"
        });
        
        return res.status(200).json({ id: session.id });
    }
};