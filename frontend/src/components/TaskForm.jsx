const TaskForm = ({addTask, newTask, handleChange }) => {
    return(
        <>
            <form onSubmit={addTask}>
                <div>
                    title: <input name="title" value={newTask.title} onChange={handleChange}/>
                    <br />
                    priority: <input name="priority" value={newTask.priority} onChange={handleChange} placeholder="Type low, medium or high"/>
                    <br />
                    done: <input name="done" type="checkbox" checked={newTask.done} onChange={handleChange} />
                    <br />
                    date: <input name="date" type="datetime-local" value={newTask.date} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default TaskForm