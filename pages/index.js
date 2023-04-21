import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid' // generate unique id

const TodoList = () => {
  const [todos, setTodos] = useState([]) // state for list of todos
  const [searchTerm, setSearchTerm] = useState('') // state for the search

  // read list of todos from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodos(storedTodos)
  }, [])

  // updated list of todos to local storage, todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // handle form to add a new todo
  const handleSubmit = (e) => {
    e.preventDefault()
    const newTodo = {
      id: uuidv4(), // generate a unique id for new todo
      text: e.target.todo.value,
      done: false, // initial status to false
    }
    setTodos([...todos, newTodo]) // add the new todo to the list using the spread operator
    e.target.reset() // clear the form input field
  }

  // handle click on delete button to remove a todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)) // filter for deleted todo
  }

  // handle click todo item to done
  const handleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    ) // toggle the done status with map
  }

  // filter list for search
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      <h1 className='font-bold text-2xl lg:text-4xl xl:text-6xl mb-3'>TodoList</h1>
      <p className='text-lg'>By NextJS Save in LocalStorage</p>

      <form onSubmit={handleSubmit} className='my-10 flex items-center gap-3'>
        <input type="text" name="todo" className='outline outline-gray-300 rounded-md py-2 px-5' placeholder='Add Your Text' required />
        <button type="submit" className='bg-white outline outline-gray-300 py-2 px-5 rounded-md'>Add</button>
      </form>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='outline outline-gray-300 rounded-md py-2 px-5'
      />

      <div className='mt-10 text-2xl font-bold border-b border-gray-400 pb-3'>Your Task Here</div>
      <ul className='mt-5 flex flex-col gap-3'>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className='outline outline-gray-300 rounded-md py-2 px-3 flex justify-between items-center gap-5 bg-white'>
            <span
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              onClick={() => handleDone(todo.id)}
              className='textlg'
            >
              {todo.text}
            </span>

            <button onClick={() => handleDelete(todo.id)} className='bg-red-400 rounded-full text-white text-xs px-2 py-1'>X</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
export default TodoList