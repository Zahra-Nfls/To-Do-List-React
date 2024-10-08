import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { RiCheckboxFill, RiCheckboxBlankLine, RiCheckFill }
from "react-icons/ri";
import PropTypes from 'prop-types';
import { LuClipboardEdit } from "react-icons/lu";

export default function Task({ task, onDelete, onComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (newTitle.trim()) {
      onEdit(task.id, newTitle);
      setIsEditing(false);
    }
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  return (
    <div className="task">
      <section className="tasks">
        <button className="checkbox" onClick={() => onComplete(task.id)}>
          {task.isCompleted ? <RiCheckboxFill size={20} /> : <RiCheckboxBlankLine size={20} />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onClick={handleKeyPress}
            autoFocus
          />
        ) : (
          <p className={task.isCompleted ? "complete" : ""}>
            {task.title}
          </p>
        )}
      </section>

      <section className="taskEditDltBtn">
        {isEditing ? (
          <button className="saveBtn" onClick={handleSaveClick}>
            <RiCheckFill size={20} color="green" />
          </button>
        ) : (
          <button className="editBtn" onClick={handleEditClick}>
            <LuClipboardEdit size={20}/>
          </button>
        )}
        <button className="deleteBtn" onClick={() => onDelete(task.id)}>
          <BsTrashFill size={20} color="red" />
        </button>
      </section>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
