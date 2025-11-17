const express = require('express');
const router = express.Router();


// Dữ liệu tạm trong bộ nhớ (không dùng DB cho ví dụ đơn giản)
let todos = [
{ id: 1, text: 'Học Node.js', done: false },
{ id: 2, text: 'Làm project React', done: false }
];
let nextId = 3;


// GET /api/todos
router.get('/', (req, res) => {
res.json(todos);
});


// POST /api/todos
router.post('/', (req, res) => {
const { text } = req.body;
if (!text) return res.status(400).json({ error: 'Thiếu text' });
const newTodo = { id: nextId++, text, done: false };
todos.push(newTodo);
res.status(201).json(newTodo);
});


// PUT /api/todos/:id (toggle done hoặc cập nhật text)
router.put('/:id', (req, res) => {
const id = Number(req.params.id);
const { text, done } = req.body;
const todo = todos.find(t => t.id === id);
if (!todo) return res.status(404).json({ error: 'Không tìm thấy todo' });
if (typeof text !== 'undefined') todo.text = text;
if (typeof done !== 'undefined') todo.done = done;
res.json(todo);
});


// DELETE /api/todos/:id
router.delete('/:id', (req, res) => {
const id = Number(req.params.id);
const idx = todos.findIndex(t => t.id === id);
if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy todo' });
const removed = todos.splice(idx, 1)[0];
res.json(removed);
});


module.exports = router;