// =============================================
// AFFILIATE LINK CONFIGURATION
// Fill in your campaign IDs after registering
// with each affiliate program
// =============================================

const AFFILIATE_IDS = {
  // eBay AU Partner Network → https://partnernetwork.ebay.com.au
  // Campaign ID from your dashboard
  ebay_au_campaign: process.env.NEXT_PUBLIC_EBAY_AU_CAMPAIGN_ID || "",

  // Gumtree has no formal affiliate program currently
  gumtree: null,
};

// Appends eBay AU affiliate tracking params to a search URL
export function ebayAffiliateUrl(baseUrl) {
  const id = AFFILIATE_IDS.ebay_au_campaign;
  if (!id) return baseUrl;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}mkcid=1&mkrid=705-53470-19255-0&siteid=15&campid=${id}&toolid=10001`;
}

// Returns a store URL with affiliate tracking where available
export function withAffiliate(store, url) {
  if (store === "ebay_au") return ebayAffiliateUrl(url);
  return url;
}
