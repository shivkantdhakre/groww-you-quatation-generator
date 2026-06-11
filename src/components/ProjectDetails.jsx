import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ListChecks, Plus, Trash2, AlertTriangle } from 'lucide-react';

export default function ProjectDetails() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'project.items'
  });

  const isOverflow = fields.length > 6;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-groww-orange" />
          <h3 className="text-sm font-bold tracking-wider text-groww-navy uppercase">Project Details / Scope List</h3>
        </div>
        <button
          type="button"
          onClick={() => append({ name: '' })}
          className="flex items-center gap-1 text-xs font-bold text-groww-orange hover:text-white border border-groww-orange hover:bg-groww-orange px-3 py-1.5 rounded-xl transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Add Scope Item
        </button>
      </div>

      {isOverflow && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>Content limit reached for Page 1 layout boundaries. Additional items may overflow the document canvas area.</span>
        </div>
      )}

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 group">
            <span className="text-xs font-bold text-slate-400 w-5 text-center">{index + 1}.</span>
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              placeholder="Provide a specific feature item..."
              {...register(`project.items.${index}.name`)}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
