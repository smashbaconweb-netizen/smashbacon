// Single source of truth for the site's public URL and business facts.
// Set NEXT_PUBLIC_SITE_URL at deploy (e.g. https://smashbacon.com).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://smashbaconhamburgers.com";

export const BUSINESS = {
  name: "Smash Bacon",
  phone: "+1-619-210-5231", // pending owner confirmation vs (619) 480-6436
  street: "41 E 8th St #114",
  city: "National City",
  region: "CA",
  zip: "91950",
  // Market on 8th, 41 E 8th St — approximate; verify against GBP pin
  lat: 32.6781,
  lng: -117.0992,
  yelp: "https://www.yelp.com/biz/smash-bacon-national-city",
};
