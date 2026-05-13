import { FaTrash } from "react-icons/fa"

const Tasks = ({ onUpdate, onDelete, listToShow, formatDate }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {listToShow.map((t) => (
            <tr key={t.id} className="task">
              <td>{t.title}</td>
              <td>{t.priority}</td>
              <td className={t.done ? "done" : "pending"}>{t.done ? "Done" : "Pending"}</td>
              <td>{formatDate(t.date)}</td>
              <td>
                <button onClick={() => onUpdate(t.id)}>
                  {t.done ? "Mark as not done" : "Mark as done"}
                </button>
                <button onClick={() => onDelete(t.id)} className="delete-btn"><FaTrash /></button>
              </td>
              <hr />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tasks;
