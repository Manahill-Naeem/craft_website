// frontend/src/app/contact/page.tsx
'use client'; // Keep this directive as it uses useState

import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; // Icons for contact info

// metadata export has been moved to frontend/src/app/contact/layout.tsx

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setMessageType(null);

    // In a real application, you would send this data to your backend API
    // For now, we'll simulate a submission
    try {
      // Use the actual backend API endpoint for sending emails
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/email/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message || 'Your message has been received! We will get back to you shortly.');
        setMessageType('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        setSubmitMessage(data.message || 'Failed to send message. Please try again or contact us directly.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Failed to send message. Please check your internet connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-primary-50 to-primary-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-10 lg:p-12">
        {/* Corrected color class for h1 */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#7A4E7A] text-center mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          For your questions, suggestions, or custom order inquiries, we are always available. Contact us using the information below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Contact Info */}
          <div className="flex flex-col items-center text-center">
            <Mail className="w-12 h-12 text-[#4B2B4F] mb-4" />
            <h2 className="text-2xl font-bold text-[#4B2B4F] mb-2">Email</h2>
            <p className="text-lg text-gray-600">
              <a href="mailto:craftedwhispers34@gmail.com" className="hover:text-[#7A4E7A] transition-colors">craftedwhispers@gmail.com</a>
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Phone className="w-12 h-12 text-[#4B2B4F] mb-4" />
            <h2 className="text-2xl font-bold text-[#4B2B4F] mb-2">Phone</h2>
            <p className="text-lg text-gray-600">
              <a href="tel:+923XXXXXXXXX" className="hover:text-[#7A4E7A] transition-colors">+92 3180305269</a>
            </p>
            <p className="text-sm text-gray-500 mt-1">(Working hours: Mon-Fri, 9 AM - 5 PM PKT)</p>
          </div>
          <div className="md:col-span-2 flex flex-col items-center text-center">
            <MapPin className="w-12 h-12 text-[#4B2B4F] mb-4" />
            <h2 className="text-2xl font-bold text-[#7A4E7A] mb-2">Our Address</h2>
            <p className="text-lg text-gray-600">
              Karachi, Pakistan
            </p>
            <p className="text-sm text-gray-500 mt-1">(Online store, appointments by request)</p>
          </div>
        </div>

        {/* Contact Form */}
        <section>
          <h2 className="text-3xl font-bold text-[#7A4E7A] mb-6 text-center">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#7A4E7A] focus:border-[#7A4E7A]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#7A4E7A] focus:border-[#7A4E7A]"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#7A4E7A] focus:border-[#7A4E7A]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500"
              ></textarea>
            </div>
            {submitMessage && (
              <div className={`p-3 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitMessage}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center rounded-md border border-transparent bg-[#7A4E7A] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6B3E6B] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
