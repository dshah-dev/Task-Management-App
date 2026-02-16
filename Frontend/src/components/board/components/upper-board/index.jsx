import React from "react";
import Button from "../../../../common/components/Button";
import Input from "../../../../common/components/Input";
import OPTIONS from "../../constant";
import Select from "../../../../common/components/Select";

function UpperBoard({
  searchTask,
  setSearchTask,
  onAddTaskClick,
  priority,
  setPriority,
  selectedCount,
  onBulkDelete,
  onBulkPriority,
}) {
  return (
    <div className=" flex flex-col ">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 sm:p-4 mt-3">
        <div className="w-full md:max-w-md">
          <Input
            type="text"
            placeholder="Search tasks or names..."
            variant="searchBar"
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
          />
        </div>

        <div className="w-full md:w-auto flex gap-2 sm:gap-0">
          <div className="w-full mx-1 sm:mx-3">
            <Select
              options={OPTIONS}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              variant="auth"
            />
          </div>

          <Button
            className="btn-auth whitespace-nowrap text-sm w-full md:w-40 h-11"
            onClick={onAddTaskClick}
          >
            Add Task
          </Button>
        </div>
      </div>
      {selectedCount > 0 && (
        <div className="flex items-center justify-between bg-light-purple border border-gold p-2 rounded-lg mt-1">
          <div className="text-white text-sm font-bold ml-2">
            {selectedCount} Tasks selected
          </div>
          <div className="flex justify-end gap-2">
            <div className="w-32 sm:w-40">
              <Select
                variant="auth"
                options={OPTIONS.filter((opt) => opt.value !== "all")}
                onChange={(e) => onBulkPriority(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={onBulkDelete}
                className="px-3 py-1 text-[10px] bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpperBoard;
