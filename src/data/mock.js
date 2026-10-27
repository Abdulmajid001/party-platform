import { avatar, photo } from "./images";

const ago = (hours) => new Date(Date.now() - hours * 3600 * 1000).toISOString();

// ---------- leaders ----------
export const leaders = [
  { id: "l1", name: "Hon. Adaeze Okafor", title: "State Chairperson", state: "Lagos", avatar: avatar(47), verified: true },
  { id: "l2", name: "Alhaji Musa Bello", title: "Ward Leader", state: "Kano", avatar: avatar(12), verified: true },
  { id: "l3", name: "Chief Tunde Adebayo", title: "Party Secretary", state: "Ogun", avatar: avatar(15), verified: true },
  { id: "l4", name: "Barr. Ngozi Eze", title: "Women Leader", state: "Enugu", avatar: avatar(32), verified: true },
  { id: "l5", name: "Engr. Ibrahim Danladi", title: "Youth Leader", state: "Kaduna", avatar: avatar(33), verified: true },
];

const author = (id) => {
  const l = leaders.find((x) => x.id === id);
  return { id: l.id, name: l.name, title: l.title, avatar: l.avatar, verified: l.verified };
};

// ---------- announcements ----------
export const initialAnnouncements = [
  {
    id: "a1",
    title: "Ward congress holds this Saturday",
    audience: "Ward",
    author: author("l1"),
    createdAt: ago(2),
    image: photo("ann-congress", 1000, 650),
    body:
      "The Ikeja ward congress will hold this Saturday at 10am at the ward secretariat. All registered members are expected to attend.\n\nPlease come with your membership slip or the digital ID on your profile. Doors open at 9am and accreditation closes at 10:30am sharp.\n\nWe will discuss the new ward executive structure, the state of our membership register, and plans for the coming community outreach.",
  },
  {
    id: "a2",
    title: "Voter registration drive: bring a friend",
    audience: "State",
    author: author("l5"),
    createdAt: ago(9),
    image: photo("ann-voter", 1000, 650),
    body:
      "Our youth wing is running a voter registration drive across all local governments in the state this month.\n\nEvery member who brings a friend to register will be recognised at the next state meeting. Volunteers are needed at each registration centre, so please sign up through your ward group.",
  },
  {
    id: "a3",
    title: "New membership cards are ready for collection",
    audience: "National",
    author: author("l3"),
    createdAt: ago(27),
    image: photo("ann-cards", 1000, 650),
    body:
      "The secretariat has finished printing the new membership cards. Members who registered before the end of last quarter can collect theirs from their ward office.\n\nIf you registered online, your digital card is already available on your profile page.",
  },
  {
    id: "a4",
    title: "Women's forum: town hall on market safety",
    audience: "State",
    author: author("l4"),
    createdAt: ago(52),
    image: photo("ann-women", 1000, 650),
    body:
      "The women's wing invites all members and traders to a town hall on market safety and fair levies.\n\nBring your questions and your stories. Notes from the meeting will be shared with the state executive and published here afterwards.",
  },
  {
    id: "a5",
    title: "Quarterly community clean-up: volunteers needed",
    audience: "Ward",
    author: author("l2"),
    createdAt: ago(80),
    image: photo("ann-cleanup", 1000, 650),
    body:
      "We are organising a clean-up of drainage channels and public spaces before the rains. Gloves and bags will be provided.\n\nMeet at the ward junction at 7am. Each street group should send at least five volunteers.",
  },
  {
    id: "a6",
    title: "Reminder: dues portal closes on the 30th",
    audience: "National",
    author: author("l3"),
    createdAt: ago(120),
    image: photo("ann-dues", 1000, 650),
    body:
      "Members in good standing are reminded to complete their annual dues before the portal closes on the 30th.\n\nOnly members in good standing can vote at party congresses. Contact your ward treasurer if you have any payment issues.",
  },
];

// ---------- conversations ----------
export const initialConversations = [
  { id: "c1", type: "direct", name: leaders[0].name, subtitle: "State Chairperson, Lagos", avatar: leaders[0].avatar, verified: true, leaderId: "l1", unread: 1 },
  { id: "c3", type: "group", name: "Ikeja Ward Members", subtitle: "248 members", avatar: photo("grp-ikeja", 200, 200), verified: false, unread: 4, memberNames: ["Mrs. Bolanle A.", "Kunle F.", "Chinedu O.", "Zainab M."] },
  { id: "c2", type: "direct", name: leaders[2].name, subtitle: "Party Secretary, Ogun", avatar: leaders[2].avatar, verified: true, leaderId: "l3", unread: 0 },
  { id: "c4", type: "group", name: "Lagos Youth Wing", subtitle: "1,120 members", avatar: photo("grp-youth", 200, 200), verified: false, unread: 0, memberNames: ["Dami T.", "Seyi K.", "Amaka N."] },
  { id: "c5", type: "direct", name: leaders[4].name, subtitle: "Youth Leader, Kaduna", avatar: leaders[4].avatar, verified: true, leaderId: "l5", unread: 0 },
];

const m = (id, senderId, senderName, text, hoursAgo) => ({
  id,
  senderId,
  senderName,
  text,
  createdAt: ago(hoursAgo),
});

export const initialMessages = {
  c1: [
    m("m1", "me", "You", "Good morning Hon. When is the ward congress holding, please?", 5),
    m("m2", "l1", leaders[0].name, "Good morning. Saturday, 10am at the Ikeja ward secretariat. Please come with your membership slip.", 4.8),
    m("m3", "me", "You", "Noted, thank you. I will mobilise a few youths from my street.", 4.5),
    m("m4", "l1", leaders[0].name, "That is great. Send me their names before Friday so we can speed up accreditation.", 2),
  ],
  c2: [
    m("m5", "l3", leaders[2].name, "Your membership details have been updated on the register.", 30),
    m("m6", "me", "You", "Thank you, Chief.", 29),
  ],
  c3: [
    m("m7", "p1", "Mrs. Bolanle A.", "Good evening everyone. Please remember the clean-up this weekend.", 7),
    m("m8", "p2", "Kunle F.", "I can bring ten bags and gloves.", 6.5),
    m("m9", "p3", "Chinedu O.", "Which junction are we meeting at?", 6),
    m("m10", "p1", "Mrs. Bolanle A.", "The ward junction, 7am sharp.", 5.8),
    m("m11", "p4", "Zainab M.", "I will come with my street group.", 5.5),
  ],
  c4: [
    m("m12", "p5", "Dami T.", "Voter registration volunteers, please drop your names here.", 22),
    m("m13", "me", "You", "Count me in for Ikeja.", 21),
  ],
  c5: [
    m("m14", "l5", leaders[4].name, "Welcome to the youth wing channel. Reach out any time.", 70),
  ],
};

export const groupReplies = [
  "Noted, thanks for the update.",
  "Please can someone share the venue details again?",
  "I will be there.",
  "Great, let us keep the group updated.",
];

export const leaderReplies = [
  "Thank you for reaching out. I will look into it and get back to you.",
  "Noted. Please send me the details and I will follow up.",
  "Good to hear from you. Let us talk more at the next meeting.",
];

// ---------- admin ----------
export const initialQueue = [
  { id: "v1", name: "Chike Nwosu", title: "Ward Chairman", state: "Anambra", avatar: avatar(52), submitted: ago(6) },
  { id: "v2", name: "Hajiya Fatima Sani", title: "Women Leader", state: "Kano", avatar: avatar(44), submitted: ago(20) },
  { id: "v3", name: "Segun Ajayi", title: "Youth Coordinator", state: "Oyo", avatar: avatar(8), submitted: ago(31) },
  { id: "v4", name: "Grace Ekpo", title: "Local Government Secretary", state: "Cross River", avatar: avatar(26), submitted: ago(48) },
];

export const initialReports = [
  { id: "r1", type: "Message", target: "Lagos Youth Wing", reason: "Abusive language directed at another member", reportedBy: "Kemi A.", createdAt: ago(3) },
  { id: "r2", type: "Profile", target: "Profile: \"Hon. Dele (Official)\"", reason: "Claims to be a leader but is not verified", reportedBy: "Ibrahim S.", createdAt: ago(14) },
  { id: "r3", type: "Announcement", target: "\"Free registration, send your BVN\"", reason: "Possible scam asking for personal details", reportedBy: "Ngozi E.", createdAt: ago(40) },
];
