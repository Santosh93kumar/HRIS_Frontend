import React, { useState , useEffect, useCallback} from 'react';
import { X } from 'lucide-react';

const SetupPopup = ({isOpen, onClose}) => {
 
  const [activeTab, setActiveTab] = useState('Payroll');
  const [formData, setFormData] = useState({
    payroll: {
      name: '',
      year: ''
    },
    taxExemption: {
      taxableIncomeLimit: '',
      ageLimit: '',
      percentage: ''
    },
    pf: {
        type:'Select Type',
      employeeContribution: '',
      employerContribution: ''
    },
    sses: {
      rate: '',
      maxContribution: ''
    },
    eobi: {
      rate: '',
      minWage: ''
    },
    gratuity: {
      yearsOfService: '',
      factor: ''
    }
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // blur effect 
  const handleKeyDown = useCallback((event) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
  
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    }, [onClose]);
  
    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        const firstInput = document.querySelector('input');
        if (firstInput) firstInput.focus();
      }
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, handleKeyDown]);

  const renderPayrollForm = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Payroll Name
        </label>
        <input
          type="text"
          value={formData.payroll.name}
          onChange={(e) => handleInputChange('payroll', 'name', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter payroll name"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Payroll Year
        </label>
        <input
          type="text"
          value={formData.payroll.year}
          onChange={(e) => handleInputChange('payroll', 'year', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter year"
        />
      </div>
    </div>
  );

  const renderTaxExemptionForm = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Taxable Income Limit
        </label>
        <input
          type="number"
          value={formData.taxExemption.taxableIncomeLimit}
          onChange={(e) => handleInputChange('taxExemption', 'taxableIncomeLimit', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Income Limit"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Exampt Age Limit
        </label>
        <input
          type="number"
          value={formData.taxExemption.ageLimit}
          onChange={(e) => handleInputChange('taxExemption', 'ageLimit', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Age Limit"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Exampt Percentage
        </label>
        <input
          type="number"
          value={formData.taxExemption.percentage}
          onChange={(e) => handleInputChange('taxExemption', 'percentage', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Percentage"
        />
      </div>
    </div>
  );

  const renderPFForm = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={formData.pf.type}  // Corrected value reference
          onChange={(e) => handleInputChange('pf', 'type', e.target.value)}  // Corrected state update
          className="w-full p-2 border rounded-md"
        >
          <option value="Select Type">Select Type</option>
          <option value="EPF">EPF</option>
          <option value="VPF">VPF</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Employee Contribution</label>
        <input
          type="number"
          value={formData.pf.employeeContribution} // Corrected value reference
          onChange={(e) => handleInputChange('pf', 'employeeContribution', e.target.value)} // Corrected state update
          className="w-full p-2 border rounded-md"
          placeholder="Enter Contribution"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Employer Contribution</label>
        <input
          type="number"
          value={formData.pf.employerContribution} // Corrected value reference
          onChange={(e) => handleInputChange('pf', 'employerContribution', e.target.value)} // Corrected state update
          className="w-full p-2 border rounded-md"
          placeholder="Enter Contribution"
        />
      </div>
    </div>
  );
  
  const renderSSESForm = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          SSES Rate
        </label>
        <input
          type="number"
          value={formData.sses.rate}
          onChange={(e) => handleInputChange('sses', 'rate', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Rate"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Maximum Contribution
        </label>
        <input
          type="number"
          value={formData.sses.maxContribution}
          onChange={(e) => handleInputChange('sses', 'maxContribution', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Amount"
        />
      </div>
    </div>
  );

  const renderEOBIForm = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          EOBI Rate
        </label>
        <input
          type="number"
          value={formData.eobi.rate}
          onChange={(e) => handleInputChange('eobi', 'rate', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Rate"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Minimum Wage
        </label>
        <input
          type="number"
          value={formData.eobi.minWage}
          onChange={(e) => handleInputChange('eobi', 'minWage', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Amount"
        />
      </div>
    </div>
  );

  const renderGratuityForm = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Years of Service
        </label>
        <input
          type="number"
          value={formData.gratuity.yearsOfService}
          onChange={(e) => handleInputChange('gratuity', 'yearsOfService', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Years"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Gratuity Factor
        </label>
        <input
          type="number"
          value={formData.gratuity.factor}
          onChange={(e) => handleInputChange('gratuity', 'factor', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter Factor"
        />
      </div>
    </div>
  );

  const getActiveForm = () => {
    switch (activeTab) {
      case 'Payroll':
        return renderPayrollForm();
      case 'Tax Examption Age':
        return renderTaxExemptionForm();
      case 'PF':
        return renderPFForm();
      case 'SSES':
        return renderSSESForm();
      case 'EOBI':
        return renderEOBIForm();
      case 'Gratuity':
        return renderGratuityForm();
      default:
        return null;
    }
  };

  const handleSave = () => {
    console.log('Saving data:', formData); // Debugging purpose
    localStorage.setItem('setupData', JSON.stringify(formData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-between  items-center p-4 border-b m-4 border-gray-400">
          <h2 className="text-xl font-medium">Add Setup</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        

        <div className="p-4">
  <div className="flex space-x-4 border-b border-gray-400 mb-4">
    {['Payroll', 'Tax Examption Age', 'PF', 'SSES', 'EOBI', 'Gratuity'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`py-2 px-4 relative ${
          activeTab === tab
            ? 'text-gray-700 font-semibold border-x border-t border-gray-400 bg-white z-10'  // Adds top, left, right border & removes bottom
            : 'text-sky-500 hover:text-gray-400 border-transparent'
        }`}
      >
        {tab}
        {activeTab === tab && (
          // This pseudo-element (a span) is positioned to cover the parent’s bottom border
          <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-white" />
        )}

      </button>
    ))}
  </div>

  <div className="mt-4">
    {getActiveForm()}
  </div>
</div>


        <div className="flex justify-end gap-2 p-4 ">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Close
          </button>
          <button
          onClick={handleSave}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPopup;