'use client';

import { useEffect } from 'react';

/**
 * SideRailAds component for desktop fixed side rail ads
 * - Shows on screens 1024px and wider
 * - Fixed left and right side rails (400px wide each)
 * - Uses AdSense Display ad units
 */
export default function SideRailAds() {
  useEffect(() => {
    // Initialize AdSense ads after component mounts (SPA-safe)
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      console.log('SideRailAds: AdSense ads initialized');
    } catch (err) {
      console.error('AdSense initialization error:', err);
    }
  }, []);

  return (
    <>
      {/* Right Side Rail Ad - Active slot - Full height vertical ad */}
      <aside className="hidden ad-rail:block fixed right-0 top-0 w-[400px] h-screen pointer-events-none z-0">
        <div className="ad-container absolute top-0 right-0 w-[400px] h-screen pointer-events-auto">
          <ins
            className="adsbygoogle side-rail-ad"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3792047273691395"
            data-ad-slot="6289116646"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </aside>

      {/* Left Side Rail Ad - Active slot - Full height vertical ad */}
      <aside className="hidden ad-rail:block fixed left-0 top-0 w-[400px] h-screen pointer-events-none z-0">
        <div className="ad-container absolute top-0 left-0 w-[400px] h-screen pointer-events-auto">
          <ins
            className="adsbygoogle side-rail-ad"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3792047273691395"
            data-ad-slot="5084873857"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </aside>
    </>
  );
}
