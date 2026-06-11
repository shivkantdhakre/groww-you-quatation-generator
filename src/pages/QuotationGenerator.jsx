import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import { RefreshCw, FileDown, Copy, Check, Info } from 'lucide-react';

import CompanyInfo from '../components/CompanyInfo';
import ClientInfo from '../components/ClientInfo';
import ProjectDetails from '../components/ProjectDetails';
import PricingSection from '../components/PricingSection';
import PaymentTerms from '../components/PaymentTerms';
import QuotationPDF from '../components/QuotationPDF';

import { defaultPaymentTerms, defaultProjectItems } from '../data/defaultTerms';
import { generateQuotationNumber } from '../utils/helpers';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';

// Zod validation schema
const quotationSchema = z.object({
  company: z.object({
    name: z.string().min(1, "Company Name is required"),
    website: z.string().min(1, "Website is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Contact Number is required"),
    logo: z.string().nullable()
  }),
  client: z.object({
    name: z.string().min(1, "Client Name is required"),
    email: z.string().email("Invalid email address").or(z.literal("")),
    phone: z.string().min(1, "Client Mobile is required").or(z.literal("")),
    package: z.string().min(1, "Package Title is required"),
    description: z.string().optional()
  }),
  meta: z.object({
    quoteNumber: z.string().min(1, "Invoice ID is required"),
    date: z.string().min(1, "Date is required"),
    serviceType: z.string().min(1, "Service Type is required"),
    issuedBy: z.string().min(1, "Issued By is required"),
    currency: z.enum(["INR", "USD", "EUR"]),
    priceUnit: z.string().optional()
  }),
  project: z.object({
    items: z.array(z.object({
      name: z.string()
    }))
  }),
  page1: z.object({
    platformsCovered: z.string().min(1, "Platforms Covered is required")
  }),
  pricing: z.object({
    totalAmount: z.coerce.number().positive("Must be greater than 0"),
    taxPercentage: z.coerce.number().min(0, "Tax cannot be negative")
  }),
  terms: z.array(z.object({
    percentage: z.coerce.number().min(0).max(100),
    milestone: z.string().min(1, "Milestone name is required")
  })).refine((terms) => {
    const sum = terms.reduce((acc, curr) => acc + (Number(curr.percentage) || 0), 0);
    return sum === 100;
  }, { message: "Milestone percentages must sum up to exactly 100%" })
});

const createInitialState = () => ({
  company: {
    name: 'Groww You',
    website: 'www.growwyou.com',
    email: 'info@growwyou.com',
    phone: '+91 7351700020',
    logo: null,
  },
  client: {
    name: '',
    company: '',
    email: '',
    phone: '',
    package: 'Ads management',
    description: 'We are pleased to offer our Ads Management services to help grow your business through effective Facebook Ads, Instagram Ads and digital marketing campaigns.'
  },
  meta: {
    quoteNumber: generateQuotationNumber(),
    date: new Date().toISOString().split('T')[0],
    serviceType: 'Digital Enterprise Scope',
    issuedBy: 'Groww You',
    currency: 'INR',
    priceUnit: '/ month'
  },
  project: {
    items: defaultProjectItems.map(name => ({ name }))
  },
  page1: {
    platformsCovered: '1. Instagram & Facebook Ads'
  },
  pricing: {
    totalAmount: 5000,
    taxPercentage: 18
  },
  terms: [...defaultPaymentTerms]
});

export default function QuotationGenerator() {
  const [storedData, setStoredData] = useLocalStorage('groww_state_v3', null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const methods = useForm({
    resolver: zodResolver(quotationSchema),
    defaultValues: storedData || createInitialState(),
    mode: 'onChange'
  });

  const { watch, reset, setValue, control, trigger, formState: { isValid } } = methods;

  // Save changes to localStorage on any form input via subscription to avoid infinite loop
  useEffect(() => {
    const subscription = watch((value) => {
      setStoredData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, setStoredData]);

  // Debounce inputs for PDFViewer rendering to prevent lag
  const watchedValuesForDebounce = useWatch({ control });
  const debouncedData = useDebounce(watchedValuesForDebounce, 1200);

  const handleReset = () => {
    if (window.confirm("Purge application values and reload defaults?")) {
      const freshDefaults = createInitialState();
      reset(freshDefaults);
    }
  };

  const handleCopySerial = async () => {
    try {
      const serial = watch('meta.quoteNumber');
      await navigator.clipboard.writeText(serial);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy serial", err);
    }
  };

  // On-demand PDF Generation and download trigger
  const handleDownload = async () => {
    // Run full validation to highlight missing/invalid fields on screen
    const isFormValid = await trigger();
    if (!isFormValid) {
      alert("Please fix all form validation errors before exporting.");
      return;
    }

    setIsGenerating(true);
    try {
      const currentData = watch();
      const doc = <QuotationPDF data={currentData} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `Quotation_${currentData.meta.quoteNumber}.pdf`;
      link.click();
      
      // Revoke URL object with a 1000ms delay to prevent Safari/iOS mid-stream cancellation
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      // Increment serial index and save to storage
      const nextCount = Number(localStorage.getItem('qCount') || 111) + 1;
      localStorage.setItem('qCount', nextCount);
      
      // Update quotation number in form
      const year = new Date().getFullYear();
      const newQuoteNum = `GY-EC-${year}-${String(nextCount).padStart(3, '0')}`;
      setValue('meta.quoteNumber', newQuoteNum, { shouldValidate: true });
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to compile vector PDF document. Check console details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-groww-navy">
      <FormProvider {...methods}>
        {/* Top Application Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-sm z-30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-groww-navy rounded-xl flex items-center justify-center text-white font-black text-xl">G</div>
            <div>
              <h1 className="text-base font-black tracking-tight">GROWW YOU</h1>
              <p className="text-[10px] font-bold tracking-widest text-groww-orange uppercase">Quotation Workspace Engine</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear All Values
            </button>
            <button
              type="button"
              onClick={handleCopySerial}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all w-[130px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <RefreshCw className="w-3.5 h-3.5 hidden" />}
              {copied ? 'Copied ID' : 'Copy Invoice ID'}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating}
              className={`flex items-center gap-1.5 px-5 py-2 text-white font-bold text-xs rounded-xl shadow-md transition-all ${
                isGenerating 
                  ? 'bg-slate-300 cursor-not-allowed opacity-60' 
                  : 'bg-groww-navy hover:bg-groww-dark cursor-pointer'
              }`}
            >
              <FileDown className="w-3.5 h-3.5" /> 
              {isGenerating ? 'Compiling PDF...' : 'Download Document PDF'}
            </button>
          </div>
        </header>

        {/* Main Workspace Frame */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 lg:overflow-hidden">
          {/* Forms Field Panel Container */}
          <section className="lg:col-span-5 p-6 space-y-6 lg:max-h-[calc(100vh-73px)] lg:overflow-y-auto no-print">
            {!isValid && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Fill in all required fields and ensure payment milestones sum up to exactly 100% to download the PDF document.</span>
              </div>
            )}
            
            <CompanyInfo />
            <ClientInfo />
            <ProjectDetails />
            <PricingSection />
            <PaymentTerms />

            {/* Bottom Actions Panel for easy access on all screens, especially mobile */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 no-print">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Clear All Values
              </button>
              <button
                type="button"
                onClick={handleCopySerial}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all sm:w-[130px] cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <RefreshCw className="w-3.5 h-3.5 hidden" />}
                {copied ? 'Copied ID' : 'Copy Invoice ID'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isGenerating}
                className={`flex-1 flex items-center justify-center gap-1.5 px-5 py-2.5 text-white font-bold text-xs rounded-xl shadow-md transition-all ${
                  isGenerating 
                    ? 'bg-slate-300 cursor-not-allowed opacity-60' 
                    : 'bg-groww-navy hover:bg-groww-dark cursor-pointer'
                }`}
              >
                <FileDown className="w-3.5 h-3.5" /> 
                {isGenerating ? 'Compiling PDF...' : 'Download Document PDF'}
              </button>
            </div>
          </section>

          {/* Direct IFrame PDF Preview Panel */}
          <section className="lg:col-span-7 bg-slate-300 p-6 flex items-start justify-center lg:max-h-[calc(100vh-73px)] lg:overflow-y-auto border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="w-full h-full min-h-[600px] max-lg:pointer-events-none bg-slate-200 rounded-2xl overflow-hidden shadow-inner border border-slate-300 flex items-center justify-center">
              {debouncedData && debouncedData.company ? (
                <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }}>
                  <QuotationPDF data={debouncedData} />
                </PDFViewer>
              ) : (
                <div className="text-slate-500 text-sm font-semibold flex items-center gap-2">
                  <RefreshCw className="animate-spin w-4 h-4 text-groww-orange" />
                  <span>Preparing document engine...</span>
                </div>
              )}
            </div>
          </section>
        </main>
      </FormProvider>
    </div>
  );
}
