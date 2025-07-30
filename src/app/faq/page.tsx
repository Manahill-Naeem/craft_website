// frontend/src/app/faq/page.tsx
'use client'; // Keep this directive as it uses useState

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // For accordion icon
import Link from 'next/link'; // Import Link for the contact button

// metadata export has been moved to frontend/src/app/faq/layout.tsx

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg text-[#7A4E7A] hover:text-[#7A4E7A] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {question}
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 leading-relaxed animate-fade-in-down">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'Are your products handmade?',
      answer: 'Yes, all products at Crafted Whispers are lovingly and carefully handmade. Special attention is given to craftsmanship and quality in every piece.',
    },
    {
      question: 'How can I place a custom order?',
      answer: 'To place a custom order, you can fill out the inquiry form on our "Custom Orders" page, or contact us directly via email or phone. We will provide a design and quote according to your requirements.',
    },
    {
      question: 'What is the shipping and delivery process?',
      answer: 'We provide delivery across Pakistan. After an order is placed, we will contact you to confirm delivery details. Delivery time depends on the product type and your location.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only provide delivery within Pakistan. We plan to start international shipping in the future.',
    },
    {
      question: 'What are the accepted payment methods?',
      answer: 'We accept Cash on Delivery (COD). More payment options will be added soon.',
    },
    {
      question: 'Can I return or exchange a product if I don\'t like it?',
      answer: 'Our aim is to provide you with quality products. If you find any defect in the product, please contact us. The return policy for custom orders may vary.',
    },
    {
      question: 'How should I care for the products?',
      answer: 'Care instructions are provided with each product. Generally, protect products from direct sunlight and moisture, and use a soft cloth for cleaning.',
    },
    {
      question: 'Do you accept bulk orders?',
      answer: 'Yes, we do accept bulk orders. Please contact us with your requirements so we can provide you with special pricing and details.',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-primary-50 to-primary-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-10 lg:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#7A4E7A] text-center mb-6">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          Here you will find answers to common questions about Crafted Whispers. If your question is not here, please contact us.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <section className="text-center mt-12">
          <h2 className="text-3xl font-bold text-[#7A4E7A] mb-6">
            Contact Us for More Information
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            If you have any other questions or need further assistance, our team is always available to help you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-[#7A4E7A] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105 text-lg md:text-xl"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}
