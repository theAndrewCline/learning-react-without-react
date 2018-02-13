export class App {
  constructor(domContainer) {
    this.state = {
      todosList: [{
        action: 'Get milk',
        completed: false
      }, {
        action: 'Dishes',
        completed: false
      }],
      newTodo: '',
      filter: 'all'
    }
    this.container = domContainer
  }

  toggleCompleted(index) {
    const todosList = [...this.state.todosList]
    todosList[index].completed = !todosList[index].completed

    this.setState(_ => ({
      todosList
    }))
  }

  updateNewTodo(newTodo) {
    this.setState(_ => ({
      newTodo
    }))
  }

  addTodo() {
    const todosList = [...this.state.todosList]
    todosList.push({
      action: this.state.newTodo,
      completed: false
    })

    this.setState(_ => ({
      todosList,
      newTodo: ''
    }))
  }

  removeTodo(index) {
    const todosList = [...this.state.todosList]
    todosList.splice(index, 1)

    this.setState(_ => ({
      todosList
    }))
  }

  render() {
    const completed = this.state.todosList.reduce((total, todo, index) => (
      total += todo.completed ? 1 : 0
    ), 0)

    return `
      <input id="new-todo"
        placeholder="What needs to be done?"
        value="${this.state.newTodo}">
      <button id="add-todo">Add Todo</button>
      <ul class="todos">
        ${this.state.todosList.map((todo, i) => `
        <li class="todo">
          <input class="todo__completed-checkbox"
            data-key="${i}"
            type="checkbox"
            ${todo.completed ? 'checked' : ''}>
          <span>${todo.action}</span>
          <button data-key="${i}" class="remove-todo">Remove</button>
        </li>
        `).join('')}
      </ul>
      <span class="todos-completed-count">Completed: ${completed}</span>
    `
  }

  // this function helps fill-in the syntactic gap for react
  setState(fn) {
    const newStateObj = fn()
    const properties = Object.getOwnPropertyNames(newStateObj)
    properties.forEach(prop => {
      this.state[prop] = newStateObj[prop]
    })
    this.update()
  }

  /**
   * because we don't have a vdom we
   * and are blowing away the whole app and rebuilding
   * we must reapply all of the event listeners
   * this is terrible but a vdom takes care of this problem for us
   */
  addEventListeners() {
    const addTodoBtn = document.getElementById('add-todo')
    addTodoBtn.onclick = () => {
      this.addTodo()
    }

    const newTodoInput = document.getElementById('new-todo')
    newTodoInput.onchange = () => {
      this.updateNewTodo(newTodoInput.value)
    }

    const todoCheckboxes = document.querySelectorAll('.todo__completed-checkbox')
    todoCheckboxes.forEach(checkbox => {
      const index = Number(checkbox.dataset.key)
      checkbox.onclick = () => {
        this.toggleCompleted(index)
      }
    })

    const removeTodoButtons = document.querySelectorAll('.remove-todo')
    removeTodoButtons.forEach(btn => {
      const index = Number(btn.dataset.key)
      btn.onclick = () => {
        this.removeTodo(index)
      }
    })
  }

  // the following are just helper functions
  init() {
    this.update()
  }

  update() {
    this.container.innerHTML = this.render()
    this.addEventListeners()
  }
}
