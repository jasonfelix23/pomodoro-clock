import { Button } from "@/components/ui/button";
import { Column, Id } from "./TaskManager";
import { CircleCheck, Trash2Icon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

function TaskContainer(props: Props) {
  const { column, deleteColumn } = props;

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
          <div
            className="flex justify-center
        items-center px-2 py-1
        text-sm rounded-full"
          >
            <CircleCheck className="bg-transparent" size={20} />
          </div>
          {column.title}
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
