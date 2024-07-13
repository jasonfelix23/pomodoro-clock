import { Button } from "@/components/ui/button";
import { EllipsisVertical, PlusCircleIcon, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
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
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export type Id = string | number;
export type Column = {
  id: Id;
  title: string;
  completed: boolean;
};

const TaskManager = () => {
  const [columns, setColumns] = useState<Column[]>(() => {
    const savedColumns = localStorage.getItem("TaskArray");
    return savedColumns ? JSON.parse(savedColumns) : [];
  });
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

  useEffect(() => {
    localStorage.setItem("TaskArray", JSON.stringify(columns));
  }, [columns]);

  return (
    <div className="m-auto flex flex-col gap-2 w-4/5 xl:w-3/5">
      <div className="mx-2 mt-4 flex justify-between">
        <h2 className="text-md font-semibold text-white p-2">Tasks</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="p-2 
          hover:text-primary hover:bg-muted"
            >
              <EllipsisVertical size={20} className="" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white/75 text-gray-500">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="hover:bg-white hover:ring-1 hover:text-black"
                onClick={clearCompletedColumns}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Clear finished tasks</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-white hover:ring-1 hover:text-black"
                onClick={clearAllColumns}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Clear All tasks</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator className="mb-2 bg-secondary" />

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
                    taskCompleted={taskCompleted}
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
                    taskCompleted={taskCompleted}
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
      title: `Task ${columns.length + 1}`,
      completed: false,
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
  function taskCompleted(id: Id, completed: boolean) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, completed: !completed };
    });

    setColumns(newColumns);
  }

  function clearCompletedColumns() {
    const filteredColumns = columns.filter((col) => col.completed !== true);
    setColumns(filteredColumns);
  }

  function clearAllColumns() {
    setColumns([]);
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
