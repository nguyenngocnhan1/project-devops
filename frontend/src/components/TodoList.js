import React, { useEffect, useState } from 'react';


export default function TodoList() {
const [todos, setTodos] = useState([]);
const [text, setText] = useState('');


useEffect(() => {
fetch('/api/todos')
.then(r => r.json())
.then(setTodos)
.catch(console.error);
}, []);


const addTodo = async () => {
if (!text.trim()) return;
const res = await fetch('/api/todos', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ text })
});
const newTodo = await res.json();
setTodos(prev => [...prev, newTodo]);
setText('');
};


const toggleDone = async (id, currentDone) => {
const res = await fetch(`/api/todos/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ done: !currentDone })
});
const updated = await res.json();
setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
};


const remove = async (id) => {
await fetch(`/api/todos/${id}`, { method: 'DELETE' });
setTodos(prev => prev.filter(t => t.id !== id));
};


return (
<div>
<div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
<input
value={text}
onChange={e => setText(e.target.value)}
placeholder="Viết mục mới..."
style={{ flex: 1, padding: '8px' }}
/>
<button onClick={addTodo} style={{ padding: '8px 12px' }}>Thêm</button>
</div>


<ul style={{ paddingLeft: 0, listStyle: 'none' }}>
{todos.map(t => (
<li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
<input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id, t.done)} />
<span style={{ textDecoration: t.done ? 'line-through' : 'none', flex: 1 }}>{t.text}</span>
<button onClick={() => remove(t.id)}>Xóa</button>
</li>
))}
</ul>
</div>
);
}