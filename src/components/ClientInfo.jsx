import React from 'react';
import { useFormContext } from 'react-hook-form';
import { User, ShieldCheck, Mail, Phone, Calendar, Hash, Layers, FileText } from 'lucide-react';

export default function ClientInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <ShieldCheck className="w-5 h-5 text-groww-orange" />
        <h3 className="text-sm font-bold tracking-wider text-groww-navy uppercase">Client & Target Context</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Client Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('client.name')}
            />
          </div>
          {errors.client?.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.client.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Client Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('client.email')}
            />
          </div>
          {errors.client?.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.client.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Client Mobile</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Phone className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('client.phone')}
            />
          </div>
          {errors.client?.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.client.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Service Package Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
            {...register('client.package')}
          />
          {errors.client?.package && <p className="text-red-500 text-[10px] mt-0.5">{errors.client.package.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Service Package Description</label>
        <textarea
          rows="3"
          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
          placeholder="Describe the package benefits..."
          {...register('client.description')}
        />
        {errors.client?.description && <p className="text-red-500 text-[10px] mt-0.5">{errors.client.description.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Platforms Covered</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
          placeholder="e.g. 1. Instagram & Facebook Ads"
          {...register('page1.platformsCovered')}
        />
        {errors.page1?.platformsCovered && <p className="text-red-500 text-[10px] mt-0.5">{errors.page1.platformsCovered.message}</p>}
      </div>

      <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Quotation Serial No.</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Hash className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('meta.quoteNumber')}
            />
          </div>
          {errors.meta?.quoteNumber && <p className="text-red-500 text-[10px] mt-0.5">{errors.meta.quoteNumber.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Issue Date</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Calendar className="w-4 h-4" />
            </span>
            <input
              type="date"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('meta.date')}
            />
          </div>
          {errors.meta?.date && <p className="text-red-500 text-[10px] mt-0.5">{errors.meta.date.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Service Type Context</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Layers className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('meta.serviceType')}
            />
          </div>
          {errors.meta?.serviceType && <p className="text-red-500 text-[10px] mt-0.5">{errors.meta.serviceType.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Issued By</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <FileText className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('meta.issuedBy')}
            />
          </div>
          {errors.meta?.issuedBy && <p className="text-red-500 text-[10px] mt-0.5">{errors.meta.issuedBy.message}</p>}
        </div>
      </div>
    </div>
  );
}
