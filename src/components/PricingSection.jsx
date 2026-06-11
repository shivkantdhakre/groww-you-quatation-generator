import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IndianRupee, Percent, Calculator, DollarSign, Euro } from 'lucide-react';
import { formatCurrencyValue } from '../utils/helpers';

export default function PricingSection() {
  const { register, watch, formState: { errors } } = useFormContext();

  const totalAmount = watch('pricing.totalAmount') || 0;
  const taxPercentage = watch('pricing.taxPercentage') || 0;
  const currency = watch('meta.currency') || 'INR';

  const baseCost = Number(totalAmount) || 0;
  const taxRate = Number(taxPercentage) || 0;
  const computedGrandTotal = baseCost + (baseCost * (taxRate / 100));

  const getCurrencyIcon = () => {
    switch (currency) {
      case 'USD': return <DollarSign className="w-4 h-4" />;
      case 'EUR': return <Euro className="w-4 h-4" />;
      default: return <IndianRupee className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Calculator className="w-5 h-5 text-groww-orange" />
        <h3 className="text-sm font-bold tracking-wider text-groww-navy uppercase">Financial Metrics & Breakdown</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Currency Select</label>
          <select
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange bg-white"
            {...register('meta.currency')}
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Base Price Amount</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              {getCurrencyIcon()}
            </span>
            <input
              type="number"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              placeholder="e.g. 15000"
              {...register('pricing.totalAmount', { valueAsNumber: true })}
            />
          </div>
          {errors.pricing?.totalAmount && <p className="text-red-500 text-[10px] mt-0.5">{errors.pricing.totalAmount.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Tax Bracket (%)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Percent className="w-4 h-4" />
            </span>
            <input
              type="number"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              placeholder="e.g. 18"
              {...register('pricing.taxPercentage', { valueAsNumber: true })}
            />
          </div>
          {errors.pricing?.taxPercentage && <p className="text-red-500 text-[10px] mt-0.5">{errors.pricing.taxPercentage.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Price Unit Billing Frequency</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
          placeholder="e.g. / month, / project"
          {...register('meta.priceUnit')}
        />
        {errors.meta?.priceUnit && <p className="text-red-500 text-[10px] mt-0.5">{errors.meta.priceUnit.message}</p>}
      </div>

      <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
        <span className="text-sm font-bold text-groww-navy">Computed Grand Valuation:</span>
        <span className="text-xl font-extrabold text-groww-navy">
          {formatCurrencyValue(computedGrandTotal, currency)}
        </span>
      </div>
    </div>
  );
}
