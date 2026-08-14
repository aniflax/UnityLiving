export const site = {
  name: "Unityaliving",
  tagline: "Where Living Finds Its Meaning",
  sublines: ["Crafted With Quality That Lasts", "Creating Homes For Generations"],
  mission: "Redefining the standard of thoughtful living in Indore, Madhya Pradesh.",
  address: "Unityaliving, Indore, Madhya Pradesh, India",
  email: "unityaliving@gmail.com",
  phoneDisplay: "+91 6232 691 255",
  phoneHref: "tel:+916232691255",
  whatsapp:
    "https://wa.me/916232691255?text=Hi%20Unityaliving%2C%20I%27d%20like%20to%20know%20more",
  hours: "Mon–Sat · 10am–7pm",
  rera: "RERA registered · Indore, Madhya Pradesh",
  mapEmbed:
    "https://www.google.com/maps?q=Indore,+Madhya+Pradesh,+India&hl=en&z=12&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Indore%2C+Madhya+Pradesh%2C+India",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
  ],
} as const;

export const enquiryTypes = [
  "Home Buyer",
  "Broker",
  "Investor",
  "Corporate",
  "NRI Buyer",
] as const;

export function mapEmbedFor(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=13&output=embed`;
}

export function mapLinkFor(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
