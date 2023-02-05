export {};

declare global {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
}
