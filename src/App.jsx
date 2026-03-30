import { useState } from 'react'
import './App.css'

const LOAN_PRODUCTS = [
  'SBA 7(a)', 'SBA 504', 'USDA B&I', 'Conventional', 'CMBS', 'Bridge',
  'Construction', 'C-PACE', 'Life Company', 'Credit Union', 'Mezzanine',
  'Private / Hard Money', 'Debt Fund', 'DSCR Loan', 'Business Loan Only'
]

const PROPERTY_TYPES = [
  'Hotel — Flagged', 'Hotel — Independent', 'Motel', 'Extended Stay', 'Resort',
  'Gas Station / C-Store', 'Multifamily', 'Industrial', 'Retail', 'Mixed-Use',
  'Self-Storage', 'RV Park / Campground', 'Office', 'Restaurant',
  'Auto Service / Car Wash'
]

const REGIONS = [
  'Nationwide', 'Southeast', 'Northeast', 'Mid-Atlantic', 'Midwest', 'Southwest',
  'West Coast', 'Mountain West', 'Texas', 'Florida', 'California', 'State-Specific'
]

const RECOURSE_OPTIONS = [
  'Full Recourse', 'Non-Recourse', 'Partial / Carve-Outs Only', 'Case by Case'
]

const DEAL_TYPES = [
  'Acquisition', 'Refinance', 'Cash-Out Refinance', 'Partner Buyout',
  'New Construction', 'Bridge to Perm', 'Note Purchase / DPO', 'Rehab / Value-Add',
  'Proforma'
]

function ChipSelect({ items, selected, onToggle }) {
  return (
    <div className="chip-grid">
      {items.map(item => (
        <button
          key={item}
          type="button"
          className={`chip ${selected.includes(item) ? 'selected' : ''}`}
          onClick={() => onToggle(item)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    bank_name: '',
    full_name: '',
    email: '',
    phone: '',
    title_role: '',
    bank_hq_location: '',
    loan_products: [],
    property_types: [],
    regions: [],
    specific_states: '',
    min_loan_size: '',
    max_loan_size: '',
    max_ltv: '',
    min_dscr: '',
    min_fico: '',
    rate_range: '',
    amortization: '',
    typical_loan_term: '',
    prepayment_structure: '',
    recourse_options: [],
    deal_types: [],
    notify_deals: false,
    additional_notes: ''
  })

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const toggleChip = (field, item) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        alert(data.error || 'Submission failed. Please try again.')
      }
    } catch {
      alert('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="app">
        <div className="header">
          <div className="header-logo">
            <span className="pineapple">🍍</span>
            <span>Pineapple <span className="capital">Capital</span> Group</span>
          </div>
        </div>
        <div className="success-overlay">
          <div className="checkmark">✅</div>
          <h2>Thank You!</h2>
          <p>Your lending parameters have been submitted successfully. We'll match you with relevant deals that fit your criteria.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-logo">
          <span className="pineapple">🍍</span>
          <span>Pineapple <span className="capital">Capital</span> Group</span>
        </div>
        <div className="subtitle-label">Lender Partner Network</div>
        <h1>Lender <span className="highlight">Questionnaire</span></h1>
        <p>Help us understand your lending box so we can match you to the right deals. Takes about 2 minutes.</p>
        <div className="estimated-time">
          <span className="dot"></span>
          Estimated time: 2 minutes
        </div>
      </div>

      {/* Contact Card */}
      <div className="contact-card">
        <div className="contact-avatar">🍍</div>
        <div className="contact-info">
          <h3>Pineapple Capital Group</h3>
          <div className="role">Dave Shah · Managing Director</div>
          <div className="contact-details">
            <span>📞 850.960.5500</span>
            <span>✉️ dave@pineapplecapitalgroup.com</span>
            <span>📍 3324 Peachtree Rd NE, Suite 2714 · Atlanta, GA 30326</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* YOUR INFORMATION */}
        <div className="form-section">
          <div className="section-header">
            <span className="icon">👤</span>
            <h2>Your Information</h2>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Bank / Institution Name <span className="required">*</span></label>
              <input
                type="text"
                placeholder="e.g. Live Oak Bank"
                value={form.bank_name}
                onChange={e => updateField('bank_name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Your Full Name <span className="required">*</span></label>
              <input
                type="text"
                placeholder="e.g. Jamie Bourgeois"
                value={form.full_name}
                onChange={e => updateField('full_name', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email <span className="required">*</span></label>
              <input
                type="email"
                placeholder="jamie@liveoakbank.com"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone <span className="required">*</span></label>
              <input
                type="tel"
                placeholder="(XXX) XXX-XXXX"
                value={form.phone}
                onChange={e => updateField('phone', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Title / Role</label>
              <input
                type="text"
                placeholder="e.g. VP Commercial Lending"
                value={form.title_role}
                onChange={e => updateField('title_role', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Bank Headquarters Location</label>
              <input
                type="text"
                placeholder="e.g. Wilmington, NC"
                value={form.bank_hq_location}
                onChange={e => updateField('bank_hq_location', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* LOAN PRODUCTS OFFERED */}
        <div className="form-section">
          <div className="section-header">
            <span className="icon">💼</span>
            <h2>Loan Products Offered</h2>
          </div>
          <div className="chip-label">Select all products you offer:</div>
          <ChipSelect
            items={LOAN_PRODUCTS}
            selected={form.loan_products}
            onToggle={item => toggleChip('loan_products', item)}
          />
        </div>

        {/* PROPERTY TYPES */}
        <div className="form-section">
          <div className="section-header">
            <span className="icon">🏨</span>
            <h2>Property Types</h2>
          </div>
          <div className="chip-label">What do you lend on?</div>
          <ChipSelect
            items={PROPERTY_TYPES}
            selected={form.property_types}
            onToggle={item => toggleChip('property_types', item)}
          />
        </div>

        {/* GEOGRAPHIC FOCUS */}
        <div className="form-section">
          <div className="section-header">
            <span className="icon">🌎</span>
            <h2>Geographic Focus</h2>
          </div>
          <div className="chip-label">Select all regions you lend in:</div>
          <ChipSelect
            items={REGIONS}
            selected={form.regions}
            onToggle={item => toggleChip('regions', item)}
          />
          <div className="form-row" style={{ marginTop: '8px' }}>
            <div className="form-group full-width">
              <label>Specific States (if applicable)</label>
              <input
                type="text"
                placeholder="e.g. GA, FL, TN, NC, SC, AL"
                value={form.specific_states}
                onChange={e => updateField('specific_states', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* LENDING PARAMETERS */}
        <div className="form-section">
          <div className="section-header">
            <span className="icon">🏦</span>
            <h2>Lending Parameters</h2>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Minimum Loan Size</label>
              <input
                type="text"
                placeholder="$0"
                value={form.min_loan_size}
                onChange={e => updateField('min_loan_size', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Maximum Loan Size</label>
              <input
                type="text"
                placeholder="$0"
                value={form.max_loan_size}
                onChange={e => updateField('max_loan_size', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Maximum LTV (%)</label>
              <input
                type="text"
                placeholder="e.g. 75"
                value={form.max_ltv}
                onChange={e => updateField('max_ltv', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Minimum DSCR</label>
              <input
                type="text"
                placeholder="e.g. 1.25"
                value={form.min_dscr}
                onChange={e => updateField('min_dscr', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Minimum FICO</label>
              <input
                type="text"
                placeholder="e.g. 680"
                value={form.min_fico}
                onChange={e => updateField('min_fico', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Rate Range</label>
              <input
                type="text"
                placeholder="e.g. 6.5% – 8.5%"
                value={form.rate_range}
                onChange={e => updateField('rate_range', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Amortization</label>
              <input
                type="text"
                placeholder="e.g. 20, 25, 30 years"
                value={form.amortization}
                onChange={e => updateField('amortization', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Typical Loan Term</label>
              <input
                type="text"
                placeholder="e.g. 5, 7, 10 years"
                value={form.typical_loan_term}
                onChange={e => updateField('typical_loan_term', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* DEAL PREFERENCES */}
        <div className="form-section">
          <div className="section-header">
            <span className="icon">💝</span>
            <h2>Deal Preferences</h2>
          </div>

          <div className="form-row" style={{ marginBottom: '20px' }}>
            <div className="form-group full-width">
              <label>Prepayment Structure</label>
              <input
                type="text"
                placeholder="e.g. 5-4-3-2-1 step-down"
                value={form.prepayment_structure}
                onChange={e => updateField('prepayment_structure', e.target.value)}
              />
            </div>
          </div>

          <div className="chip-label">Recourse Options Offered (select all that apply):</div>
          <ChipSelect
            items={RECOURSE_OPTIONS}
            selected={form.recourse_options}
            onToggle={item => toggleChip('recourse_options', item)}
          />

          <div className="chip-label" style={{ marginTop: '16px' }}>Deal Types You Can Execute:</div>
          <ChipSelect
            items={DEAL_TYPES}
            selected={form.deal_types}
            onToggle={item => toggleChip('deal_types', item)}
          />

          <div className="consent-box">
            <input
              type="checkbox"
              checked={form.notify_deals}
              onChange={e => updateField('notify_deals', e.target.checked)}
              id="notify-checkbox"
            />
            <label htmlFor="notify-checkbox" className="consent-text">
              <strong>Yes, notify me when deals match my criteria</strong>
              <p>I agree to receive deal notifications via email and/or text message from Pineapple Capital Group when a qualified borrower submission matches my lending parameters. I can opt out at any time.</p>
            </label>
          </div>
        </div>

        {/* ANYTHING ELSE? */}
        <div className="form-section">
          <div className="section-header">
            <span className="icon">💬</span>
            <h2>Anything Else?</h2>
          </div>
          <div className="form-group">
            <label>Current lending appetite, sweet spots, special programs, anything we should know:</label>
            <textarea
              placeholder="e.g. We're especially active on flagged select-service hotels in the $3M-$8M range right now..."
              value={form.additional_notes}
              onChange={e => updateField('additional_notes', e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="submit-wrapper">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit My Lending Parameters →'}
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="footer">
        <div>Pineapple Capital Group · 3324 Peachtree Rd NE, Suite 2714, Atlanta, GA 30326</div>
        <div><a href="https://pineapplecapitalgroup.com" target="_blank" rel="noopener noreferrer">pineapplecapitalgroup.com</a> · (850) 960-5500</div>
      </div>
    </div>
  )
}

export default App
