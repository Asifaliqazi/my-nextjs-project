export const getGuestCartId = async () => {
  let cartId = localStorage.getItem("cartId");
  if (!cartId) {
    const res = await fetch("/api/guest-cart", { method: "POST" });
    cartId = await res.text();
    localStorage.setItem("cartId", cartId);
  }
  return cartId;
};
