import { useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { useCartContext } from "../context/CartContext";

const fetchProductDetails = async (id) => {
  const res = await fetch("http://localhost:4000/products/" + id);
  return await res.json();
};

export default function Product() {
  const param = useParams();
  const [product] = createResource(param.id, fetchProductDetails);

  const { items, setItems } = useCartContext();
  const addToCart = () => {
    const exists = items.find((item) => item.id === product().id);

    if (exists) {
      setItems(
        (p) => p.id === product().id,
        "quantity",
        (q) => q + 1
      );
    }

    if (!exists) {
      setItems([...items, { ...product(), quantity: 1 }]);
    }
  };
  return (
    <div class="my-7">
      <Show when={product()} fallback={<p>Loading...</p>}>
        <div class="grid grid-cols-5 gap-7">
          <div class="col-span-2">
            <img src={product().img} alt="product image" />
          </div>

          <div class="col-span-3">
            <h2 class="text-3xl font-bold mb-7">{product().title}</h2>
            <p>{product().description}</p>
            <p class="my-7 text-2xl">Only ${product().price}</p>
            <button class="btn" onclick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}
