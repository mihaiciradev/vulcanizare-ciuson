import Script from "next/script";
import { GOOGLE_ADS_ENABLED, GOOGLE_ADS_ID } from "@/lib/ads";

/**
 * The Google tag (gtag.js) for Google Ads, loaded once from the root layout.
 * Renders nothing while GOOGLE_ADS_ENABLED is false.
 *
 * Consent Mode defaults to "denied" for advertising and analytics storage, because the site has
 * no consent banner yet. A consent banner should call gtag('consent', 'update', {...}) on accept.
 */
export default function GoogleAdsTag() {
  if (!GOOGLE_ADS_ENABLED) return null;

  return (
    <>
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
      <Script
        id="google-ads-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
