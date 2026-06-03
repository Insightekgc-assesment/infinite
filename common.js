// Shared helpers/data for the static article pages

const founderProfiles = [
  { name: 'Ava Clarke', role: 'Founder & CEO', company: 'Helio Ventures', category: 'Founder Interview' },
  { name: 'Noah Reed', role: 'Co-founder & Chief Product Officer', company: 'Nexera', category: 'Startup Journey' },
  { name: 'Maya Reeves', role: 'Founder & Managing Partner', company: 'Lumen Labs', category: 'Leadership Profile' },
  { name: 'Ezra Chen', role: 'Founder & Head of Growth', company: 'Pulse Forge', category: 'Founder Journey' },
  { name: 'Sofia Lane', role: 'Founder & COO', company: 'Atlas Collective', category: 'Founder Interview' },
  { name: 'Miles Everett', role: 'Founder & Creative Director', company: 'Verve Studio', category: 'Leadership Profile' },
  { name: 'Aria Chen', role: 'Founder & CEO', company: 'Rift Labs', category: 'Startup Journey' },
  { name: 'Noah Kline', role: 'Founder & CTO', company: 'Nimbus AI', category: 'Founder Interview' },
  { name: 'Lena Brooks', role: 'Founder & Chief Strategy Officer', company: 'Horizon Loop', category: 'Founder Journey' },
  { name: 'Oliver Dale', role: 'Founder & Head of Operations', company: 'Seedwell', category: 'Leadership Profile' }
];

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

