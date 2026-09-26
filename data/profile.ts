export const profile = {
  name: 'Jilla Srivardhan',
  title: 'Aspiring AI/ML Engineer',
  role: 'AI & GenAI Trainee @ 10xAISchool',
  location: 'Hyderabad, Telangana, India',
  email: 'jillasrivardhan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jilla-srivardhan',
  github: 'https://github.com/jillasrivardhan' as string | null,
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export const capabilityStack = [
  { label: 'Python', note: 'foundation' },
  { label: 'Machine Learning', note: 'models & data' },
  { label: 'Generative AI', note: 'LLM applications' },
  { label: 'RAG', note: 'knowledge retrieval' },
  { label: 'AI Agents', note: 'reasoning & tools' },
]

export const buildAreas = [
  {
    id: '01',
    title: 'Generative AI',
    description: 'Building applications powered by modern LLMs.',
    meta: 'llm · prompting · generation',
    icon: 'sparkles',
  },
  {
    id: '02',
    title: 'RAG Systems',
    description: 'Connecting LLMs with external knowledge and documents.',
    meta: 'retrieve · augment · generate',
    icon: 'database',
  },
  {
    id: '03',
    title: 'AI Agents',
    description: 'Exploring intelligent systems capable of reasoning and tool usage.',
    meta: 'plan · act · observe',
    icon: 'bot',
  },
  {
    id: '04',
    title: 'Machine Learning',
    description: 'Building prediction and data-driven applications.',
    meta: 'train · evaluate · predict',
    icon: 'chart',
  },
  {
    id: '05',
    title: 'AI Applications',
    description: 'Turning ideas into useful real-world applications.',
    meta: 'idea → prototype → app',
    icon: 'layers',
  },
  {
    id: '06',
    title: 'Developer Tools',
    description: 'Building practical tools and experiments around AI.',
    meta: 'scripts · utilities · experiments',
    icon: 'terminal',
  },
] as const

export const skillGroups = [
  { group: 'Programming', items: ['Python'] },
  { group: 'AI / ML', items: ['Machine Learning', 'Generative AI', 'Natural Language Processing'] },
  { group: 'LLM / AI Engineering', items: ['LLMs', 'RAG', 'AI Agents', 'Prompt Engineering'] },
  { group: 'Frameworks', items: ['LangChain'] },
  { group: 'Development', items: ['Streamlit', 'Git', 'GitHub'] },
]

export const skillGraphNodes = ['Python', 'ML', 'GenAI', 'RAG', 'Agents', 'LangChain']

export const experience = {
  company: '10xAISchool',
  role: 'AI & GenAI Trainee',
  location: 'Hyderabad',
  period: 'September 2026 – Present',
  summary:
    'A hands-on learning program focused on Python, Full-Stack Development, Generative AI, and AI Agents.',
  highlights: [
    'Building Python foundations',
    'Studying Data Structures & Algorithms',
    'Building Generative AI applications',
    'Learning LLMs and RAG',
    'Exploring AI Agents',
    'Working with LangChain',
    'Completing practical projects and assignments',
    'Solving real-world problems',
    'Improving software development and AI engineering skills',
  ],
}

export type Project = {
  name: string
  tagline: string
  problem: string
  approach: string
  stack: string[]
  result: string
  github: string | null
  demo: string | null
  placeholder: boolean
}

const repo = (name: string) => `https://github.com/jillasrivardhan/${name}`

export const projects: Project[] = [
  {
    name: 'AI Job Search Engine',
    tagline: '10x Job Hunter — an AI-powered job discovery and matching dashboard for students.',
    problem: 'Students spend hours manually scrolling through job boards to find roles that actually fit their skills.',
    approach:
      'Parses a PDF/DOCX resume into a structured profile with an LLM (plus a heuristic fallback), collects listings via Apify, normalizes and deduplicates them, then scores each job against skills, location and experience level.',
    stack: ['TypeScript', 'Next.js', 'LLM', 'Apify', 'SQLite', 'Vercel Cron'],
    result:
      'A responsive dashboard of ranked jobs with a transparent 0–100 match score, matching skills, and direct links to the original postings.',
    github: repo('ai-job-search-engine'),
    demo: null,
    placeholder: false,
  },
  {
    name: 'LinkedIn Post Automation',
    tagline: 'A human-in-the-loop n8n workflow that runs a 30-day AI content series.',
    problem: 'Posting consistent, high-quality AI content on LinkedIn every day is time-consuming.',
    approach:
      'A scheduled n8n workflow picks the day’s topic, an AI Agent drafts the post, and Gmail sends it for approval — with a regeneration path for declined drafts.',
    stack: ['n8n', 'AI Agents', 'LLM', 'Gmail API', 'LinkedIn API'],
    result: 'Approved posts are published to LinkedIn automatically at 9:00 AM IST for the full 30-day campaign.',
    github: repo('Linkedin-Post-Automation'),
    demo: null,
    placeholder: false,
  },
  {
    name: 'College FAQ Assistant (RAG)',
    tagline: 'Ask questions about admissions, library rules and exam policies in plain language.',
    problem: 'General-purpose LLMs don’t know college-specific information and tend to guess.',
    approach:
      'Loads the FAQ document, splits it into chunks, embeds them with Jina Embeddings into a FAISS vector store, and answers through a LangChain agent with a retriever tool.',
    stack: ['Python', 'LangChain', 'RAG', 'FAISS', 'Jina Embeddings'],
    result: 'Students get grounded answers drawn from the college’s own documents instead of hallucinated ones.',
    github: repo('COLLEGE-FAQ-ASSISTANT-USING-RAG'),
    demo: null,
    placeholder: false,
  },
  {
    name: 'Restaurant Review Analyzer',
    tagline: 'Local-AI app that turns unstructured reviews into actionable insights.',
    problem: 'Restaurant owners receive lots of free-text feedback that is hard to summarize quickly.',
    approach:
      'Local Ollama models return a strict JSON structure that the app validates and cleans to reduce unsupported or hallucinated points.',
    stack: ['Python', 'Ollama', 'Streamlit', 'Structured Output'],
    result:
      'Shows sentiment, an estimated 1–5 rating, and top positives and negatives — with model selection, history and JSON export.',
    github: repo('Restuarant-Review-Analyzer'),
    demo: null,
    placeholder: false,
  },
  {
    name: 'Local AI Chatbot',
    tagline: 'A ChatGPT-style assistant running entirely on your own machine.',
    problem: 'Most chatbots need a paid cloud API key and send your prompts to third-party servers.',
    approach:
      'Streamlit UI talking to a local Ollama server with session memory, streaming responses, temperature control and custom system prompts.',
    stack: ['Python', 'Ollama', 'Streamlit', 'LLMs'],
    result:
      'A private, local-first chatbot with multi-model selection, health checks and hallucination-aware answers — no API key required.',
    github: repo('AI-CHATBOT'),
    demo: null,
    placeholder: false,
  },
]

export const labExperiments = [
  {
    file: 'llm_playground.py',
    title: 'LLM experiments',
    lines: ['> loading experiment...', '> initializing LLM', '> sampling responses...', '> comparing outputs'],
  },
  {
    file: 'rag_pipeline.py',
    title: 'RAG experiments',
    lines: ['> chunking documents...', '> embedding chunks', '> retrieving context...', '> generating response...'],
  },
  {
    file: 'prompt_lab.md',
    title: 'Prompt engineering',
    lines: ['> drafting system prompt', '> adding few-shot examples', '> testing edge cases...', '> refining instructions'],
  },
  {
    file: 'agent_loop.py',
    title: 'AI agent experiments',
    lines: ['> receiving task', '> planning steps...', '> calling tool: search', '> observing result'],
  },
  {
    file: 'chains.py',
    title: 'LangChain experiments',
    lines: ['> composing chain', '> binding prompt template', '> invoking LLM...', '> parsing output'],
  },
  {
    file: 'ml_notebook.ipynb',
    title: 'Machine learning experiments',
    lines: ['> loading dataset...', '> splitting train/test', '> fitting model...', '> evaluating'],
  },
]

export const journey = [
  { stage: 'Foundations', items: ['Python', 'Data Structures', 'Machine Learning'] },
  { stage: 'Generative AI', items: ['LLMs', 'Prompt Engineering', 'LangChain'] },
  { stage: 'Knowledge Systems', items: ['RAG', 'Embeddings', 'Vector Search'] },
  { stage: 'Agentic AI', items: ['AI Agents', 'Tool Usage', 'Agent Workflows'] },
  { stage: 'Next', items: ['Still building. Still learning.'], open: true },
]

export const education = {
  institution: 'Indur Institute of Engineering & Technology (IIET)',
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science and Engineering',
}
