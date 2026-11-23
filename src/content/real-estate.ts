/**
 * Copy for /real-estate, the public, video-first page for US real estate
 * agents. The page, its Markdown version (src/lib/markdown.ts), llms.txt and
 * its JSON-LD (src/lib/structured-data.ts) all read from here, so every layer
 * says the same thing.
 */
export const realEstate = {
  path: "/real-estate",
  /** <title> (the site template adds " · Sarib Khan") and the share card. */
  title: "AI assistant for real estate agents",
  description:
    "An AI assistant for real estate agents that answers your calls, texts, DMs and Zillow inquiries in seconds and books showings into your calendar. Set up for you, live in 7 days.",
  eyebrow: "AI assistant for US real estate agents",
  headline: "Every lead gets an answer in seconds.",
  headlineMuted: "Even when you're at a showing.",
  lead: "We set up an AI assistant that answers your calls, texts and emails day and night, and puts serious buyers straight into your calendar. Here's how it works.",
  videoLabel: "Video: a buyer texts at 11:48 PM, gets an answer in seconds and books a showing.",
  small: "15 minutes. No pressure. You'll leave with a clear yes or no.",
  problem: {
    label: "The problem",
    heading: "Most buyers go with the first agent who answers.",
    sub: "They message two or three agents at once. Whoever replies first usually gets the showing.",
  },
  fixHeading: "Your assistant answers every way a client reaches you.",
  fixes: [
    {
      title: "Your phone gets answered, every time.",
      line: "It picks up when you can't, answers questions about the listing, books the showing and texts you a summary.",
    },
    {
      title: "Every text gets a reply in seconds.",
      line: "SMS, Instagram and Facebook messages get a friendly answer in your tone, with photos and times to view.",
    },
    {
      title: "Inquiries stop getting buried.",
      line: "Zillow, Realtor.com and website inquiries get answered, sorted and followed up if the buyer goes quiet.",
    },
    {
      title: "Showings book themselves.",
      line: "Buyers pick a time from your calendar. You just get the confirmation.",
    },
  ],
  story: {
    heading: "Twenty-five years of websites, and this was the best one.",
    quote:
      "We've probably had 10 to 12 websites built over the last 25 years, and by far these guys have been the most professional.",
    who: "Mark Edgley, Director, Premier Homes in Spain",
  },
  offerLabel: "Here's the deal",
  offer: [
    "A free 15-minute call to see if it fits how you work",
    "We set everything up for you, live in 7 days",
    "It works on your current number, inbox and Instagram",
    "You approve every answer before it talks to a client",
    "No long contract. You can cancel any month",
    "Only 2 setups left this month",
  ],
  finalHeading: "Your next buyer is going to message someone tonight.",
  finalLead: "Make sure you're the one who answers.",
  /** The Cal page the booking button opens (also in src/components/agents/booking.tsx). */
  bookingUrl: "https://cal.com/sarib/real-estate-discovery-call",
};

/** Where leads slip away (shared with the /agents pages). */
export const problemsCopy: [title: string, body: string][] = [
  ["Missed calls at showings.", "You can't pick up while you're walking a buyer through a house. The caller rings the next agent."],
  ["Late-night texts.", "A buyer texts at 11 PM. You see it at 8 AM. By then they've booked with someone else."],
  ["Weekend leads go cold.", "Saturday inquiries sit until Monday, and Monday is too late."],
  ["Inquiries buried in email.", "Zillow and website leads land between newsletters and closing documents."],
  ["Booking takes five messages.", "Back and forth about times, and some buyers just give up."],
  ["Paying for leads you never answer.", "Every unanswered lead is ad money you already spent."],
];
