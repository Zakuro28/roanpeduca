// Everything the page says, in one place

export const PERSON = {
  name: 'Roan Peduca',
  firstName: 'Roan',
  email: 'roghpeduca@gmail.com',
  linkedin: 'https://www.linkedin.com/in/roghpeduca/',
  intro: 'https://thesecretanna.notion.site/About-Roan-3db2edf218e88005835cec7d401547e5?source=copy_link',
}

export type Sample = {
  name: string
  kind: string
  url: string
  host: string
  image: string
  description: string
}

// Portfolios and case-study write-ups, each opening the real document
export const SAMPLES: Sample[] = [
  {
    name: 'Project Management Case Study',
    kind: 'Case study',
    url: 'https://dour-tarsal-e68.notion.site/Project-Management-Case-Study-1da58abefc75836f97250195cb80a435',
    host: 'notion.site',
    image: '/work/case-pm.jpg',
    description: 'How a multi-workstream program became one task-level roadmap with owners and a timeline.',
  },
  {
    name: 'Executive Assistant Case Study',
    kind: 'Case study',
    url: 'https://dour-tarsal-e68.notion.site/EA-Case-Study-Sample-68858abefc758264ab49813464d9a2c5',
    host: 'notion.site',
    image: '/work/case-ea.jpg',
    description: 'A sample of executive assistant work, written up from problem to result.',
  },
  {
    name: 'Writing Portfolio',
    kind: 'Portfolio',
    url: 'https://drive.google.com/file/d/1y4gLU506j_aple6dr_o19SwkdIrvoba1/view',
    host: 'drive.google.com',
    image: '/work/writing.jpg',
    description: 'Technical writing samples, documentation and creative content.',
  },
  {
    name: 'Design Portfolio',
    kind: 'Portfolio',
    url: 'https://drive.google.com/file/d/126d-zKaaHHZ67iuMUN6pCmjls8KLM3BH/view',
    host: 'drive.google.com',
    image: '/work/design.jpg',
    description: 'Visual design projects and creative work across different formats and platforms.',
  },
  {
    name: 'Teaching Portfolio',
    kind: 'Portfolio',
    url: 'https://drive.google.com/file/d/1MKKAOzybiS4OZ81WloKHsk12KkwsNZ7h/view',
    host: 'drive.google.com',
    image: '/work/teaching.jpg',
    description: 'Educational materials, teaching methods and instructional design.',
  },
]

export type CaseStudy = {
  area: string
  title: string
  problem: string
  built: string
  outcome: string
  sample?: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    area: 'Systems & operations',
    title: 'Building an operations system from scratch',
    problem:
      'An organization’s documentation, SOPs and daily operations were scattered across tools with no central home. New hires, and even leadership, had no single place to find “how we do things here.”',
    built:
      'A complete Notion operating system from the ground up: navigation, a “Start Here” onboarding page, documented SOPs across departments, and a recurring daily briefing template so leadership can track priorities at a glance.',
    outcome:
      'What used to live in scattered docs, chat threads and someone’s memory now lives in one system that is searchable, ready for onboarding, and built to outlast any one person’s knowledge.',
    sample: SAMPLES[1].url,
  },
  {
    area: 'Program management',
    title: 'Mapping tasks into a working roadmap',
    problem:
      'A program with a hard pilot deadline had no shared picture of its scope. Six project areas were moving on their own, with no single view of dependencies, hours or ownership.',
    built:
      'A mapping session covering six project areas and about 85 tasks, then a work plan that broke the top workstreams (a website audit and a demo-page integration) into scoped, estimated units: roughly 40–50 hours of work made visible and put in order.',
    outcome:
      'Leadership went from “we know this is complicated” to a shared, task-level roadmap with clear owners and a realistic timeline, and the hardest workstream was flagged early enough to protect the pilot date.',
    sample: SAMPLES[0].url,
  },
  {
    area: 'Product design',
    title: 'Designing a CRM dashboard mockup',
    problem: 'A colleague needed to see a sales pipeline the way a dedicated CRM would show it, without access to that tool.',
    built: 'A dashboard mockup that recreated a CRM’s pipeline logic, with stages, lead status and flow, using tools the team already had.',
    outcome: 'A non-technical stakeholder got a usable picture of their own pipeline right away, without waiting on procurement or a new tool rollout.',
  },
]

export const VALUES = ['Family', 'Ethical behavior', 'Social responsibility', 'Management mindedness', 'Pursuit of excellence']

export const CAUSES = ['Environment & climate', 'Children’s rights', 'Education access', 'Community development']

export const SKILLS: { area: string; items: string[] }[] = [
  {
    area: 'Executive support',
    items: ['Inbox management', 'Calendar management', 'Travel management', 'Administrative systems', 'Customer relations'],
  },
  {
    area: 'Operations & projects',
    items: ['Project management', 'Data management', 'Research & analysis', 'SOP documentation', 'Notion workspaces'],
  },
  {
    area: 'Writing & content',
    items: ['Technical writing', 'Content creation', 'Instructional design', 'Editing'],
  },
  {
    area: 'People',
    items: ['Leadership', 'Communication', 'Time management', 'Organization', 'Problem solving'],
  },
]

export const EDUCATION = {
  degree: 'BS Family Life and Child Development',
  school: 'University of the Philippines Diliman',
}

export const HONORS: { title: string; detail: string; year?: string }[] = [
  { title: 'University Scholar', detail: 'UP Diliman', year: '1st sem, AY 2021–2022' },
  { title: 'College Scholar', detail: 'UP Diliman', year: '2nd sem AY 2015–2016 and 1st sem AY 2018–2019' },
  { title: 'Trainer of the champion team', detail: 'RAATI First Aid Competition', year: '2018' },
  { title: 'Champion', detail: 'UP Diliman PE Chess Tournament', year: '2016' },
  { title: '7th place, sports writing', detail: 'National Schools Press Conference', year: '2015' },
  { title: 'Mindanao finalist for exemplary leadership', detail: 'Kabayan Ten Outstanding Public School Students (TOPS)' },
  { title: 'Gerry Roxas Leadership Awardee', detail: 'Gerry Roxas Foundation' },
  { title: 'Outstanding officer', detail: 'Kapisanan ng mga Mag-aaral sa Filipino' },
]

export type Group = { area: string; mono: string; roles: { role: string; org: string; year?: string }[] }

// Leadership and extracurricular roles, grouped by kind
export const LEADERSHIP: Group[] = [
  {
    area: 'ROTC',
    mono: 'RC',
    roles: [
      { role: 'Head, Office of Administrative and Personnel', org: 'UP Diliman ROTC', year: '2016–2018' },
      { role: 'Head, Office of Logistics and Finance', org: 'UP Diliman ROTC' },
      { role: 'Deputy, Office of Operations and Training', org: 'UP Diliman ROTC' },
      { role: 'Bravo Company Executive Officer', org: 'UP Diliman ROTC' },
      { role: 'COCC 68-B Tactical Officer and Barracks Commander', org: 'UP Diliman ROTC' },
      { role: 'Logistics and Finance Head', org: 'DASH 2018 Run with Heroes', year: '2018' },
      { role: 'ACLE COIC', org: 'UP Corps of Cadets' },
      { role: 'Movie Block Screening Marketing Head', org: 'UP COC' },
    ],
  },
  {
    area: 'Media & publications',
    mono: 'MP',
    roles: [
      { role: 'Editor-in-Chief, Fish ’n Quips', org: 'UP ICTUS', year: '2020' },
      { role: 'Electoral Board', org: 'UP ICTUS', year: '2020' },
      { role: 'Finance Committee Head', org: 'UP ICTUS', year: '2017' },
      { role: 'Editor-in-Chief', org: 'The Zamboangueñian', year: '2015' },
      { role: 'Sports Writer', org: 'The Zamboangueñian', year: '2014' },
    ],
  },
  {
    area: 'Advocacy & service',
    mono: 'AS',
    roles: [
      { role: 'Creatives Committee Member', org: 'Youth Advocates for Climate Action Philippines', year: '2020' },
      { role: 'Public & Media Relations Co-head', org: 'Tulong Kabataan', year: '2020' },
      { role: 'Webiskwela Programs Committee Head', org: 'Agham Youth UP Diliman', year: '2020' },
      { role: 'Integrations and Outreach Deputy Officer', org: 'Agham Youth UP Diliman', year: '2020' },
    ],
  },
  {
    area: 'Academic',
    mono: 'AC',
    roles: [
      { role: 'Ways and Means Committee Secretary', org: 'UP Mathematics Club', year: '2018' },
      { role: 'Financial Literacy Talk Head', org: 'UP Dormitory', year: '2016' },
    ],
  },
  {
    area: 'Arts & performance',
    mono: 'AP',
    roles: [
      { role: 'Member', org: 'UP Dancesport Society', year: '2017–2023' },
      { role: '2nd place, Latin American discipline', org: 'Lilian’s Cup', year: '2018' },
      { role: 'Vocalist', org: 'Mandopop Band Festival, 2nd season', year: '2019' },
      { role: 'Trainee', org: 'UP Singing Ambassadors', year: '2015' },
      { role: 'Soprano II', org: 'Daniw Study Center, A Night of Music VI', year: '2015' },
    ],
  },
]


export const VOLUNTEER: { title: string; org: string; year?: string; text: string }[] = [
  { title: 'Build project', org: 'Gawad Kalinga UP Diliman', year: '2016', text: 'Helped build homes with and for underprivileged families.' },
  { title: 'NSTP lecturer', org: 'UP Diliman', year: '2018', text: 'Taught students basic life saving and disaster risk reduction and management.' },
  { title: 'Tutorial sessions', org: 'Ugnayan ng Pahinungod Diliman', year: '2019', text: 'Tutored students from marginalized communities.' },
  { title: 'Community disaster preparedness', org: 'Ugnayan ng Pahinungod Diliman', text: 'Helped communities prepare for and respond to disasters.' },
]
