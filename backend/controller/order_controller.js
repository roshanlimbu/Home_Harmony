// const axios = require("axios");
// const Transaction = require("../models/Transaction"); // adjust the path to your Transaction model
//
// exports.callKhalti = async (formData, req, res) => {
//   try {
//     const headers = {
//       Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//       "Content-Type": "application/json",
//     };
//     console.log(headers);
//     const response = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/initiate/",
//       formData,
//       {
//         headers,
//       },
//     );
//     console.log(response.data);
//
//     // Save transaction to the database
//     await Transaction.create({
//       txnId: response.data.txnId,
//       pidx: response.data.pidx,
//       amount: formData.amount,
//       purchase_order_id: response.data.purchase_order_id,
//       transaction_id: response.data.transaction_id,
//       status: "Initiated",
//     });
//
//     res.json({
//       message: "khalti success",
//       payment_method: "khalti",
//       data: response.data,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ error: err?.message });
//   }
// };
//
// exports.handleKhaltiCallback = async (req, res, next) => {
//   try {
//     const { txnId, pidx, amount, purchase_order_id, transaction_id, message } =
//       req.query;
//     if (message) {
//       return res
//         .status(400)
//         .json({ error: message || "Error Processing Khalti" });
//     }
//
//     const headers = {
//       Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//       "Content-Type": "application/json",
//     };
//     const response = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/lookup/",
//       { pidx },
//       { headers },
//     );
//
//     console.log(response.data);
//     if (response.data.status !== "Completed") {
//       return res.status(400).json({ error: "Payment not completed" });
//     }
//
//     // Update transaction status in the database
//     const transaction = await Transaction.findOne({
//       where: { purchase_order_id },
//     });
//
//     if (!transaction) {
//       return res.status(404).json({ error: "Transaction not found" });
//     }
//
//     transaction.status = "Completed";
//     await transaction.save();
//
//     console.log(purchase_order_id, pidx);
//     req.transaction_uuid = purchase_order_id;
//     req.transaction_code = pidx;
//     next();
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(400)
//       .json({ error: err?.message || "Error Processing Khalti" });
//   }
// };
