// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import "./Orders.css";
// import { useStateValue } from "../StateProvider";
// import Order from "./Order";


// function Orders() {
//   const [{ basket, user }, dispatch] = useStateValue();
//   const [orders, setorders] = useState([]);

//   useEffect(() => {
//     if (user) {
//       db.collection("users")
//         .doc(user?.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         //snapshot for realtime database
//         .onSnapshot((snapshot) =>
//           setorders(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           )
//         );
//     } else {
//       setorders([]);
//     }
//   }, [user]);
//   return (
//     <div className="orders">
//       <h1>Hi Orders</h1>
//       <div className="orders_order">
//           {orders.map(order => {
//               <Order order = {order}/>
//           })}
//       </div>
//     </div>
//   );
// }

// export default Order;
