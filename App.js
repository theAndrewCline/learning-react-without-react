export class App {
  constructor(domContainer) {
    this.state = {
      nextId: 2,
      todosList: [{
        id: 0,
        action: 'Get milk',
        completed: false
      }, {
        id: 1,
        action: 'Dishes',
        completed: false
      }],
      newTodo: '',
      filter: 'all'
    }
    this.container = domContainer
  }

  // update TODO list
  addTodo(newTodo) {
    const todosList = [...this.state.todosList]
    todosList.push({
      action: newTodo,
      completed: false,
      id: this.state.nextId
    })

    this.setState(_ => ({
      todosList,
      newTodo: '',
      nextId: this.state.nextId + 1
    }))
  }

  removeTodo(id) {
    const todosList = [...this.state.todosList]
    const index = todosList.findIndex(todo => todo.id === id)

    todosList.splice(index, 1)

    this.setState(_ => ({
      todosList
    }))
  }

  clearCompleted(todosCompleted) {
    const todosList = [...this.state.todosList]

    for (let i=todosCompleted.length-1; i >= 0; i-=1) {
      const id = todosCompleted[i].id
      const index = todosList.findIndex(todo => todo.id === id)
      todosList.splice(index, 1)
    }

    this.setState(_ => ({
      todosList
    }))
  }

  changeFilter(evt) {
    if (evt.target.classList.contains('filter-all')) {
      this.setState(_ => ({
        filter: 'all'
      }))
    }
    if (evt.target.classList.contains('filter-active')) {
      this.setState(_ => ({
        filter: 'active'
      }))
    }
    if (evt.target.classList.contains('filter-completed')) {
      this.setState(_ => ({
        filter: 'completed'
      }))
    }
  }

  // update TODO item
  toggleCompleted(id) {
    const todosList = [...this.state.todosList]
    const index = todosList.findIndex(todo => todo.id === id)
    todosList[index].completed = !todosList[index].completed

    this.setState(_ => ({
      todosList
    }))
  }

  // view helper function
  filterList() {
    return this.state.todosList.filter(todo => {
      switch (this.state.filter) {
        case "all":
          return true
          break
        case "active":
          return !todo.completed
          break
        case "completed":
          return todo.completed
          break
        default:
          return true
      }
    })
  }

  // view helper function
  completed() {
    const completed = this.state.todosList.reduce((total, todo, index) => (
      total += todo.completed ? 0 : 1
    ), 0)

    return (completed === 1)
      ? `1 item left`
      : `${completed} items left`
  }

  // view helper function
  filterBtnClassNames(filterState) {
    let classNames = `filter-${filterState} filter-btn `
    classNames += (filterState === this.state.filter)
      ? 'filter-btn--active'
      : ''

    return classNames
  }

  render() {
    return `
      <h1 class="app-title">todos</h1>
      <div class="app-container">
        <input class="new-todo"
          placeholder="What needs to be done?"
          autofocus
          value="${this.state.newTodo}">
        <ul class="todos">
          ${this.filterList().map(todo => `
          <li class="todo">
            <input class="todo__completed-checkbox"
              data-key="${todo.id}"
              type="checkbox"
              ${todo.completed ? 'checked' : ''}>
            <span class="todo__action">${todo.action}</span>
            <button data-key="${todo.id}" class="remove-todo">X</button>
          </li>
          `).join('')}
        </ul>
        <div class="app-bottom-row">
          <span class="todos-completed-count">${this.completed()}</span>
          <div class="todos-filter">
            ${['all', 'active', 'completed'].map(filterState => (`
              <button class="${this.filterBtnClassNames(filterState)}">
                ${filterState}
              </button>`
            )).join('')}
          </div>
          <button class="clear-completed">Clear Completed</button>
        </div>
      </div>
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
   *
   * this is terrible practice
   * but for now we don't want to bother ourselves with this problem
   * because we get it solved for free when using React or similar vdom library
   */
  addEventListeners() {
    const newTodoInput = this.container.querySelector('.new-todo')
    newTodoInput.onchange = () => {
      this.addTodo(newTodoInput.value)
    }

    const todoCheckboxes = this.container.querySelectorAll('.todo__completed-checkbox')
    todoCheckboxes.forEach(checkbox => {
      const id = Number(checkbox.dataset.key)
      checkbox.onclick = () => {
        this.toggleCompleted(id)
      }
    })

    const removeTodoButtons = this.container.querySelectorAll('.remove-todo')
    removeTodoButtons.forEach(btn => {
      const id = Number(btn.dataset.key)
      btn.onclick = () => {
        this.removeTodo(id)
      }
    })

    const filterBtns = this.container.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => {
      btn.onclick = (evt) => {
        this.changeFilter(evt)
      }
    })

    const clearCompletedBtn = this.container.querySelector('.clear-completed')
    clearCompletedBtn.onclick = () => {
      const completedTodos = this.state.todosList.filter(todo => todo.completed)
      this.clearCompleted(completedTodos)
    }
  }

  // the following are just helper functions for this class
  init() {
    this.update()
  }

  update() {
    this.container.innerHTML = this.render()
    this.addEventListeners()
    this.container.querySelector('.new-todo').focus()
  }
}
