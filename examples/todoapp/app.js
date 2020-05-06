
const todosRef = LiteDB.collection("todos");

const app = new Vue({
  el: '#app',

  data() {
    return {
      note: '',
      todos: []
    }
  },
  created() {
    this.todos = todosRef.docs.map(todo => todo.get());
  },
  methods: {
    add() {
      if (this.note.length) {
        const id = this.todos.length + 1;

        const payload = {
          id, 
          time: Date.now(),
          note: this.note
        };
        todosRef.doc(id).set(payload);
        this.todos.unshift(payload);
        this.note = "";
      }
    },
    remove(id) {
      todosRef.doc(id).remove();
      this.todos = this.todos.filter(todo => todo.id != id);
    }
  },
  filters: {
    extractTimeString(timeid) {
      const t = new Date(timeid);
      return `${t.getHours()}:${t.getMinutes()}`
    },
    timeString(timeid) {
      return new Date(timeid);
    }
  }
});