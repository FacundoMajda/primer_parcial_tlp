import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { navbar } from "./components/navbar";
import { listOfOrders } from "./components/listOfOrders";

const $root = document.getElementById("root");

const fetchSession = async () => {
  try {
    const response = await fetch("http://localhost:4321/auth/me", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const init = async () => {
  const session = await fetchSession();

  if (session) {
    $root.appendChild(navbar({ user: session }));
    $root.appendChild(listOfOrders());
  } else {
    window.location.href = "/pages/login";
  }
};

const createOrder = async (orderData) => {
  try {
    const response = await fetch("http://localhost:4321/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(orderData),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to create order");
    }
  } catch (error) {
    handleError(error);
  }
};

init();

