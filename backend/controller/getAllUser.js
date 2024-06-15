// const db = require("../model/index");
// const Users = db.users;
// const CartItems = db.cartItem;
// const Products = db.product;
//
// async function getAllUsers(req, res) {
//   try {
//     const users = await Users.findAll({
//       include: [
//         {
//           model: CartItems,
//           as: 'cartItems',
//           attributes: ['id', 'quantity'],
//           include: [
//             {
//               model: Products,
//               as: 'product',
//               attributes: ['id', 'name', 'price'],
//             },
//           ],
//         },
//       ],
//     });
//
//     if (users) {
//       res.json({
//         success: true,
//         users,
//       });
//     } else {
//       res.json({
//         success: false,
//         errors: "No users found",
//       });
//     }
//   } catch (error) {
//     console.error("Error getting all users:", error);
//     res.status(500).json({
//       success: false,
//       errors: "Internal Server Error",
//     });
//   }
// }
//
// module.exports = {
//   getAllUsers,
// };
//
