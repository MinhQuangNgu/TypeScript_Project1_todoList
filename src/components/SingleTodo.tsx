import React, { useState, useRef } from "react";
import "./style.css";
import { Todo } from "../model/model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
interface Props {
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	index: number;
}
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
	const [editTodo, setEditTodo] = useState<string>(todo?.value);
	const [edit, setEdit] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleDone = () => {
		let ar: Todo[] = todos;
		ar = ar?.map((item) => {
			if (item?.id === todo?.id) {
				return {
					...item,
					isDone: !todo?.isDone,
				};
			}
			return item;
		});
		setTodos([...ar]);
	};

	const handleDelete = () => {
		let ar: Todo[] = todos;
		ar = ar?.filter((item) => item?.id !== todo?.id);
		setTodos([...ar]);
	};

	const handleEdit = (e?: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		let ar: Todo[] = todos;
		ar = ar?.map((item) => {
			if (item?.id === todo?.id) {
				return {
					...item,
					value: editTodo,
				};
			}
			return item;
		});
		setTodos([...ar]);
		setEdit(false);
	};
	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided) => (
				<form
					onSubmit={(e) => {
						handleEdit(e);
					}}
					className={`todos__single `}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{edit ? (
						<input
							value={editTodo}
							onChange={(e) => {
								setEditTodo(e.target.value);
							}}
							className="todos__single--text"
							ref={inputRef}
						/>
					) : todo.isDone ? (
						<s className="todos__single--text">{todo.value}</s>
					) : (
						<span className="todos__single--text">{todo.value}</span>
					)}
					<div>
						<span
							className="icon"
							onClick={(e) => {
								if (!edit && !todo?.isDone) {
									setEdit(true);
								} else {
									handleEdit();
								}
							}}
						>
							<AiFillEdit />
						</span>
						<span className="icon" onClick={handleDelete}>
							<AiFillDelete />
						</span>
						<span className="icon" onClick={handleDone}>
							<MdDone />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
};

export default SingleTodo;
