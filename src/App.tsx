import { useEffect } from "react";
import { useCounterStore } from "./store/counterStore";
import { shallow } from "zustand/shallow";

const App = () => {
  // const count = useCounterStore((state) => state.count, shallow);

  // const title = useCounterStore((state) => state.title);

  const { title, count, posts } = useCounterStore(
    (state) => ({
      title: state.title,
      count: state.count,
      posts: state.posts,
    }),
    shallow
  );

  // const increment = useCounterStore((state) => state.increment)
  const { increment, clearStore, multiply } = useCounterStore();
  const getPosts = useCounterStore((state) => state.getPosts);

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
      <h1>
        {title}: {count}
      </h1>
      <button onClick={() => increment(10)}>Increment by 10</button>
      <button onClick={() => multiply(2)}>Multiply by 2</button>
      <button onClick={() => clearStore()}>Clear the whole thing</button>

      <hr />

      {/* Convertir el json en un string para poder usarlo */}
      {JSON.stringify(posts)}
    </div>
  );
};

export default App;
