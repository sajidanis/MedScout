import React, { useState } from 'react';

const HelpAndFeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit feedback logic
    console.log('Feedback:', feedback);
    console.log('Email:', email);
    // Reset form
    setFeedback('');
    setEmail('');
    alert('Thank you for your feedback!');
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Help Section */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-center text-bookmark-blue mb-6">Help & FAQ</h1>
        <div className="border-b py-4 shadow-md">
          <div className="cursor-pointer flex items-center">
            <span className="flex-1">How do I access my medical records?</span>
            <span className="text-bookmark-purple fas fa-chevron-down transition-all duration-300"></span>
          </div>
          <div className="bg-white px-4 py-2 mt-1 rounded-md">
            <p>You can access your records by navigating to the ‘My Records’ section after logging in.</p>
          </div>
        </div>

        <div className="border-b py-4 shadow-md mt-4">
          <div className="cursor-pointer flex items-center">
            <span className="flex-1">How do I share my medical history?</span>
            <span className="text-bookmark-purple fas fa-chevron-down transition-all duration-300"></span>
          </div>
          <div className="bg-white px-4 py-2 mt-1 rounded-md">
            <p>Use the ‘Share’ option in the ‘My Records’ section to generate a shareable link.</p>
          </div>
        </div>

        <div className="border-b py-4 shadow-md mt-4">
          <div className="cursor-pointer flex items-center">
            <span className="flex-1">How secure is my data?</span>
            <span className="text-bookmark-purple fas fa-chevron-down transition-all duration-300"></span>
          </div>
          <div className="bg-white px-4 py-2 mt-1 rounded-md">
            <p>All data is securely stored on a blockchain-based network with end-to-end encryption.</p>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-bookmark-blue mb-6">Submit Feedback</h2>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md shadow-md max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Your Feedback</label>
            <textarea
              id="feedback"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={handleFeedbackChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-bookmark-blue text-white py-2 px-4 rounded-md hover:bg-bookmark-purple">
            Submit
          </button>
        </form>
      </section>

      {/* Contact Support */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-bookmark-blue mb-4">Need Further Assistance?</h2>
        <p className="text-bookmark-grey mb-6">If your issue is not resolved, feel free to contact our support team.</p>
        <button className="bg-bookmark-red text-white py-2 px-4 rounded-md hover:bg-bookmark-white hover:text-black">
          Contact Support
        </button>
      </section>
    </div>
  );
};

export default HelpAndFeedbackScreen;
