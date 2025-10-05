import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Package } from '@/pages/Packages';

interface QueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: Package | null;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const QueryModal = ({ isOpen, onClose, package: pkg }: QueryModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !pkg) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!pkg) return;

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const sheetUrl = 'https://script.google.com/macros/s/AKfycbx5JceCGQC3GD4B66cAhnX7soLGDlVhwU3SH_3-PUuKZwT6oSWzlb2rvb7YJwhxaHWHxQ/exec'; // <-- Replace this with your Apps Script URL

    const response = await fetch(sheetUrl, {
      method: 'POST',
      body: JSON.stringify({
        package: pkg.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (data.success) {
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } else {
      console.error('Failed to save to sheet', data.error);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    setIsSubmitting(false);
  }
};


  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    setIsSuccess(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-lg backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {isSuccess ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Query Sent!</h3>
              <p className="text-gray-600">
                Thank you for your interest in {pkg.title}. We'll get back to you shortly.
              </p>
            </div>
          ) : (
            // Form State
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 id="modal-title" className="text-2xl font-playfair italic text-gray-900 mb-2">
                  Send Query
                </h2>
                <p className="text-sm text-gray-600">
                  Interested in <span className="font-semibold text-[hsl(var(--brand-orange))]">{pkg.title}</span>? Fill out the form below.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[hsl(var(--brand-orange))] focus:border-transparent transition-colors`}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[hsl(var(--brand-orange))] focus:border-transparent transition-colors`}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[hsl(var(--brand-orange))] focus:border-transparent transition-colors`}
                    placeholder="+91 9999999999"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[hsl(var(--brand-orange))] focus:border-transparent transition-colors resize-none`}
                    placeholder="Tell us about your travel preferences, group size, dates, etc."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3
                           bg-[hsl(var(--brand-orange))] text-white rounded-xl
                           hover:bg-[hsl(var(--brand-orange))]/90
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors duration-300 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Query
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
