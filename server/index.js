const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;



app.use(express.json());
app.use(cors());




// ✅ Create Razorpay Order
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // ✅ Ensure required fields exist
    const { amount, currency, receipt } = req.body;
    if (!amount || !currency || !receipt) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({ error: "Failed to create order", details: err.message });
  }
});

// // ✅ Validate Payment
// app.post("/order/validate", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
//     // ✅ Log incoming request data
//     console.log("Payment Validation Request:", req.body);

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ msg: "Missing required fields" });
//     }

//     // ✅ Debug Razorpay secret key
//     console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);

//     const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//     sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = sha.digest("hex");

//     console.log("Computed Signature:", digest);
//     console.log("Received Signature:", razorpay_signature);

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ msg: "Transaction is not legit!" });
//     }

//     res.json({
//       msg: "Success",
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//     });
//   } catch (err) {
//     console.error("Payment Validation Error:", err);
//     res.status(500).json({
//       error: "Payment validation failed",
//       message: err.message,
//       stack: err.stack,
//     });
//   }
// });

app.post("/order/validate", async (req, res) => {
  try {
    console.log("🔹 Received validation request:", req.body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    res.json({
      msg: "Success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("❌ Payment Validation Error:", err);
    res.status(500).json({ error: "Payment validation failed" });
  }
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
