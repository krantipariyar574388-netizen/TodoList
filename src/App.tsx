import TodoApp from "./component/TodoList"; 
import { Toaster } from 'sonner';

const ToDoApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <Toaster richColors position="top-center" />
      <TodoApp />
    </div>
  );
};

export default ToDoApp;