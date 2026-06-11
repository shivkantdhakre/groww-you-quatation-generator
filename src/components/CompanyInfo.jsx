import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Building2, Globe, Mail, Phone, Upload, FileText } from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';

export default function CompanyInfo() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const logo = watch('company.logo');

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 300);
        setValue('company.logo', compressedBase64, { shouldValidate: true });
      } catch (err) {
        console.error("Logo compression failed", err);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Building2 className="w-5 h-5 text-groww-orange" />
        <h3 className="text-sm font-bold tracking-wider text-groww-navy uppercase">Company Header Information</h3>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Quotation Subject</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <FileText className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="e.g. SERVICE QUOTATION"
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
            {...register('meta.subject')}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Company Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
            {...register('company.name')}
          />
          {errors.company?.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.company.name.message}</p>}
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Website</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Globe className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('company.website')}
            />
          </div>
          {errors.company?.website && <p className="text-red-500 text-[10px] mt-0.5">{errors.company.website.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('company.email')}
            />
          </div>
          {errors.company?.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.company.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Number</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Phone className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange"
              {...register('company.phone')}
            />
          </div>
          {errors.company?.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.company.phone.message}</p>}
        </div>
      </div>

      <div className="pt-2">
        <label className="block text-xs font-semibold text-slate-600 mb-1">Introduction Message</label>
        <textarea
          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-groww-orange min-h-[80px]"
          placeholder="As per our discussion..."
          {...register('company.introMessage')}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Update Company Logo</label>
        <div className="mt-1 flex items-center gap-4">
          {logo && (
            <img src={logo} alt="Preview" className="w-16 h-16 object-contain rounded-xl border p-1" />
          )}
          <label className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-groww-orange text-sm font-medium text-slate-600 hover:text-groww-orange transition-all">
            <Upload className="w-4 h-4" />
            <span>Upload Logo Image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>
        </div>
      </div>
    </div>
  );
}
