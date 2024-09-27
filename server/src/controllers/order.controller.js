import {
  createOrder,
  deleteOrderById,
  getOrderById,
  getOrders,
} from "../models/order.model.js";

export const createOrderCtrl = (req, res) => {
  const { userId } = req.user.id;
  const { coffee } = req.body;
  try {
    const order = createOrder(coffee, userId);

    res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getAllOrdersCtrl = (req, res) => {
  try {
    const orders = getOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getOrder = (req, res) => {
  const { id } = req.params;

  try {
    const order = getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ status: "success", data: order });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// export const updateOrderCtrl = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const { coffee } = req.body;

//     const order = updateOrder(id, coffee);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json(order);
//   } catch (error) {
//     return res.status(500).json({ status: "error", message: error.message });
//   }
// };

export const deleteOrderCtrl = async (req, res) => {
  const { id } = req.params;

  try {
    const order = deleteOrderById(id);

    if (!order) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    }

    res.status(200).json({ status: "success", message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
