import "./App.css";
import InputFields from "./components/InputFields";
import React, { useState } from "react";
import { Todo } from "./model/model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (todo) {
			setTodos([
				...todos,
				{
					id: Date.now(),
					value: todo,
					isDone: false,
				},
			]);
			setTodo("");
		}
	};

	const onDragEnd = (result: DropResult) => {
		if (result.destination?.droppableId === result.source?.droppableId) {
			switch (result.destination?.droppableId) {
				case "TodoListCompleted":
					const ar2: Todo[] = completedTodo;
					const item12 = ar2[result.source?.index];
					const item22 = ar2[result.destination?.index];
					ar2[result.source?.index] = item22;
					ar2[result.destination?.index] = item12;
					setCompletedTodo([...ar2]);
					break;
				case "TodoList":
					const ar: Todo[] = todos;
					const item1 = ar[result.source?.index];
					const item2 = ar[result.destination?.index];
					ar[result.source?.index] = item2;
					ar[result.destination?.index] = item1;
					setTodos([...ar]);
					break;
			}
			return;
		}
		switch (result.destination?.droppableId) {
			case "TodoListCompleted":
				const ar: Todo[] = todos;
				const item = ar.splice(result.source?.index, 1);
				const newAr: Todo[] = completedTodo;
				newAr.splice(result.destination?.index, 0, item[0]);
				setCompletedTodo([...newAr]);
				setTodos([...ar]);
				break;
			case "TodoList":
				const ar2: Todo[] = completedTodo;
				const newAr2: Todo[] = todos;
				const item2 = ar2.splice(result.source?.index, 1);
				newAr2.splice(result.destination?.index, 0, item2[0]);
				setCompletedTodo([...ar2]);
				setTodos([...newAr2]);
				break;
		}
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="heading">Taskify</span>
				<InputFields todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
				<TodoList
					completedTodo={completedTodo}
					setCompletedTodo={setCompletedTodo}
					todos={todos}
					setTodos={setTodos}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
