const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    console.log("➡ Incoming order data:", req.body);

    const { email, order_date, order_data } = req.body;

    if (!email || !order_date || !Array.isArray(order_data)) {
        console.log("❌ Missing fields in request");
        return res.status(400).json({
            success: false,
            error: 'Missing email, order_date, or order_data'
        });
    }

    try {
        // ✅ Create a new order document every time
        await Order.create({
            email,
            order_date,
            order_items: order_data
        });

        console.log("🟢 Order created for:", email);
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("🔴 Error while saving order:", error);
        return res.status(500).json({
            success: false,
            error: 'Server error while placing the order: ' + error.message
        });
    }
});
router.post('/myorderData', async (req, res) => {
  try {
    const userEmail = req.body.email;
    if (!userEmail) {
      return res.status(400).json({ success: false, error: "Email not provided" });
    }

    const orders = await Order.find({ email: userEmail }); // ✅ filters by current user's email
    return res.status(200).json({ orderData: orders });
  } catch (error) {
    console.error("🔴 Error fetching orders:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;