/* js/app.js - Main Application Orchestrator */

import { state, loadState, saveState, resetState, generateQuotationNumber, incrementQuotationCount } from './utils.js';
import { renderPreview } from './preview.js';
import { exportToPdf } from './pdf.js';

function renderAdminPanel() {
  // Populate single-value inputs
  document.getElementById('quoteSubject').value = state.meta.subject || '';
  document.getElementById('companySubtitle').value = state.meta.companySubtitle || '';
  document.getElementById('introText').value = state.meta.introText || '';
  document.getElementById('quoteNumber').value = state.meta.quoteNumber || '';
  document.getElementById('quoteDate').value = state.meta.date || '';
  document.getElementById('issuedBy').value = state.meta.issuedBy || '';
  document.getElementById('currencySelect').value = state.meta.currency || 'INR';

  document.getElementById('clientName').value = state.client.name || '';
  document.getElementById('clientPhone').value = state.client.phone || '';
  document.getElementById('clientEmail').value = state.client.email || '';
  document.getElementById('clientPackage').value = state.client.package || '';
  document.getElementById('packageDescription').value = state.client.description || '';

  document.getElementById('platformsCovered').value = state.page1.platformsCovered || '';

  document.getElementById('regardsName').value = state.meta.regardsName || '';
  document.getElementById('regardsTitle').value = state.meta.regardsTitle || '';
  document.getElementById('regardsCompany').value = state.meta.regardsCompany || '';
  document.getElementById('priceUnit').value = state.meta.priceUnit || '';

  // Render Services list editor
  const servicesListDiv = document.getElementById('servicesList');
  servicesListDiv.innerHTML = '';
  state.page1.services.forEach((service, idx) => {
    const div = document.createElement('div');
    div.className = 'admin-item';
    div.dataset.idx = idx;
    div.innerHTML = `
      <input type="text" class="service-item-input" value="${service}" placeholder="e.g. Targeted optimization" />
      <button class="remove-btn remove-service-item">Delete</button>
    `;
    servicesListDiv.appendChild(div);
  });

  // Render Pricing list editor
  const pricingListDiv = document.getElementById('pricingList');
  pricingListDiv.innerHTML = '';
  state.page2.pricing.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'admin-item';
    div.dataset.idx = idx;
    div.innerHTML = `
      <input type="text" class="pricing-name-input" value="${p.item}" style="flex: 2;" placeholder="Pricing label (e.g. Service Fee)" />
      <input type="number" class="pricing-cost-input" value="${p.cost}" style="flex: 1;" placeholder="Amount" />
      <button class="remove-btn remove-pricing-item">Delete</button>
    `;
    pricingListDiv.appendChild(div);
  });

  // Render Terms list editor
  const termsListDiv = document.getElementById('termsList');
  termsListDiv.innerHTML = '';
  state.page2.terms.forEach((term, idx) => {
    const div = document.createElement('div');
    div.className = 'admin-item';
    div.dataset.idx = idx;
    div.innerHTML = `
      <input type="text" class="term-item-input" value="${term}" placeholder="Payment term (e.g. 50% Advance)" />
      <button class="remove-btn remove-term-item">Delete</button>
    `;
    termsListDiv.appendChild(div);
  });
}

function attachHandlers() {
  const bindInput = (id, obj, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', e => {
      obj[key] = e.target.value;
      saveState();
      renderPreview();
    });
  };

  // Bind individual inputs to state keys
  bindInput('quoteSubject', state.meta, 'subject');
  bindInput('companySubtitle', state.meta, 'companySubtitle');
  bindInput('introText', state.meta, 'introText');
  bindInput('quoteNumber', state.meta, 'quoteNumber');
  bindInput('quoteDate', state.meta, 'date');
  bindInput('issuedBy', state.meta, 'issuedBy');
  bindInput('clientName', state.client, 'name');
  bindInput('clientPhone', state.client, 'phone');
  bindInput('clientEmail', state.client, 'email');
  bindInput('clientPackage', state.client, 'package');
  bindInput('packageDescription', state.client, 'description');
  bindInput('platformsCovered', state.page1, 'platformsCovered');
  bindInput('priceUnit', state.meta, 'priceUnit');
  bindInput('regardsName', state.meta, 'regardsName');
  bindInput('regardsTitle', state.meta, 'regardsTitle');
  bindInput('regardsCompany', state.meta, 'regardsCompany');

  // Bind Currency drop-down
  const currencySelect = document.getElementById('currencySelect');
  if (currencySelect) {
    currencySelect.addEventListener('change', e => {
      state.meta.currency = e.target.value;
      saveState();
      renderPreview();
    });
  }

  // Dynamic Service Details handlers
  document.getElementById('addServiceBtn').addEventListener('click', () => {
    state.page1.services.push('New service detail item');
    saveState();
    renderAdminPanel();
    renderPreview();
  });

  const servicesListDiv = document.getElementById('servicesList');
  servicesListDiv.addEventListener('input', e => {
    if (e.target.classList.contains('service-item-input')) {
      const idx = e.target.closest('.admin-item').dataset.idx;
      state.page1.services[idx] = e.target.value;
      saveState();
      renderPreview();
    }
  });

  servicesListDiv.addEventListener('click', e => {
    if (e.target.classList.contains('remove-service-item')) {
      const idx = e.target.closest('.admin-item').dataset.idx;
      state.page1.services.splice(idx, 1);
      saveState();
      renderAdminPanel();
      renderPreview();
    }
  });

  // Dynamic Pricing List handlers
  document.getElementById('addPricingBtn').addEventListener('click', () => {
    state.page2.pricing.push({ item: 'Total Service Cost', cost: 0 });
    saveState();
    renderAdminPanel();
    renderPreview();
  });

  const pricingListDiv = document.getElementById('pricingList');
  pricingListDiv.addEventListener('input', e => {
    const itemRow = e.target.closest('.admin-item');
    if (!itemRow) return;
    const idx = itemRow.dataset.idx;

    if (e.target.classList.contains('pricing-name-input')) {
      state.page2.pricing[idx].item = e.target.value;
    } else if (e.target.classList.contains('pricing-cost-input')) {
      const val = Number(e.target.value);
      state.page2.pricing[idx].cost = val >= 0 ? val : 0;
    }
    saveState();
    renderPreview();
  });

  pricingListDiv.addEventListener('click', e => {
    if (e.target.classList.contains('remove-pricing-item')) {
      const idx = e.target.closest('.admin-item').dataset.idx;
      state.page2.pricing.splice(idx, 1);
      saveState();
      renderAdminPanel();
      renderPreview();
    }
  });

  // Dynamic Payment Terms handlers
  document.getElementById('addTermBtn').addEventListener('click', () => {
    state.page2.terms.push('New payment term details');
    saveState();
    renderAdminPanel();
    renderPreview();
  });

  const termsListDiv = document.getElementById('termsList');
  termsListDiv.addEventListener('input', e => {
    if (e.target.classList.contains('term-item-input')) {
      const idx = e.target.closest('.admin-item').dataset.idx;
      state.page2.terms[idx] = e.target.value;
      saveState();
      renderPreview();
    }
  });

  termsListDiv.addEventListener('click', e => {
    if (e.target.classList.contains('remove-term-item')) {
      const idx = e.target.closest('.admin-item').dataset.idx;
      state.page2.terms.splice(idx, 1);
      saveState();
      renderAdminPanel();
      renderPreview();
    }
  });

  // Reset Application State handler
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all modifications and reload the standard template?')) {
      resetState();
      saveState();
      location.reload();
    }
  });

  // Export PDF trigger handler
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', () => {
      // Increment count on each export
      incrementQuotationCount();
      exportToPdf(exportPdfBtn);
    });
  }
}

// Initialise application components on DOM load
window.addEventListener('DOMContentLoaded', () => {
  loadState();

  // If new load has default/empty number, seed it dynamically
  if (!state.meta.quoteNumber || state.meta.quoteNumber === 'GY-EC-2026-111') {
    state.meta.quoteNumber = generateQuotationNumber();
  }

  // Synchronise preview panel and builder fields
  renderAdminPanel();
  renderPreview();
  attachHandlers();
});
