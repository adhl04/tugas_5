// src/stores/todo.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    // Daftar tugas. Setiap tugas memiliki id, text, dan status completed.
    todos: [
      { id: 1, text: 'Gotong Royong', completed: false },
      { id: 2, text: 'Joging', completed: false },
      { id: 3, text: 'Workout', completed: true },
    ],
    nextId: 4 // Untuk memberikan ID unik pada tugas baru
  }),

  getters: {
    // Getter untuk menghitung jumlah tugas yang belum selesai
    uncompletedTodosCount: (state) => {
      return state.todos.filter(todo => !todo.completed).length;
    },
    // Getter untuk mendapatkan semua tugas (opsional, bisa langsung akses state.todos)
    allTodos: (state) => state.todos,
  },

  actions: {
    // Aksi untuk menambah tugas baru
    addTodo(text) {
      if (text.trim() === '') return; // Jangan tambahkan tugas kosong
      this.todos.push({
        id: this.nextId++, // Gunakan ID berikutnya lalu inkremen
        text: text,
        completed: false
      });
    },

    // Aksi untuk menghapus tugas berdasarkan ID
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },

    // Aksi untuk mengubah status completed/uncompleted tugas
    toggleCompleted(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed; // Balik statusnya
      }
    }
  }
});