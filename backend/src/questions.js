// Initial transparent starter question bank. Expand to 25+ questions per pathway
// before public launch. Each option maps to candidate scores in a maintainable format.
export const pathways = {
  creator: {
    title: 'Content Creator',
    candidates: [
      ['ai_tech','AI & Tech Tutorials'], ['business','Business & Entrepreneurship'],
      ['education','English Learning & Education'], ['travel','Travel & Budget Guides'],
      ['beauty','Beauty & Fashion'], ['gaming','Gaming & Walkthroughs'],
      ['comedy','Comedy & Entertainment'], ['finance','Personal Finance Education'],
      ['books','Books & Literary Analysis'], ['science','Science Explained'],
      ['marketing','Digital Marketing & SEO'], ['home','Home Improvement & Gardening'],
      ['truecrime','True Crime & Mysteries'], ['wellness','Health & Fitness'],
      ['software','B2B & SaaS Reviews'], ['luxury','Luxury & Real Estate'],
      ['legal','Legal & Tax Education'], ['automotive','Automotive'], ['asmr','ASMR & Sleep'],
      ['drama','Drama & Webtoon Recaps']
    ],
    questions: [
      {id:'c1',text:'Which topics do you naturally spend time learning about?',hint:'Choose the closest fit; your answer is a signal, not a permanent label.',options:[
        {id:'tech',label:'Technology, AI, and software',scores:{ai_tech:3,software:2}},
        {id:'business',label:'Business, money, and building things',scores:{business:3,finance:2,marketing:1}},
        {id:'stories',label:'Stories, mysteries, and culture',scores:{truecrime:2,books:2,drama:2}},
        {id:'lifestyle',label:'Lifestyle, beauty, travel, and home',scores:{beauty:2,travel:2,home:2,luxury:1}},
        {id:'play',label:'Games, humor, and entertainment',scores:{gaming:3,comedy:3,asmr:1}},
        {id:'learning',label:'Science, health, or teaching',scores:{science:2,wellness:2,education:2,legal:1}}
      ]},
      {id:'c2',text:'Which format could you realistically make every week?',options:[
        {id:'talking',label:'Talking to camera',scores:{business:1,education:2,wellness:1,beauty:2}},
        {id:'screen',label:'Screen recording or tutorial',scores:{ai_tech:3,software:3,marketing:2,education:2}},
        {id:'voice',label:'Voice-over with visuals',scores:{travel:2,science:2,truecrime:2,books:2,finance:1}},
        {id:'short',label:'Short skits or quick entertainment',scores:{comedy:3,drama:2,gaming:1}},
        {id:'ambient',label:'Relaxing or ambient audio/video',scores:{asmr:3,home:1}}
      ]},
      {id:'c3',text:'How comfortable are you appearing on camera?',options:[
        {id:'yes',label:'Comfortable',scores:{beauty:1,business:1,education:1}},
        {id:'sometimes',label:'Sometimes, depending on the topic',scores:{travel:1,wellness:1,marketing:1}},
        {id:'no',label:'I prefer faceless content',scores:{ai_tech:1,software:1,truecrime:1,science:1,books:1,asmr:1}}
      ]},
      {id:'c4',text:'What is your strongest starting advantage?',options:[
        {id:'knowledge',label:'I already know a topic well',scores:{education:2,ai_tech:1,business:1,finance:1}},
        {id:'editing',label:'I can edit and package videos',scores:{comedy:1,travel:1,drama:1,gaming:1}},
        {id:'research',label:'I enjoy researching and explaining',scores:{science:2,truecrime:2,finance:1,legal:1,books:1}},
        {id:'personality',label:'I enjoy performing or entertaining',scores:{comedy:2,beauty:1,gaming:1}},
        {id:'beginner',label:'I am starting from scratch',scores:{}}
      ]},
      {id:'c5',text:'How much time can you protect for creating each week?',options:[
        {id:'low',label:'1–3 hours',scores:{asmr:1,short:1}},
        {id:'medium',label:'4–7 hours',scores:{ai_tech:1,education:1,comedy:1}},
        {id:'high',label:'8–15 hours',scores:{truecrime:1,science:1,travel:1}},
        {id:'full',label:'More than 15 hours',scores:{business:1,software:1,beauty:1}}
      ]},
      {id:'c6',text:'Which audience would you most enjoy helping or entertaining?',options:[
        {id:'beginners',label:'Beginners learning useful skills',scores:{ai_tech:2,education:2,marketing:1}},
        {id:'professionals',label:'Professionals and business owners',scores:{software:3,business:2,finance:1}},
        {id:'fans',label:'Fans of stories, games, and pop culture',scores:{gaming:2,drama:2,truecrime:1,books:1}},
        {id:'everyday',label:'People improving everyday life',scores:{home:2,wellness:2,travel:1,beauty:1}},
        {id:'broad',label:'A broad entertainment audience',scores:{comedy:2,asmr:1}}
      ]},
      {id:'c7',text:'Which kind of work feels most satisfying?',options:[
        {id:'teach',label:'Breaking complex ideas into simple steps',scores:{ai_tech:2,science:2,education:2,finance:1}},
        {id:'review',label:'Comparing products, tools, or options',scores:{software:2,automotive:2,beauty:1}},
        {id:'story',label:'Researching and telling compelling stories',scores:{truecrime:2,books:2,travel:1,drama:1}},
        {id:'create',label:'Making something visually beautiful',scores:{beauty:2,home:2,luxury:1}},
        {id:'perform',label:'Making people laugh or feel something',scores:{comedy:2,gaming:1,asmr:1}}
      ]},
      {id:'c8',text:'What is your main goal for the next six months?',options:[
        {id:'skill',label:'Build a valuable skill and a portfolio',scores:{ai_tech:1,education:1,marketing:1}},
        {id:'audience',label:'Build a loyal audience',scores:{comedy:1,travel:1,books:1}},
        {id:'income',label:'Explore realistic income opportunities',scores:{software:1,business:1,finance:1,marketing:1}},
        {id:'creative',label:'Express creativity consistently',scores:{beauty:1,home:1,asmr:1,drama:1}}
      ]},
      {id:'c9',text:'How do you feel about checking sources and correcting mistakes?',options:[
        {id:'love',label:'I enjoy careful research',scores:{finance:2,legal:2,science:2,truecrime:1}},
        {id:'okay',label:'I can do it with a checklist',scores:{ai_tech:1,education:1,business:1}},
        {id:'avoid',label:'I prefer lighter, less research-heavy formats',scores:{comedy:2,gaming:1,asmr:1,beauty:1}}
      ]},
      {id:'c10',text:'What production setup do you have now?',options:[
        {id:'phone',label:'Mostly a phone',scores:{travel:1,beauty:1,comedy:1}},
        {id:'computer',label:'A computer suitable for editing or tutorials',scores:{ai_tech:1,software:1,gaming:1}},
        {id:'basic',label:'Basic setup; I need low-cost formats',scores:{voice:1,books:1,education:1}},
        {id:'studio',label:'Good camera, audio, or studio access',scores:{beauty:1,business:1,wellness:1}}
      ]},
      {id:'c11',text:'Which growth approach sounds most sustainable to you?',options:[
        {id:'search',label:'Helpful videos people search for over time',scores:{ai_tech:2,education:2,home:1,finance:1}},
        {id:'community',label:'A community that returns for my personality',scores:{comedy:2,gaming:2,beauty:1}},
        {id:'trend',label:'Responding to trends and current stories',scores:{truecrime:1,drama:2,automotive:1}},
        {id:'evergreen',label:'Evergreen explainers and reference content',scores:{science:2,books:1,marketing:1}}
      ]},
      {id:'c12',text:'Are you willing to learn a niche deeply before giving advice?',options:[
        {id:'yes',label:'Yes, I want to build real expertise',scores:{finance:2,legal:2,wellness:2,science:1}},
        {id:'some',label:'I prefer documenting my learning journey',scores:{ai_tech:2,education:1,business:1}},
        {id:'no',label:'I want to focus on entertainment or curation',scores:{comedy:2,gaming:1,drama:1,asmr:1}}
      ]},
      {id:'c13',text:'How do you feel about competition in a topic?',options:[
        {id:'compete',label:'I can stand out with a specific angle',scores:{software:1,beauty:1,finance:1}},
        {id:'underserved',label:'I would rather serve a specific overlooked audience',scores:{education:2,travel:1,science:1}},
        {id:'experiment',label:'I want to test several angles first',scores:{}}
      ]},
      {id:'c14',text:'Which language or audience are you most likely to serve first?',options:[
        {id:'local',label:'A local or regional-language audience',scores:{education:1,travel:1,business:1}},
        {id:'global',label:'An international English-speaking audience',scores:{ai_tech:1,software:1,science:1}},
        {id:'both',label:'A mix of local and international viewers',scores:{travel:1,education:1,comedy:1}}
      ]},
      {id:'c15',text:'Which statement best describes your comfort with sensitive topics?',options:[
        {id:'careful',label:'I can be careful, accurate, and transparent',scores:{finance:1,legal:1,wellness:1}},
        {id:'neutral',label:'I prefer practical, lower-risk topics',scores:{ai_tech:1,home:1,education:1}},
        {id:'entertainment',label:'I prefer entertainment rather than advice',scores:{comedy:1,gaming:1,drama:1}}
      ]},
    ]
  },
  freelancer: {
    title: 'Freelancer',
    candidates: [
      ['graphic','Graphic Design & Brand Identity'], ['uiux','UI/UX & Product Design'],
      ['video','Video Editing'], ['motion','Motion Graphics'], ['web','Web Development'],
      ['writing','Scriptwriting & Content Writing'], ['social','Social Media Management'],
      ['marketing','Digital Marketing & SEO'], ['automation','Workflow Automation'], ['decks','Presentation & Pitch Deck Design']
    ],
    questions: [
      {id:'f1',text:'Which activity would you most enjoy practicing for several months?',options:[
        {id:'visual',label:'Creating visual identities, layouts, and graphics',scores:{graphic:3,decks:1}},
        {id:'product',label:'Making apps and websites easier to use',scores:{uiux:3,web:1}},
        {id:'video',label:'Turning raw footage into engaging videos',scores:{video:3,motion:1}},
        {id:'code',label:'Building websites and useful digital tools',scores:{web:3,automation:2}},
        {id:'words',label:'Writing scripts, posts, and clear messages',scores:{writing:3,social:1}},
        {id:'growth',label:'Helping businesses reach customers',scores:{marketing:3,social:2}}
      ]},
      {id:'f2',text:'Which output would you be proud to show a client?',options:[
        {id:'brand',label:'A logo system and brand kit',scores:{graphic:3}},
        {id:'prototype',label:'A clickable app or website prototype',scores:{uiux:3}},
        {id:'cut',label:'A polished short or long-form video',scores:{video:3,motion:1}},
        {id:'animation',label:'An animated title or product explainer',scores:{motion:3}},
        {id:'site',label:'A working responsive website',scores:{web:3}},
        {id:'copy',label:'A compelling script or campaign plan',scores:{writing:2,marketing:2,social:1}}
      ]},
      {id:'f3',text:'How do you feel about learning technical tools?',options:[
        {id:'love',label:'I enjoy technical problem-solving',scores:{web:2,automation:2,uiux:1}},
        {id:'some',label:'I can learn tools when needed',scores:{video:1,motion:1,marketing:1}},
        {id:'visual',label:'I prefer visual and creative tools',scores:{graphic:2,video:1,motion:1}},
        {id:'words',label:'I prefer research, writing, and communication',scores:{writing:2,social:1,marketing:1}}
      ]},
      {id:'f4',text:'What equipment or access do you currently have?',options:[
        {id:'phone',label:'Mostly a phone',scores:{social:2,writing:1}},
        {id:'basicpc',label:'A basic computer',scores:{graphic:1,writing:1,uiux:1,web:1}},
        {id:'strongpc',label:'A computer that handles demanding creative work',scores:{video:2,motion:2,web:1}},
        {id:'flexible',label:'I can access different devices or labs',scores:{web:1,video:1,uiux:1}}
      ]},
      {id:'f5',text:'How do you prefer to work with clients?',options:[
        {id:'visualbrief',label:'Receive a brief and deliver a visual result',scores:{graphic:2,video:1,motion:1,decks:1}},
        {id:'collab',label:'Discuss needs and iterate together',scores:{uiux:2,web:1,social:1}},
        {id:'independent',label:'Work independently with clear requirements',scores:{web:1,writing:1,automation:1}},
        {id:'ongoing',label:'Build a long-term ongoing relationship',scores:{social:2,marketing:2}}
      ]},
      {id:'f6',text:'Which skill do you already have the strongest base in?',options:[
        {id:'design',label:'Drawing, layout, color, or design',scores:{graphic:2,uiux:1,decks:1}},
        {id:'editing',label:'Editing clips, audio, or animation',scores:{video:2,motion:1}},
        {id:'code',label:'HTML, CSS, JavaScript, or logic',scores:{web:2,automation:1}},
        {id:'writing',label:'Writing, research, or storytelling',scores:{writing:2,marketing:1}},
        {id:'people',label:'Communication, organization, or promotion',scores:{social:2,marketing:2}},
        {id:'new',label:'I am new and ready to practice',scores:{}}
      ]},
      {id:'f7',text:'What type of deliverable sounds most motivating?',options:[
        {id:'quick',label:'Small deliverables I can finish quickly',scores:{graphic:1,social:1,writing:1}},
        {id:'deep',label:'Complex projects that take focused time',scores:{web:2,uiux:1,motion:1}},
        {id:'monthly',label:'Monthly content or marketing packages',scores:{social:2,marketing:2,video:1}},
        {id:'systems',label:'Automations that save clients time',scores:{automation:3,web:1}}
      ]},
      {id:'f8',text:'How soon do you hope to seek your first paid project?',options:[
        {id:'soon',label:'Within 1–2 months',scores:{graphic:1,video:1,writing:1,social:1}},
        {id:'quarter',label:'Within 3–6 months after building samples',scores:{uiux:1,web:1,motion:1,marketing:1}},
        {id:'long',label:'I can spend longer building solid skills',scores:{web:1,automation:1,uiux:1}}
      ]},
      {id:'f9',text:'How comfortable are you explaining your work to clients?',options:[
        {id:'high',label:'Comfortable discussing and presenting',scores:{uiux:1,marketing:1,social:1}},
        {id:'medium',label:'I can improve with practice',scores:{graphic:1,video:1,web:1}},
        {id:'low',label:'I prefer clear written briefs',scores:{web:1,writing:1,automation:1}}
      ]},
      {id:'f10',text:'Which learning process suits you best?',options:[
        {id:'visual',label:'Copy a reference, then create my own version',scores:{graphic:1,video:1,motion:1}},
        {id:'project',label:'Build real projects from start to finish',scores:{web:2,uiux:1,automation:1}},
        {id:'reading',label:'Read, research, and write',scores:{writing:2,marketing:1}},
        {id:'feedback',label:'Get feedback and improve repeatedly',scores:{uiux:1,social:1,graphic:1}}
      ]},
      {id:'f11',text:'Which client problem would you like to solve?',options:[
        {id:'look',label:'A business needs to look professional',scores:{graphic:3,decks:1}},
        {id:'usability',label:'Customers struggle to use a digital product',scores:{uiux:3,web:1}},
        {id:'content',label:'A brand needs consistent video content',scores:{video:3,motion:1,social:1}},
        {id:'online',label:'A business needs a website or digital workflow',scores:{web:2,automation:2}},
        {id:'sales',label:'A business needs clearer messaging and more reach',scores:{writing:1,marketing:3,social:2}}
      ]},
      {id:'f12',text:'How do you feel about revisions and detailed feedback?',options:[
        {id:'welcome',label:'I like refining work until it is right',scores:{uiux:2,graphic:1,writing:1}},
        {id:'okay',label:'Fine with clear scope and limits',scores:{video:1,web:1,decks:1}},
        {id:'prefer',label:'I prefer repeatable tasks with clear rules',scores:{automation:2,social:1}}
      ]},
      {id:'f13',text:'What is your realistic weekly learning time?',options:[
        {id:'few',label:'1–3 hours',scores:{writing:1,social:1,graphic:1}},
        {id:'some',label:'4–8 hours',scores:{video:1,uiux:1,marketing:1}},
        {id:'many',label:'9+ hours',scores:{web:1,motion:1,automation:1}}
      ]},
      {id:'f14',text:'Would you enjoy documenting your process in a portfolio?',options:[
        {id:'yes',label:'Yes, I can show before-and-after or case studies',scores:{graphic:1,uiux:2,web:1,video:1}},
        {id:'maybe',label:'I can do it with a template',scores:{motion:1,writing:1,decks:1}},
        {id:'notyet',label:'I need guidance to create samples',scores:{}}
      ]},
      {id:'f15',text:'What matters most in your first freelance direction?',options:[
        {id:'creative',label:'Creative expression',scores:{graphic:2,video:1,motion:2}},
        {id:'technical',label:'Technical depth and problem-solving',scores:{web:2,automation:2,uiux:1}},
        {id:'communication',label:'Communication and storytelling',scores:{writing:2,social:1,marketing:1}},
        {id:'business',label:'Helping businesses grow',scores:{marketing:2,social:2,decks:1}}
      ]}
    ]
  }
};


// Additional questions bring both pathways to 25 questions.
pathways.creator.questions.push(
  {id:'c16',text:'What would help you keep publishing when a video gets few views?',options:[{id:'learning',label:'Learn whether the topic or packaging needs work',scores:{ai_tech:1,marketing:1,education:1}},{id:'community',label:'Enjoy community and conversations',scores:{comedy:1,gaming:1,beauty:1}},{id:'process',label:'Follow a repeatable production routine',scores:{software:1,asmr:1,books:1}}]},
  {id:'c17',text:'Which research or production task sounds easiest to repeat?',options:[{id:'demo',label:'Demonstrating a tool or process',scores:{ai_tech:2,software:2,education:1}},{id:'compare',label:'Comparing options with clear criteria',scores:{automotive:2,software:1,beauty:1}},{id:'story',label:'Building a story from sources',scores:{truecrime:2,science:1,books:1}},{id:'experience',label:'Recording a real-world experience',scores:{travel:2,home:1}}]},
  {id:'c18',text:'How comfortable are you with speaking and recording audio?',options:[{id:'comfortable',label:'Comfortable recording my voice',scores:{education:1,truecrime:1,science:1}},{id:'practice',label:'I can improve with practice',scores:{ai_tech:1,travel:1,business:1}},{id:'minimal',label:'I prefer text, captions, or ambient sound',scores:{asmr:2,home:1,books:1}}]},
  {id:'c19',text:'Would you rather cover one focused topic or several related topics?',options:[{id:'focused',label:'One focused topic for a specific audience',scores:{software:2,finance:1,ai_tech:1}},{id:'cluster',label:'A few related topics under one theme',scores:{business:1,education:1,marketing:1}},{id:'variety',label:'Variety, as long as the format stays consistent',scores:{comedy:1,travel:1,gaming:1}}]},
  {id:'c20',text:'How would you like to build trust with viewers?',options:[{id:'proof',label:'Show demonstrations, sources, or evidence',scores:{ai_tech:2,science:2,finance:1}},{id:'experience',label:'Share my experience and lessons learned',scores:{travel:1,business:1,beauty:1}},{id:'entertain',label:'Deliver a distinctive entertaining experience',scores:{comedy:2,gaming:1,drama:1}}]},
  {id:'c21',text:'Which kind of viewer feedback would be most useful?',options:[{id:'questions',label:'Questions about how to do something',scores:{education:2,ai_tech:1,home:1}},{id:'opinions',label:'People sharing opinions and stories',scores:{comedy:1,books:1,travel:1}},{id:'requests',label:'Requests for comparisons or recommendations',scores:{software:2,automotive:1,beauty:1}}]},
  {id:'c22',text:'How willing are you to update older content when facts change?',options:[{id:'willing',label:'Very willing; accuracy matters to me',scores:{finance:1,legal:1,science:1,wellness:1}},{id:'sometimes',label:'For important updates, yes',scores:{ai_tech:1,business:1,education:1}},{id:'evergreen',label:'I prefer topics that change less often',scores:{books:1,home:1,asmr:1}}]},
  {id:'c23',text:'What is your preferred way to stand out?',options:[{id:'clarity',label:'Explain difficult things clearly',scores:{education:2,science:1,ai_tech:1}},{id:'visuals',label:'Strong visuals and editing',scores:{beauty:1,travel:1}},{id:'voice',label:'A memorable point of view or humor',scores:{comedy:2,business:1,gaming:1}},{id:'specific',label:'Serve a very specific audience',scores:{software:1,education:1,home:1}}]},
  {id:'c24',text:'How do you want to approach monetization at first?',options:[{id:'trust',label:'Build trust before considering offers',scores:{education:1,science:1,books:1}},{id:'services',label:'Use content to support a service or business',scores:{business:2,marketing:2,software:1}},{id:'later',label:'Explore platform features and sponsorships later',scores:{comedy:1,travel:1,beauty:1}}]},
  {id:'c25',text:'Which small experiment would you actually finish this week?',options:[{id:'tutorial',label:'A short practical tutorial',scores:{ai_tech:2,education:2,software:1}},{id:'story',label:'A researched story or explainer',scores:{truecrime:1,science:1,books:1}},{id:'creative',label:'A creative or entertaining video',scores:{comedy:2,gaming:1,beauty:1}},{id:'guide',label:'A useful guide or comparison',scores:{travel:1,home:1,marketing:1}}]}
);
pathways.freelancer.questions.push(
  {id:'f16',text:'Which kind of feedback would help you improve most?',options:[{id:'visual',label:'Specific notes on visual quality',scores:{graphic:1,uiux:1,video:1}},{id:'function',label:'Tests showing whether something works',scores:{web:2,automation:2}},{id:'results',label:'Evidence of audience or business results',scores:{marketing:2,social:1}},{id:'editorial',label:'Notes on clarity and storytelling',scores:{writing:2,decks:1}}]},
  {id:'f17',text:'How comfortable are you with promoting your services?',options:[{id:'comfortable',label:'Comfortable reaching out and networking',scores:{social:1,marketing:2}},{id:'learning',label:'I can learn a repeatable outreach process',scores:{graphic:1,video:1,web:1}},{id:'quiet',label:'I prefer inbound leads and portfolio examples',scores:{uiux:1,writing:1,automation:1}}]},
  {id:'f18',text:'Which project scope would suit you best as a beginner?',options:[{id:'small',label:'A clearly defined small task',scores:{graphic:1,writing:1,decks:1}},{id:'package',label:'A packaged service with a fixed deliverable',scores:{video:1,social:1,marketing:1}},{id:'project',label:'A larger project broken into milestones',scores:{web:2,uiux:1,automation:1}}]},
  {id:'f19',text:'How do you feel about learning from tutorials and documentation?',options:[{id:'enjoy',label:'I enjoy independent learning',scores:{web:1,automation:2,uiux:1}},{id:'guided',label:'I prefer a structured course or mentor',scores:{graphic:1,video:1,motion:1}},{id:'practice',label:'I learn best by trying and correcting mistakes',scores:{video:1,web:1,graphic:1}}]},
  {id:'f20',text:'Which work rhythm sounds most comfortable?',options:[{id:'focused',label:'Long blocks of focused work',scores:{web:1,motion:1,uiux:1}},{id:'varied',label:'A mix of different tasks each day',scores:{social:2,marketing:1}},{id:'short',label:'Short, clearly bounded tasks',scores:{writing:1,graphic:1,decks:1}}]},
  {id:'f21',text:'Which proof would you most like to show potential clients?',options:[{id:'case',label:'A before-and-after case study',scores:{uiux:2,marketing:1,graphic:1}},{id:'demo',label:'A working demo or live website',scores:{web:3,automation:1}},{id:'reel',label:'A reel of finished creative work',scores:{video:2,motion:2,graphic:1}},{id:'sample',label:'A strong writing or campaign sample',scores:{writing:2,social:1}}]},
  {id:'f22',text:'How important is a low-cost start?',options:[{id:'very',label:'Very important; I need free or low-cost tools',scores:{writing:1,social:1,uiux:1}},{id:'some',label:'Important, but I can invest carefully later',scores:{graphic:1,web:1,marketing:1}},{id:'flexible',label:'I already have access to suitable tools',scores:{video:1,motion:1,web:1}}]},
  {id:'f23',text:'Would you rather specialize or offer several related services initially?',options:[{id:'specialize',label:'Specialize in one clear service',scores:{uiux:1,motion:1,automation:1}},{id:'related',label:'Combine two related services',scores:{graphic:1,video:1,social:1}},{id:'test',label:'Try a few small projects before deciding',scores:{writing:1,web:1,marketing:1}}]},
  {id:'f24',text:'How comfortable are you managing project deadlines?',options:[{id:'comfortable',label:'Comfortable planning milestones and deadlines',scores:{web:1,uiux:1,marketing:1}},{id:'tools',label:'I can use a planner and reminders',scores:{video:1,graphic:1,social:1}},{id:'support',label:'I need to build this habit',scores:{writing:1,automation:1}}]},
  {id:'f25',text:'Which sample project could you realistically start this week?',options:[{id:'brand',label:'Create a small brand identity concept',scores:{graphic:2,decks:1}},{id:'prototype',label:'Design a simple app screen flow',scores:{uiux:2,web:1}},{id:'video',label:'Edit a 30–60 second video sample',scores:{video:2,motion:1}},{id:'website',label:'Build a one-page website',scores:{web:2,automation:1}},{id:'campaign',label:'Write a script or a 5-post content plan',scores:{writing:2,social:1,marketing:1}}]}
);

export function scoreAssessment(pathway, answers) {
  const config = pathways[pathway];
  if (!config) throw new Error('Unknown pathway');
  const totals = Object.fromEntries(config.candidates.map(([id]) => [id, 0]));
  const reasons = {};
  for (const q of config.questions) {
    const answerId = answers[q.id];
    const option = q.options.find(o => o.id === answerId);
    if (!option) continue;
    for (const [candidate, points] of Object.entries(option.scores || {})) {
      totals[candidate] = (totals[candidate] || 0) + points;
      reasons[candidate] ||= [];
      reasons[candidate].push(q.text);
    }
  }
  const sorted = config.candidates
    .map(([id, label]) => ({ id, label, score: totals[id] || 0, reasons: reasons[id] || [] }))
    .sort((a,b) => b.score - a.score);
  const top = sorted[0];
  const totalAnswered = Object.keys(answers).length;
  return {
    pathway,
    completedAnswers: totalAnswered,
    totalQuestions: config.questions.length,
    recommendation: top,
    alternatives: sorted.slice(1,3),
    confidence: totalAnswered < 8 ? 'early_signal' : (sorted[0]?.score === sorted[1]?.score ? 'exploratory' : 'directional'),
    note: 'This is a structured starting point, not a guarantee of success. Test the recommendation with a small project and update your direction based on evidence.',
    nextSteps: [
      'Study 3 strong examples in this area and note what makes them useful.',
      'Create one small sample project within the next 7 days.',
      'Ask 2–3 people in your target audience or client group for feedback.',
      'Review your energy, learning progress, and real-world response before committing further.'
    ]
  };
}
