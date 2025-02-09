import { createResource, For, Show } from "solid-js";
import Card from "../components/Card";

const fetchProductData = async () => {
  const res = await fetch("http://localhost:4000/products");
  return await res.json();
};

export default function Home() {
  const [products] = createResource(fetchProductData);
  return (
    <Show when={products()} fallback={<p>Loading...</p>}>
      <div class="grid grid-cols-4 gap-10 my-4">
        <For each={products()}>
          {(product) => (
            <Card>
              <img src={product.img} alt="product logo" />
              <h2 class="my-3 font-bold">{product.title}</h2>
            </Card>
          )}
        </For>
      </div>
    </Show>
  );
}
