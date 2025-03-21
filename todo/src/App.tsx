import React, { useState } from "react";
import { useAppSelector } from "./redux/hooks";
import AddTodo from "./components/AddTodoComp/AddTodo/AddTodo";
import EditTodo from "./components/AddTodoComp/EditTodo/EditTodo";
import FilterTodo from "./components/AddTodoComp/FilterTodo/FilterTodo";
import TodoList from "./components/AddTodoComp/TodoList/TodoList";
import ListOfPersons from "./components/Persons/ListOfPersons";
import { TodoInterface } from "./redux/todoSlice";
import Add from "./components/Persons/Add";

function App() {
  // here we are subscribe to todos state and read it on each time it changes, todos comes from store
  const todos = useAppSelector((state) => state.storeTodos.todos);

  // edit todo
  const [editTodo, setEditTodo] = useState<TodoInterface | null>(null);

  //todoFilterValue is use to filter out todos on select
  const [todoFilterValue, setTodoFilterValue] = useState("all");

  // gets filterValue from select and sets it in the state
  const getTodoFilterValue = (filterValue: string) =>
    setTodoFilterValue(filterValue);

  // gets todo that should be edited and sets it in the state
  const getEditTodo = (editTodo: TodoInterface) => setEditTodo(editTodo);

  return (
    <div className="App">
      <div className="app__wrapper">
        <div className="app__header">
          <h1 className="app__title">Todo App</h1>
        </div>
        <div className="app__inputs-box">
          {/*display edit todo when todo is being edited 
else display add todo form*/}
          {editTodo?.id ? (
            <EditTodo editTodo={editTodo} setEditTodo={setEditTodo} />
          ) : (
            <AddTodo />
          )}
          <FilterTodo getTodoFilterValue={getTodoFilterValue} />
        </div>
        <TodoList
          todos={todos}
          todoFilterValue={todoFilterValue}
          getEditTodo={getEditTodo}
          setEditTodo={setEditTodo}
          editTodo={editTodo}
        />
      </div>
      <div>
        <Add />
        <ListOfPersons />
      </div>
    </div>
  );
}

export default App;
