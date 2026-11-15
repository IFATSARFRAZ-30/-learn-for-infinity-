/*
  Learn for Infinity: the one place where the content of the home, explore, news and academy pages lives.
  Edit this file and all four pages update together.

  HOW ORDERING WORKS
  - Every list is shown newest first, automatically, on every page.
  - An item with a date (written YYYY-MM-DD) is placed by its date, newest date first.
  - An item with no date counts as "just added" and goes above all dated items, in the order you list it
    (so a new item pasted at the top of its list without a date still appears first).
  - Add featured: true to pin an item to the front of the carousels. Use this for trending items.
  - Carousels show the featured items first, then the newest ones.

  HOW TO ADD SOMETHING
  - Copy one entry inside the right list, paste it at the top of that list, and change the words. Add date:'YYYY-MM-DD' if you want it placed by date.
  - A new article or news post also needs its own page in the articles/ or news/ folder, as before.
  - Topics for articles and news: business, finance, technology (news can also use psx).
  - Add 'tools' to an article's tags to show it under the "tools" button on Explore and in "Tools and explainers" on Home.
*/
window.SITE = {

  /* ---------- ARTICLES ---------- */
  articles: [
    { href:'articles/why-companies-fail.html', topic:'business', tags:['business'], date:'2026-10-12', featured:false,
      title:'Why companies fail despite having good products',
      excerpt:"A good product isn't enough. What separates businesses that survive from ones that don't.",
      label:'read · interactive', image:'images/articles/why-companies-fail.jpg' },
    { href:'articles/what-is-an-ai-agent.html', topic:'technology', tags:['technology'], date:'2026-10-12', featured:false,
      title:'What is an AI agent, really?',
      excerpt:'Not just a chatbot. A plain explanation of what agents do differently.',
      label:'read · interactive', image:'images/articles/what-is-an-ai-agent.jpg' },
    { href:'articles/subscription-businesses.html', topic:'business', tags:['business'], date:'2026-10-12', featured:false,
      title:'How subscription businesses actually make money',
      excerpt:'Churn, lifetime value and why the first month rarely pays for itself.',
      label:'read · interactive', image:'images/articles/subscription-businesses.jpg' },
    { href:'articles/ifrs-18-explained.html', topic:'finance', tags:['finance','tools'], date:'2026-10-12', featured:false,
      title:'What IFRS 18 changes, explained simply',
      excerpt:"The new standard reshapes how income statements look. Here's what's different.",
      label:'explainer · interactive', image:'images/articles/ifrs-18-explained.jpg' },
    { href:'articles/interest-rates-and-business.html', topic:'business', tags:['business','tools'], date:'2026-10-12', featured:false,
      title:'Why interest rates affect businesses more than they realise',
      excerpt:'From loan costs to customer demand, the chain reaction explained.',
      label:'explainer · interactive', image:'images/articles/interest-rates-and-business.jpg' },
    { href:'articles/start-early-compound-interest.html', topic:'finance', tags:['finance','tools'], date:'2026-10-12', featured:false,
      title:'Why starting early beats saving more',
      excerpt:'Compound growth, shown with a slider you can break.',
      label:'explainer · interactive', image:'images/articles/start-early-compound-interest.jpg' }
  ],

  /* ---------- NEWS ---------- */
  news: [
    { href:'news/kse-100-closes-above-166000.html', topic:'psx', date:'2026-10-16', featured:false,
      title:'KSE-100 ends the week above 166,000 points',
      summary:'The benchmark index closed at 166,419.72 on Friday, up 233.55 points, after a 768-point jump the day before.',
      image:'images/%20news/kse-100-closes-above-166000.jpg' },
    { href:'news/it-exports-september-435-million.html', topic:'technology', date:'2026-10-16', featured:false,
      title:"Pakistan's IT exports reach $435 million in September",
      summary:'Monthly IT exports rose 19% on a year earlier and 10% on August; the last 12 months total $4.8 billion.',
      image:'images/%20news/it-exports-september-435-million.jpg' },
    { href:'news/fbr-return-deadline-31-october.html', topic:'business', date:'2026-10-15', featured:false,
      title:'FBR extends the 2026 tax return deadline to 31 October',
      summary:'The deadline moves from 15 October to 31 October, the second extension this filing season.',
      image:'images/%20news/fbr-return-deadline-31-october.jpg' },
    { href:'news/imf-expects-pakistan-inflation-near-10-percent.html', topic:'business', date:'2026-10-13', featured:false,
      title:'IMF expects Pakistan inflation near 10% in FY27',
      summary:"The IMF projects 9.9% inflation and 3.5% growth for FY2026-27, both weaker than the government's targets.",
      image:'images/%20news/imf-expects-pakistan-inflation-near-10-percent.jpg' },
    { href:'news/sbp-holds-policy-rate-at-11-5-percent.html', topic:'finance', date:'2026-10-09', featured:false,
      title:'State Bank held its policy rate at 11.5%. Three members wanted a rise',
      summary:'The September minutes show a 7-to-3 vote: seven for holding, three for raising the rate by 1 percentage point.',
      image:'images/%20news/sbp-holds-policy-rate-at-11-5-percent.jpg' },
    { href:'news/imf-pakistan-agree-1-2-billion-tranche.html', topic:'finance', date:'2026-10-08', featured:false,
      title:'IMF and Pakistan agree on a $1.2 billion tranche',
      summary:'Staff reached agreement on the fourth review of the Extended Fund Facility; the money still needs IMF board approval.',
      image:'images/%20news/imf-pakistan-agree-1-2-billion-tranche.jpg' }
  ],

  /* ---------- COURSES (Academy) ---------- */
  courses: [
    { href:'academy.html#courses', topic:'accounting', date:'', featured:false, lessons:'10 lessons',
      title:'Accounting Fundamentals',
      desc:'Start from zero and build a solid foundation — from what accounting is to reading financial statements.',
      image:'images/courses/accounting-fundamentals.jpg' },
    { href:'academy.html#courses', topic:'finance', date:'', featured:false, lessons:'8 lessons',
      title:'Financial Statement Analysis',
      desc:"Learn how to actually read and interpret a company's financials.",
      image:'images/courses/financial-statement-analysis.jpg' },
    { href:'academy.html#courses', topic:'technology', date:'', featured:false, lessons:'12 lessons',
      title:'Power BI for Beginners',
      desc:'From raw data to useful business insight, one dashboard at a time.',
      image:'images/courses/power-bi-for-beginners.jpg' }
  ],

  /* ---------- VIDEOS (Academy and Home) ----------
     art is the little illustration used until you add a thumbnail: book, bars or coin.
     Put the YouTube link in href when you have it; until then the card does not link anywhere. */
  videos: [
    { href:'#', art:'book', date:'', featured:false, title:'Debit and credit, explained with real transactions', tag:'12:04 — accounting fundamentals' },
    { href:'#', art:'bars', date:'', featured:false, title:'Reading a balance sheet in 10 minutes', tag:'10:41 — financial statement analysis' },
    { href:'#', art:'coin', date:'', featured:false, title:"Pakistan's new tax reforms, explained", tag:'08:57 — explore' },
    { href:'#', art:'bars', date:'', featured:false, title:'How subscriptions make money', tag:'07:33 — explore' }
  ],

  /* ---------- PAID TOOLS (shown as ads in the right margin of Explore) ---------- */
  tools: [
    { href:'#', kind:'tool', title:'Financial Modelling Template Pack', desc:'Ready-to-use Excel worksheets.', price:'Rs 900',
      image:'images/products/financial-modelling-template-pack.jpg' }
  ],

  /* ---------- PAID COURSES (Academy) ---------- */
  paid: [
    { href:'#', kind:'course', title:'Power BI for Business — Full Course', desc:'Video course with templates.', price:'Rs 2,200',
      image:'images/products/power-bi-full-course.jpg' },
    { href:'#', kind:'study pack', title:'Financial Accounting Study Pack', desc:'PDF textbook, MCQs, revision notes.', price:'Rs 1,500',
      image:'images/products/financial-accounting-study-pack.jpg' }
  ]
};
