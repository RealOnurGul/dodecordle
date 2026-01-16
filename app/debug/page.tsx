'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Debug page to test AdSense Auto Ads placement
 * This page has no overflow restrictions and plenty of text content
 * for AdSense to detect placement opportunities.
 */
export default function DebugPage() {
  const [overlayDisabled, setOverlayDisabled] = useState(true);

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

        <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
          <h1 className="text-2xl font-bold mb-2 text-yellow-400">AdSense Debug Mode</h1>
          <p className="text-sm text-gray-300">
            This page is optimized for AdSense Auto Ads testing. All overflow restrictions are disabled, 
            and content sections are expanded for better ad placement detection.
          </p>
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={overlayDisabled}
              onChange={(e) => setOverlayDisabled(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Disable overlay restrictions (currently {overlayDisabled ? 'ON' : 'OFF'})</span>
          </label>
        </div>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Sample Content Section 1</h2>
          <p className="mb-3 text-gray-300">
            This is the first content section designed to help AdSense Auto Ads detect placement opportunities. 
            AdSense needs real text content blocks in the normal document flow to identify where ads can be inserted.
          </p>
          <p className="mb-3 text-gray-300">
            By ensuring that HTML and body elements use overflow-y: auto instead of overflow: hidden, 
            we allow AdSense to properly scan the entire document structure. Fixed positioning should 
            only be used for small navigation elements, not the main content container.
          </p>
          <p className="text-gray-300">
            The goal is to have multiple natural breaks in the content where ads can be placed without 
            disrupting the user experience. Each paragraph and section provides potential placement locations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Sample Content Section 2</h2>
          <p className="mb-3 text-gray-300">
            This second section continues the content flow and provides another breakpoint where AdSense 
            might identify an ad placement opportunity. Having multiple sections with substantial text 
            content helps AdSense better understand the page structure.
          </p>
          <p className="mb-3 text-gray-300">
            It's important that all content sections are visible in the DOM and not hidden with display:none 
            or similar CSS properties. AdSense needs to be able to access and analyze the actual rendered 
            content structure.
          </p>
          <p className="text-gray-300">
            The content should be meaningful and substantial - not just placeholder text. Real, engaging 
            content not only helps with ad placement but also improves the overall user experience and SEO.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Sample Content Section 3</h2>
          <p className="mb-3 text-gray-300">
            Here's a third content section to provide even more opportunities for AdSense to detect placement 
            locations. The more natural content breaks you have, the better AdSense can understand where ads 
            would fit naturally into the page flow.
          </p>
          <p className="mb-3 text-gray-300">
            Remember that height:100vh or max-height:100vh locks can prevent scrolling and hide content from 
            AdSense. Using min-height:100vh instead allows content to expand naturally while still providing 
            a minimum full viewport height when content is minimal.
          </p>
          <p className="text-gray-300">
            Position:fixed and position:absolute should be reserved for navigation bars, modals, and other 
            UI elements that float above the main content. The main content container should remain in normal 
            document flow to ensure AdSense can properly analyze the page structure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Technical Details</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-white">HTML/Body CSS:</strong> Set to overflow-y: auto to allow scrolling 
              and ensure AdSense can access all content.
            </p>
            <p>
              <strong className="text-white">Main Containers:</strong> Use min-height:100vh instead of height:100vh 
              to allow content expansion while maintaining minimum viewport height.
            </p>
            <p>
              <strong className="text-white">Fixed Elements:</strong> Only use position:fixed for small nav elements 
              (like the virtual keyboard), not for the main content wrapper.
            </p>
            <p>
              <strong className="text-white">Z-Index Layers:</strong> Avoid large overlays that cover the entire 
              document flow. Modals and overlays should only appear when needed and not block AdSense scanning.
            </p>
            <p>
              <strong className="text-white">Content Structure:</strong> Ensure main content uses semantic HTML 
              like &lt;main&gt; and &lt;section&gt; tags with plenty of text content in normal document flow.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Testing Checklist</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Verify AdSense script loads in the document head or early in body</li>
            <li>Confirm html and body elements have overflow-y: auto</li>
            <li>Check that main content is not fixed or absolutely positioned</li>
            <li>Ensure content sections are visible (not display:none)</li>
            <li>Verify multiple text blocks exist in normal document flow</li>
            <li>Test that scrolling works properly on all devices</li>
            <li>Confirm no large z-index overlays block document flow by default</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="text-xl font-bold mb-2">Next Steps</h3>
          <p className="text-gray-300 mb-2">
            After making these changes, re-run the Google AdSense Auto Ads preview. You should now see 
            placement markers indicating where ads can be inserted.
          </p>
          <p className="text-gray-300">
            If placements still don't appear, check the browser console for any AdSense errors and ensure 
            the AdSense account is properly configured in the AdSense dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
