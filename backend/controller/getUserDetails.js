// const db = require("../model/index");
// const Users = db.users;
// const CartItems = db.cartItem;
// const Products = db.product;
//
// async function getUserDetails(req, res) {
//   try {
//     const user = await Users.findOne({
//       where: {
//         email: req.body.email,
//       },
//       include: [
//         {
//           model: CartItems,
//           as: 'cartItems',
//           attributes: ['id', 'quantity'],
//           include: [
//             {
//               model: Products,
//               as: 'product',
//               attributes: ['id', 'name', 'price'], // specify the attributes you need from the Product model
//             },
//           ],
//         },
//       ],
//     });
//
//     if (user) {
//       res.json({
//         success: true,
//         user: {
//           id: user.id,
//           email: user.email,
//           cartItems: user.cartItems,
//         },
//       });
//     } else {
//       res.json({
//         success: false,
//         errors: "User not found",
//       });
//     }
//   } catch (error) {
//     console.error("Error getting user details:", error);
//     res.status(500).json({
//       success: false,
//       errors: "Internal Server Error",
//     });
//   }
// }
//
// module.exports = {
//   login,
//   getUserDetails,
// };
