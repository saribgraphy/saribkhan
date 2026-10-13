export type Touchpoint = {
  n: string;
  name: string;
  most: string;
  mine: string;
};

export const xrayLeadIn =
  "Here's what a coaching funnel actually looks like from the lead's side. Tap any step to see what most programs ship and what I'd ship instead.";

export const touchpoints: Touchpoint[] = [
  {
    n: "01",
    name: "Landing page",
    most: "A template with five fonts, stock icons and a button every 300 pixels",
    mine: "One clear story, real proof up top and a page that looks like the price of the offer",
  },
  {
    n: "02",
    name: "Training or VSL page",
    most: "A video dropped into a white page",
    mine: "A page that frames the video, holds attention and sets up the application",
  },
  {
    n: "03",
    name: "Application form",
    most: "A default Typeform with the logo in the corner",
    mine: "A branded form with fewer, sharper questions that qualifies without feeling like an interview",
  },
  {
    n: "04",
    name: "Booking page",
    most: "A raw Calendly embed",
    mine: "A booking step that matches the brand and reminds them why they applied",
  },
  {
    n: "05",
    name: "Confirm your call",
    most: "A grey “you're booked” message",
    mine: "A short page with one job, getting them to confirm and show up",
  },
  {
    n: "06",
    name: "Pre-call prep page",
    most: "Nothing, or a Google Doc",
    mine: "A page the setter sends that warms them up, answers objections and builds trust before the call",
  },
  {
    n: "07",
    name: "Reminders",
    most: "Plain text emails and WhatsApp messages",
    mine: "Written and designed reminders that feel personal and cut no-shows",
  },
  {
    n: "08",
    name: "Offer and call deck",
    most: "Slides made the night before",
    mine: "A clean offer page or deck the closer can screen-share with confidence",
  },
  {
    n: "09",
    name: "Onboarding",
    most: "A welcome email with five links",
    mine: "A guided onboarding flow, so day one feels like they joined something serious",
  },
  {
    n: "10",
    name: "Skool community",
    most: "A default banner and blank classroom covers",
    mine: "A banner, course covers and an about page that feel like a real brand",
  },
  {
    n: "11",
    name: "Wins and reviews page",
    most: "Screenshots pasted into a grid",
    mine: "A proper wall of results people actually want to scroll",
  },
  {
    n: "12",
    name: "Internal tools",
    most: "Spreadsheets and five different apps",
    mine: "Custom dashboards, calculators, quizzes and coach pages built around how your team works",
  },
];

export const xrayOutro =
  "Count how many of these you've actually designed. Most programs I look at have properly designed two or three of them. Fixing the other nine doesn't need a new offer, new ads or more content. It just needs someone who cares about the details.";

export const capabilities = [
  {
    icon: "browsers",
    title: "Landing pages and funnels.",
    body: "Designed and built in Framer or Webflow, fast, responsive and easy for your team to edit.",
  },
  {
    icon: "list",
    title: "Application and onboarding systems.",
    body: "Typeform and custom forms, confirmation pages, pre-call pages and the whole flow in between.",
  },
  {
    icon: "code",
    title: "Custom coded tools.",
    body: "Dashboards, calculators, quizzes, coach booking apps and anything else your team keeps doing in spreadsheets.",
  },
  {
    icon: "palette",
    title: "Brand and identity.",
    body: "Logos, type, colour and a small system so everything you make looks like it came from the same place.",
  },
  {
    icon: "users",
    title: "Community design.",
    body: "Skool banners, course covers, about pages and the small things that make members feel at home.",
  },
  {
    icon: "book",
    title: "Content and products.",
    body: "Playbooks, PDFs, slide decks and lead magnets that look worth paying for.",
  },
  {
    icon: "pen",
    title: "Copy.",
    body: "I write the words too, because a well designed page with weak copy is still a weak page.",
  },
  {
    icon: "sparkle",
    title: "Motion and interaction.",
    body: "Small animations that make things feel finished, never ones that slow you down.",
  },
] as const;
