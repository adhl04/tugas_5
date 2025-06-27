<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../store/todo';

const todoStore = useTodoStore();
const newTodoText = ref('');

const addNewTodo = () => {
  if (newTodoText.value.trim() !== '') {
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = '';
  }
};
</script>

<template>
  <div class="background-wrapper">
    <div class="todo-app-container">
      <h1>Kegiatan Hari Ini</h1>

      <div class="add-todo-section">
        <input
          type="text"
          v-model="newTodoText"
          @keyup.enter="addNewTodo"
          placeholder="Tambahkan tugas baru..."
          class="todo-input"
        />
        <button @click="addNewTodo" class="add-button">Tambah</button>
      </div>

      <p class="uncompleted-info">
        Tugas belum selesai: {{ todoStore.uncompletedTodosCount }}
      </p>

      <ul class="todo-list">
        <li
          v-for="todo in todoStore.allTodos"
          :key="todo.id"
          :class="{ completed: todo.completed }"
          class="todo-item"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="todoStore.toggleCompleted(todo.id)"
            class="todo-checkbox"
          />
          <span class="todo-text">{{ todo.text }}</span>
          <button @click="todoStore.deleteTodo(todo.id)" class="delete-button">
            Delete
          </button>
        </li>
      </ul>

      <p v-if="todoStore.allTodos.length === 0" class="no-tasks-message">
        Tidak ada tugas! Tambahkan beberapa.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Background gradasi penuh halaman */
.background-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #245d65, #fce4ec);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}

/* Glassmorphism container */
.todo-app-container {
  width: 100%;
  max-width: 480px;
  padding: 40px 30px;
  background: rgba(227, 206, 206, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(158, 163, 222, 0.2);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(104, 73, 73, 0.3);
  color: #4d3f3f;
}

/* Judul */
h1 {
  text-align: center;
  color: #25313d;
  font-size: 2em;
  margin-bottom: 30px;
}

/* Input dan tombol tambah */
.add-todo-section {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.todo-input {
  flex-grow: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.9);
  transition: box-shadow 0.3s ease;
}

.todo-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(106, 142, 239, 0.3);
}

.add-button {
  padding: 12px 18px;
  background-color: #5a73256b;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.add-button:hover {
  background-color: #6d6aa4eb;
  transform: translateY(-1px);
}

.uncompleted-info {
  text-align: right;
  font-size: 0.9em;
  color: #555;
  margin-bottom: 20px;
}

/* Daftar tugas */
.todo-list {
  list-style: none;
  padding: 0;
  border-top: 1px solid #ccc;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-checkbox {
  margin-right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #a4c557;
}

.todo-text {
  flex-grow: 1;
  font-size: 1.05em;
  color: #333;
  transition: color 0.3s ease;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  background-color: #ff1b1bdf;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9em;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.delete-button:hover {
  background-color: #d72727;
  transform: translateY(-1px);
}


/* Tidak ada tugas */
.no-tasks-message {
  text-align: center;
  margin-top: 30px;
  font-style: italic;
  color: #777;
}
</style>