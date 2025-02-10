import { For } from "solid-js";
import Card from "../components/Card";
import { useCartContext } from "../context/CartContext";

export default function Cart() {
  const { items } = useCartContext();

  const totalPrice = () => {
    return items.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
  };
  return (
    <div class="max-w-md my-8 mx-auto">
      <Card>
        <h2>Your Shopping Cart</h2>
        <For each={items}>
          {(item) => (
            <p class="my-3">
              {item.title} - ${item.price} x {item.quantity}
            </p>
          )}
        </For>
        <p class="mt-8 pt-4 border-t-2 font-bold">Total: {totalPrice()}</p>
      </Card>
    </div>
  );
}
