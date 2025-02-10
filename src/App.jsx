import { createSignal } from "solid-js";
import banner from "./assets/banner.png";

import { Route, Router } from "@solidjs/router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import { useCartContext } from "./context/CartContext";

function App() {
  const [darkTheme, setDarkTheme] = createSignal(false);

  const { items } = useCartContext();

  const totalItemsInCart = () => {
    return items.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  };

  return (
    <div class="container m-auto" classList={{ darkTheme: darkTheme() }}>
      <header
        class="my-4 p-2 text-xl flex items-center gap-4"
        classList={{ "bg-neutral-900": darkTheme(), "text-white": darkTheme() }}
      >
        {/* <span class="material-symbols-outlined cursor-pointer"></span> */}
        <span
          onClick={() => setDarkTheme((prev) => !prev)}
          class="material-symbols-outlined cursor-pointer"
        >
          light_mode
        </span>
        <h1>Ninja Merch</h1>

        <a href="/">Home</a>
        <a href="/cart">Cart ({totalItemsInCart()})</a>
      </header>

      <img class="rounded-md" src={banner} alt="site banner" />

      <Router>
        <Route path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/products/:id" component={Product} />
      </Router>
    </div>
  );
}

export default App;
