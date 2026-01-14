import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-300 hover:text-white transition-colors mb-4"
          >
            <span className="text-2xl sm:text-3xl">←</span>
            <span>Go back to home</span>
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <p className="text-gray-400 mb-8">Last updated: January 13, 2025</p>

        <div className="space-y-6 text-gray-300">
          <section>
            <p>
              Dodecordle ("we", "our", or "the site") respects your privacy. This Privacy Policy explains how information is collected and used when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Information We Do Not Collect</h2>
            <p>
              We do not require users to create accounts and we do not directly collect personal information such as names, email addresses, or passwords.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Third-Party Services</h2>
            <p className="mb-4">
              We use third-party services that may collect information automatically:
            </p>
            
            <div className="ml-4 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Google AdSense</h3>
                <p>
                  We display advertisements provided by Google AdSense. Google may use cookies and similar technologies to serve ads based on your visits to this and other websites. Users may opt out of personalized advertising by visiting{" "}
                  <a 
                    href="https://www.google.com/settings/ads" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Google's Ads Settings
                  </a>.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Vercel</h3>
                <p>
                  Our website is hosted on Vercel. Vercel may collect basic technical information such as IP addresses, browser type, and request logs for security and performance purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Cookies</h2>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits. You can disable cookies through your browser settings if you prefer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Changes</h2>
            <p>
              This Privacy Policy may be updated from time to time. Any changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, you may contact us at:{" "}
              <a 
                href="mailto:onurgul6@gmail.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                onurgul6@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
