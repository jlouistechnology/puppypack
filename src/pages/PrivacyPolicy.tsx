import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Last updated: March 8, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              At PuppyPack, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2.1 Personal Information</h3>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Name and email address</li>
              <li>Profile information about your puppy</li>
              <li>Payment information</li>
              <li>Communications with us</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">2.2 Usage Information</h3>
            <p className="text-gray-600">
              We automatically collect certain information about your device and how you interact with our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Provide and maintain our services</li>
              <li>Personalize your experience</li>
              <li>Process your payments</li>
              <li>Send you updates and marketing communications</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-600">
              We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our platform, processing payments, and analyzing our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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