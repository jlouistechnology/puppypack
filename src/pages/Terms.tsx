import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Last updated: March 8, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600">
              By accessing or using PuppyPack's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily access and use PuppyPack's services for personal, non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Modifying or copying our materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Attempting to reverse engineer any software</li>
              <li>Removing any copyright or proprietary notations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
            <p className="text-gray-600">
              PuppyPack's services are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
            <p className="text-gray-600">
              In no event shall PuppyPack or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Subscriptions and Payments</h2>
            <p className="text-gray-600">
              Some aspects of our services may require payment. By subscribing to our services, you agree to pay all fees in accordance with the pricing and payment terms presented to you for the subscription.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Modifications</h2>
            <p className="text-gray-600">
              PuppyPack reserves the right to revise these terms of service at any time without notice. By using our services, you agree to be bound by the current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:support@puppypack.co" className="text-purple-600 hover:text-purple-700">
                support@puppypack.co
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}