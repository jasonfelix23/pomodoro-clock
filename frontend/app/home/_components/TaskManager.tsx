import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import TaskContainer from "./TaskContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { Separator } from "@/components/ui/separator";

export type Id = string | number;
export type Column = {
  id: Id;
  title: string;
};

const TaskManager = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  console.log(columns);

  const [activeColumn, setActivColumn] = useState<Column | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );
  return (
    <div className="m-auto flex flex-col gap-2 w-4/5 xl:w-3/5">
      <div>
        <h2>Tasks</h2>
        <Separator className="my-2 bg-secondary" />
      </div>

      <div
        className="
      m-auto
      flex flex-col
      gap-2
      w-full
      min-h-0
      max-h-[300px]
      items-center
      overflow-y-auto
      overflow-x-hidden
      
      "
      >
        <div className="m-auto w-full flex flex-col gap-4">
          <DndContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            sensors={sensors}
          >
            <div className="flex flex-col gap-2">
              <SortableContext items={columnsId}>
                {columns.map((column) => (
                  <TaskContainer
                    key={column.id}
                    column={column}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                  />
                ))}
              </SortableContext>
            </div>

            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <TaskContainer
                    column={activeColumn}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
      </div>
      <Button
        onClick={createNewColumn}
        className="
        h-[60px]
        w-full
        min-w-[50px]
        cursor-pointer
        rounded-lg
        bg-secondary
        border-2
        border-primary
        border-dashed
        p-4
        ring-muted
        hover:ring-2
        flex
        gap-2
        "
      >
        <PlusCircleIcon size={20} className="bg-secondary" />
        Add Task
      </Button>
    </div>
  );

  function createNewColumn() {
    const columnsToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnsToAdd]);
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActivColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
};

export default TaskManager;
