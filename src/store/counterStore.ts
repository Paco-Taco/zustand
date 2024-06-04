import { createWithEqualityFn } from "zustand/traditional";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface CounterState {
  count: number;
  title: string;
  posts: Post[];
  increment: (value: number) => void;
  getPosts: () => Promise<void>;
  clearStore: () => void;
  multiply: (value: number) => void
}

export const useCounterStore = createWithEqualityFn<CounterState>(
  (set, get) => ({
    count: 20,
    title: "Some title",
    posts: [],
    increment: (value: number) =>
      set((state) => ({
        count: state.count + value,
      })),
    getPosts: async () => {
      const posts = await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();
      // const posts = await res.json()
      console.log(posts);
      set((state) => ({
        ...state,
        posts: posts,
      }));
    },
    clearStore: () => {
      set({}, true);
    },
    multiply: (value: number) => {
      // const count = get().count
      const { count } = get();
      set({
        count: count * value
      })
    },
  })
);
