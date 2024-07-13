import { Button } from "@/components/ui/button";
import { Column, Id } from "./TaskManager";
import { CircleCheck, Trash2Icon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}

function TaskContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = useState(false);
  const [completed, setCompleted] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
            bg-secondary
            w-full
            h-[50px]
            max-h-[75px]
            rounded-md
            opacity-40
            border-white/75
            flex
            flex-col"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    w-full
    h-[50px]
    max-h-[75px]
    flex
    flex-col
    mb-2"
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-white/75 flex items-center justify-between
        text-md h-[60px] cursor-grab rounded p-3 font-bold border-l-black border-l-4"
      >
        <div className="flex gap-1 text-gray-500">
          <Button
            className={`${completed ? "text-primary" : "text-gray-500"}
                hover:text-primary
                bg-transparent
                rounded`}
            onClick={() => setCompleted(!completed)}
          >
            <CircleCheck
              className="mx-2 my-1 cursor-pointer bg-transparent font-bold"
              size={20}
            />
          </Button>
          <div
            onClick={() => {
              setEditMode(true);
            }}
          >
            {!editMode && completed && (
              <p className="line-through decoration-2 py-2">{column.title}</p>
            )}
            {!editMode && !completed && <p className="py-2">{column.title}</p>}

            {editMode && (
              <Input
                className="bg-white/75 outline-none px-2"
                autoFocus
                onChange={(e) => updateColumn(column.id, e.target.value)}
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </div>
        </div>
        <Button
          className="
          text-gray-500
        hover:text-primary
        bg-transparent
        rounded
        px-1
        py-2"
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <Trash2Icon size={20} className="bg-transparent" />
        </Button>
      </div>
    </div>
  );
}

export default TaskContainer;
