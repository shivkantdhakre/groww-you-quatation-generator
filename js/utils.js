/* js/utils.js - State Management & Helpers */

const storageKey = 'growwQuotation2PageData';

const initialState = {
  meta: {
    subject: 'Ads Management',
    companySubtitle: 'Groww You - Software Development & Marketing',
    introText: 'As per our discussion we have made a quotaion letter and funcnality flow chart for you, We have ensured that we could do best for you ......',
    quoteNumber: 'GY-EC-2026-111',
    date: '19-May-2026',
    issuedBy: 'Groww You',
    currency: 'INR',
    priceUnit: '/ month',
    regardsName: 'Amit Bhardwaj',
    regardsTitle: 'Director, Groww You',
    regardsCompany: 'Groww You'
  },
  client: {
    name: 'Mr. Rahul Pandey',
    phone: '+91 7351700020',
    email: 'techvistaagra@gmail.com',
    package: 'Ads management',
    description: 'We are pleased to offer our Ads Management services to help grow your business through effective Facebook Ads, Instagram Ads and digital marketing campaigns.'
  },
  page1: {
    platformsCovered: '1. Instagram & Facebook Ads',
    services: [
      'Instagram & Facebook Ads',
      'Targeted Audience Setup & Optimization',
      'Leads generation'
    ]
  },
  page2: {
    pricing: [
      { item: 'Total Service Cost', cost: 5000 }
    ],
    terms: [
      'Minimum commitment: 3 Month',
      'Payment: 50% Advance & 50% after Month finish',
      'Ad budget is not included in service charges'
    ]
  }
};

// State is the single source of truth initialized with defaults
export let state = JSON.parse(JSON.stringify(initialState));

export function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Clean deep merge
      if (parsed.meta) state.meta = { ...initialState.meta, ...parsed.meta };
      if (parsed.client) state.client = { ...initialState.client, ...parsed.client };
      if (parsed.page1) state.page1 = { ...initialState.page1, ...parsed.page1 };
      if (parsed.page2) {
        state.page2 = {
          pricing: parsed.page2.pricing || [...initialState.page2.pricing],
          terms: parsed.page2.terms || [...initialState.page2.terms]
        };
      }
    } catch (e) {
      console.warn('Failed to parse stored state, using defaults', e);
    }
  }
}

export function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(storageKey);
  state = JSON.parse(JSON.stringify(initialState));
}

// Currency formatters
const currencySymbols = { INR: '₹', USD: '$', EUR: '€' };

export function formatCurrency(value) {
  const symbol = currencySymbols[state.meta.currency] || '₹';
  const cleanVal = Number(value) || 0;
  
  if (state.meta.currency === 'INR') {
    return `${symbol} ${cleanVal.toLocaleString('en-IN')}`;
  } else {
    return `${symbol} ${cleanVal.toLocaleString('en-US')}`;
  }
}

// Auto Quotation Number Generator
export function generateQuotationNumber() {
  const year = new Date().getFullYear();
  let count = localStorage.getItem("qCount") || 111;
  const number = `GY-EC-${year}-${String(count).padStart(3, '0')}`;
  return number;
}

export function incrementQuotationCount() {
  let count = localStorage.getItem("qCount") || 111;
  localStorage.setItem("qCount", Number(count) + 1);
}
