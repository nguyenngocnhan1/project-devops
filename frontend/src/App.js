import React from 'react';
import TodoList from './components/TodoList';


export default function App() {
return (
<div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
<h1>Todo App - Node + React</h1>
<TodoList />
</div>
);
}