import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { CreditCard, Plus, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrencyValue } from '../utils/helpers';

export default function PaymentTerms() {
  const { register, control, watch, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'terms'
  });

  const totalAmount = watch('pricing.totalAmount') || 0;
  const currency = watch('meta.currency') || 'INR';
  const termsList = watch('terms') || [];

  const totalPercentage = termsList.reduce((acc, curr) => acc + (Number(curr.percentage) || 0), 0);
  const isCorrectSum = totalPercentage === 100;
  const isOverflow = fields.length > 5;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-groww-orange" />
          <h3 className="text-sm font-bold tracking-wider text-groww-navy uppercase">Payment Milestones</h3>
        </div>
        <button
          type="button"
          onClick={() => append({ percentage: 0, milestone: '' })}
          className="flex items-center gap-1 text-xs font-bold text-groww-orange hover:text-white border border-groww-orange hover:bg-groww-orange px-3 py-1.5 rounded-xl transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Add Milestone
        </button>
      </div>

      {/* Overflow limit warnings */}
      {isOverflow && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>Page 2 height warning: Too many payment terms may overflow the document limits.</span>
        </div>
      )}

      {/* Sum validation alert */}
      {isCorrectSum ? (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Milestone percentages sum up to exactly 100%!</span>
        </div>
      ) : (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-medium">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>Current total is {totalPercentage}%. Milestone percentages must sum up to exactly 100% (disable download until fixed).</span>
        </div>
      )}

      {/* Display field error message if Zod validator returns one */}
      {errors.terms?.root?.message && (
        <p className="text-red-500 text-xs font-semibold">{errors.terms.root.message}</p>
      )}

      <div className="space-y-3">
        {fields.map((field, index) => {
          const currentPercentage = watch(`terms.${index}.percentage`) || 0;
          const milestoneAmount = Number(totalAmount) * (Number(currentPercentage) / 100);

          return (
            <div key={field.id} className="flex flex-col md:flex-row gap-2 items-start md:items-center group">
              <span className="text-xs font-bold text-slate-400 w-5 text-center hidden md:inline">•</span>
              
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange w-full"
                placeholder="e.g. Advance (Project Start)"
                {...register(`terms.${index}.milestone`)}
              />

              <div className="flex gap-2 items-center w-full md:w-auto">
                <div className="relative w-24">
                  <input
                    type="number"
                    className="w-full pr-6 pl-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
                    placeholder="50"
                    {...register(`terms.${index}.percentage`, { valueAsNumber: true })}
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs font-semibold">%</span>
                </div>

                <div className="text-xs font-semibold text-slate-500 min-w-[100px] text-right">
                  {formatCurrencyValue(milestoneAmount, currency)}
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
