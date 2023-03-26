import React from "react";
import "./style.css";
import { Todo } from "../model/model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodo: Todo[];
	setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
	todos,
	setTodos,
	completedTodo,
	setCompletedTodo,
}) => {
	return (
		<div className="container">
			<Droppable droppableId="TodoList">
				{(provided) => (
					<div
						className={`todos`}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<span className="todos__heading">Active Tasks</span>
						{todos?.map((todo, index) => (
							<SingleTodo
								index={index}
								todos={todos}
								todo={todo}
								key={todo?.id}
								setTodos={setTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="TodoListCompleted">
				{(provided) => (
					<div
						className={`todos remove`}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<span className="todos__heading">Completed Tasks</span>
						{completedTodo?.map((todo, index) => (
							<SingleTodo
								index={index}
								todos={completedTodo}
								todo={todo}
								key={todo?.id}
								setTodos={setCompletedTodo}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TodoList;
