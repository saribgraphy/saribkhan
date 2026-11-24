/**
 * Copy for /real-estate, the public, video-first page for US real estate
 * agents. The page, its Markdown version (src/lib/markdown.ts), llms.txt and
 * its JSON-LD (src/lib/structured-data.ts) all read from here, so every layer
 * says the same thing.
 */
export const realEstate = {
  path: "/real-estate",
  /** <title> (the site template adds " · Sarib Khan") and the share card. */
  title: "AI Assistant and Voice Agent for Real Estate Agents",
  description:
    "An AI assistant and voice agent for realtors in the US, Canada and Australia that answers calls, texts and leads in seconds and books showings. Live in 7 days.",
  eyebrow: "AI assistant for realtors in the US, Canada and Australia",
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

/**
 * The longer, search-friendly sections of /real-estate: a plain-words
 * definition (what AI answers quote), the voice agent, how it works, the three
 * markets, the comparison and the FAQ. The FAQ also feeds the page's FAQPage
 * JSON-LD and its Markdown version, so keep answers true and self-contained.
 */
export const realEstateMore = {
  definition: {
    label: "In plain words",
    heading: "What is an AI assistant for real estate agents?",
    body: [
      "It's software that answers your leads for you, the moment they arrive. It replies to calls, texts, Instagram and Facebook messages, emails and portal inquiries in your tone, answers questions about your listings, qualifies the buyer or tenant, and books the showing straight into your calendar.",
      "You stay in charge. You approve every answer before it talks to a client, hot leads come to you with their details and a booked time, and anything it can't handle is passed to you.",
    ],
  },
  voice: {
    label: "Voice agent",
    heading: "A voice agent that picks up when you can't.",
    sub: "Calls are the leads agents lose most, because you can't answer while you're showing a home, driving or asleep.",
    points: [
      ["Answers every call", "Day, night and weekends, on the number your clients already have."],
      ["Knows your listings", "Price, beds, baths, availability and showing times, from the listings you give it."],
      ["Qualifies the caller", "Buying or renting, budget, timing, pre-approval and the areas they want."],
      ["Books the showing", "Into your calendar, then confirms by text so fewer people miss it."],
      ["Hands hot leads to you", "A warm transfer to your phone when a caller is ready, or a summary by text when you're busy."],
      ["Logs everything", "Every call, transcript and next step lands in your CRM or inbox."],
    ] as [string, string][],
  },
  steps: {
    label: "How it works",
    heading: "Live in 7 days. You don't lift a finger.",
    items: [
      ["A 15-minute call.", "We learn how you work, your listings and how you like to talk to clients."],
      ["We build it for you.", "Set up on your number, trained on your listings. You approve every answer before it goes live."],
      ["It answers. You show homes.", "Hot leads come to you with their details and a booked time."],
    ] as [string, string][],
  },
  markets: {
    label: "Where it works",
    heading: "Built for agents in the US, Canada and Australia.",
    sub: "Same assistant, set up around the lead sources and messaging rules of your market.",
    items: [
      {
        country: "United States",
        sources: "Zillow, Realtor.com, Homes.com, your website, Facebook, Instagram and your listing signs.",
        rules: "Business texting registered for A2P 10DLC, and marketing messages only to people who agreed to them (TCPA).",
      },
      {
        country: "Canada",
        sources: "REALTOR.ca, Kijiji, Facebook Marketplace, Instagram, WhatsApp and your website.",
        rules: "Replies to inquiries straight away; marketing follow-ups only with consent and an unsubscribe, under CASL.",
      },
      {
        country: "Australia",
        sources: "realestate.com.au, Domain, your website, Facebook and Instagram.",
        rules: "Marketing messages only with consent, identifying you and with an unsubscribe, under the Spam Act 2003.",
      },
    ],
  },
  compare: {
    label: "Compare",
    heading: "An AI assistant, an ISA or an answering service?",
    head: ["", "AI assistant", "Inside sales agent (ISA)", "Answering service"],
    rows: [
      ["Hours", "Every hour, every day", "Their working hours", "Usually 24/7"],
      ["Reply speed", "Seconds", "Minutes to hours", "Takes a message"],
      ["Knows your listings", "Yes, trained on them", "Yes, once trained", "Rarely"],
      ["Books showings in your calendar", "Yes", "Yes", "Rarely"],
      ["Texts, DMs and portal leads", "Yes", "Yes", "Calls only"],
      ["Follows up when buyers go quiet", "Yes, automatically", "When they have time", "No"],
      ["Setup", "Done for you in 7 days", "Hiring and training", "A script"],
    ] as string[][],
  },
  faq: [
    {
      q: "What is an AI assistant for real estate agents?",
      a: "It's software that answers your leads the moment they arrive, by phone, text, Instagram, Facebook, email and portal inquiries. It answers questions about your listings in your tone, qualifies buyers and tenants, books showings into your calendar and sends hot leads to you.",
    },
    {
      q: "What does the AI voice agent do on calls?",
      a: "It answers calls you can't take, day and night, on your current number. It answers questions about the listing, qualifies the caller, books the showing, texts them a confirmation and sends you a summary, or transfers the call to you when the caller is ready.",
    },
    {
      q: "Does it work on my current phone number?",
      a: "Yes. It's set up on the number your clients already have, along with your inbox and Instagram, so nothing changes for your clients.",
    },
    {
      q: "Can I control what it says to clients?",
      a: "Yes. You approve every answer before it talks to a client, and it's trained only on your listings and how you like to talk to clients. Anything it can't handle comes to you.",
    },
    {
      q: "Does it work for agents in Canada and Australia?",
      a: "Yes. It's set up around your market's lead sources, such as REALTOR.ca and Kijiji in Canada or realestate.com.au and Domain in Australia, and follows the local rules for marketing messages: CASL in Canada and the Spam Act 2003 in Australia.",
    },
    {
      q: "Which lead sources does it answer?",
      a: "Phone calls, text messages, Instagram and Facebook messages, your email inbox and website forms, and portal inquiries from sites like Zillow, Realtor.com, REALTOR.ca, realestate.com.au and Domain.",
    },
    {
      q: "How long does setup take?",
      a: "About 7 days after a free 15-minute call. We set everything up for you; you approve the answers before it goes live.",
    },
    {
      q: "Will it replace my assistant or ISA?",
      a: "It takes the first reply, the qualifying questions, the booking and the follow-ups off their plate, at any hour. Many agents keep their people for the conversations that need a human and let the assistant handle the rest.",
    },
    {
      q: "Do I need GoHighLevel or a new CRM?",
      a: "No. We build it around the tools you already use. If you're on GoHighLevel, we build inside your account; if not, we choose what fits how you work.",
    },
    {
      q: "Is there a long contract?",
      a: "No. There's no long contract, and you can cancel any month.",
    },
  ],
};

/** Small print for /real-estate's footer (and its Markdown version). Needed for ads on Meta and the portals it names. */
export const realEstateLegal = [
  "Names, phone numbers, listings, faces and conversations in the demos and the video are samples, not real clients.",
  "Results depend on your lead volume, your market and how you work. We don't promise a number of leads, showings or sales.",
  "This site is not part of Facebook, Instagram or Meta Platforms, Inc., and isn't endorsed by Meta in any way. Facebook and Instagram are trademarks of Meta Platforms, Inc.",
  "Zillow, Realtor.com, Homes.com, REALTOR.ca, Kijiji, realestate.com.au, Domain and GoHighLevel are trademarks of their owners; we're not affiliated with or endorsed by them. REALTOR® is a trademark controlled by the National Association of REALTORS® and the Canadian Real Estate Association.",
];
