import { useParams, Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import avatarDavid from "../assets/avatar-david.png";
import articleHeroWoodo from "../assets/article-hero-woodo.png";

const ArticlePage = () => {
  const { slug } = useParams();

  // For now, only the manifesto article has content
  if (slug !== "why-we-started-woodo") {
    return (
      <div className="page-enter pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Coming Soon</h1>
          <p className="text-muted-foreground mb-6">This article is not yet available.</p>
          <Link to="/think" className="text-sm font-semibold text-primary-dark hover:text-primary transition-colors">
            ← Back to Think
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter pt-20">
      {/* Hero image */}
      <section className="w-full max-w-4xl mx-auto px-6 pt-8 pb-2">
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={articleHeroWoodo}
              alt="Why We Started Woodo"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "420px" }}
            />
          </div>
                  <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: "#94A3B8" }}>Woodo.ai illustration.</p>
        </ScrollReveal>
      </section>

      {/* Author sidebar + Article body */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 pt-8">
          {/* Author sidebar — left on desktop */}
          <ScrollReveal className="md:w-48 flex-shrink-0" delay={100}>
            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 md:sticky md:top-28">
              <img src={avatarDavid} alt="David Dong" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-foreground uppercase tracking-wide">BY DAVID DONG</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Co-founder, Woodo.ai</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Article body */}
          <ScrollReveal className="flex-1 min-w-0" delay={200}>
            <h1 className="font-serif text-3xl md:text-[42px] leading-[1.15] font-medium text-foreground tracking-tight mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Why We Started Woodo
            </h1>

            <div className="prose-article">
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#1E293B", fontFamily: "'Georgia', serif", lineHeight: 1.85 }}>
                Point72 recently posted a new role: AI Intern, Long/Short Equities.
              </p>

              <p>
                At first glance, nothing remarkable — a top hedge fund hiring an AI intern. But when Silver (my Woodo.ai co-founder, now working at a Family Office in Silicon Valley) and I read through the actual job description, we both went quiet for a moment.
              </p>

              <p>
                The role doesn't sit under the Tech team. It doesn't sit under the Quant team. It sits directly under the fundamental Long/Short equities desk. And buried in the requirements are two specific tools, called out by name: Cursor and Codex.
              </p>

              <p>
                These are AI coding assistants. Two years ago, neither of them existed. Today, they are written into the JD of one of the most sophisticated hedge funds in the world — at $130,000 a year, for an undergraduate summer intern — as a baseline requirement.
              </p>

              <p>
                This is not an isolated case. Around the same time, Singapore's Temasek established a dedicated POD-AI group inside its Investment Group. The intern JDs there list LangChain, the Anthropic Claude API, agentic workflows, and RAG — terms that two years ago lived only in research papers, now treated as standard literacy for incoming students.
              </p>

              <p>
                For two people who have spent their careers in finance, the message is unmistakable: the most sophisticated capital allocators in the world are using their hiring decisions to tell everyone — <strong>fluency with AI is no longer a differentiator. It is the price of admission.</strong>
              </p>

              <hr />

              <p>
                On the other side of the same coin, a different set of numbers.
              </p>

              <p>
                In late March, Fortune reported on a Federal Reserve and Duke University survey of 750 CFOs: AI-related layoffs in 2026 are projected to reach 500,000 — nine times the figure for 2025. A few days later, the Challenger report for March showed that AI had, for the first time, surpassed "business closure" and "restructuring" as the single largest stated cause of monthly layoffs.
              </p>

              <p>
                I wrote a short piece on this recently. My core argument was a single sentence: <em>whether the layoffs are actually driven by AI no longer matters.</em> What matters is that "AI transformation" has become a self-reinforcing narrative. Once Block and Amazon publicly tied their layoffs to AI efficiency gains, the reputational risk of layoffs evaporated for everyone else. The market didn't punish them. It rewarded them.
              </p>

              <p className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1E293B", lineHeight: 1.6, margin: "2rem 0" }}>
                So we have a pincer.
              </p>

              <p>
                On the entry side, firms like Point72 and Temasek are raising the bar. On the exit side, companies are laundering layoffs through "AI transformation." Young people are caught in the middle, squeezed from both directions at once.
              </p>

              <p>
                And if you turn back to look at the situation in Chinese universities, you find a third reality — one I've come to call <strong>the consumption trap</strong>.
              </p>

              <hr />

              <p>
                Over the past few months, my team and I conducted roughly 200 hours of in-depth interviews with high school seniors and first- and second-year university students in Shanghai and Hangzhou. The finding was counterintuitive:
              </p>

              <p>
                AI adoption is essentially universal. Nearly every student we talked to uses AI — for search, for summarization, for homework, for emotional support. By any reasonable definition, this is an AI-native generation.
              </p>

              <p>
                But when we asked the next question — "Have you used Claude Code? Do you know what an AI agent is?" — more than 80% said no. They had never heard of either.
              </p>

              <p className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1E293B", lineHeight: 1.6, margin: "2rem 0" }}>
                That is the real fault line.
              </p>

              <p>
                The question isn't whether students use AI. They all do. The question is <em>at what layer.</em> And almost all of them are stuck on the same layer: the consumption layer. They use AI to get answers and dispatch small problems. Almost none of them are using AI to build projects, complete real work, or compound capability.
              </p>

              <p>
                The gap between "using AI" and "creating with AI" is one that almost no one in this generation has crossed — and it is precisely the gap that Point72's job description is designed to filter for.
              </p>

              <hr />

              <p>
                Keer, Silver, and I have spent the past few years standing in two worlds at once. One foot in the most elite universities and financial institutions in China; the other in the startup ecosystems around Silicon Valley, Stanford, and Columbia.
              </p>

              <p>
                What we've seen in the Bay Area is not, contrary to popular belief, a population of smarter students. What we've seen is a population of students who enter real creative environments earlier. They start coding earlier. They treat building as the default action rather than an exotic choice. By their freshman year — sometimes earlier — they've already shipped products, raised funding, built things people use.
              </p>

              <p>
                And in 2025, the leap in capability of coding agents like Claude Code has compressed the cost of going from idea to prototype to nearly zero. The hard technical wall that used to keep 99% of Chinese students out of the creative loop — programming, systems, engineering — is being dismantled in real time.
              </p>

              <p className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1E293B", lineHeight: 1.6, margin: "2rem 0" }}>
                This is a structural window.
              </p>

              <p>
                It reminds me of what happened in China in the 1990s, when a wave of returning scholars and educators systematically democratized English literacy. At the time, most students learning English couldn't tell you exactly what specific opportunities it would unlock for them. They simply understood, intuitively, that without English, the higher-quality version of the world would remain closed off.
              </p>

              <p>
                We're living through the same kind of structural moment today. Only this time, the thing being democratized is not a language. <strong>It is the capacity to create.</strong>
              </p>

              <hr />

              <p>
                I want to make one more point directly — not as a long-term thesis, but as a short-term observation about the next few years.
              </p>

              <p>
                For Chinese students today, this isn't only a question about long-run capability. It's also an extraordinary, time-bounded <strong>arbitrage window</strong>. The structure is simple:
              </p>

              <p>
                <strong>Demand is spiking.</strong> The most selective American universities and the most desirable employers have begun screening explicitly for people who can build. Point72's JD is just the visible tip — admissions officers and hiring managers across the board are quietly shifting their signal of choice from "polished student" to "student who has actually shipped something."
              </p>

              <p>
                <strong>Supply is effectively zero.</strong> Our research already gave us the answer: the share of Chinese students who have actually crossed the gap and are building real things with AI is still in the low single digits. Not because they aren't capable. Because no one has shown them what "the other side" even looks like.
              </p>

              <p>
                Anyone who has done investing recognizes this structure immediately: once an opportunity becomes obvious to everyone, the alpha disappears. A high school senior or university freshman who spends a single summer building a serious AI project right now will have a visibly differentiated profile in admissions and recruiting. But once "AI projects" become as standardized as a TOEFL score — and we estimate that takes three to five years — that edge will be gone.
              </p>

              <p>
                <strong>The English-language premium in China lasted nearly twenty years. The AI literacy premium is going to be much shorter than that.</strong>
              </p>

              <hr />

              <p>
                So Woodo.ai is not, at its core, a company that teaches students "how to use AI." There are already too many products doing that — and frankly, what most of them do is push students even deeper into the consumption layer.
              </p>

              <p>
                What we want to do is simpler, and more radical: we want to make it possible for an undergraduate — or even a high schooler — to actually move through a <strong>complete build loop</strong>. Here's what that looks like in practice:
              </p>

              <ul>
                <li><strong>Provoked by a real problem.</strong> Not an assignment handed down by a teacher. Something the student genuinely wants to fix, understand, or change in the world around them.</li>
                <li><strong>Understanding what's needed.</strong> Translating a vague frustration into actual specifications. Scoping. Asking the right questions before writing a single line of code.</li>
                <li><strong>Shipping a demo.</strong> Building something that runs — not a slide deck about something that could run. The first time a student sees their own idea executing in front of them is the moment everything changes.</li>
                <li><strong>Receiving real feedback.</strong> From actual users. Not from a rubric, not from a grade, not from a parent. The kind of feedback that contradicts what the student thought was true.</li>
                <li><strong>Iterating.</strong> Changing the thing based on what the feedback revealed. Then shipping again. Then changing again. This is where capability actually compounds.</li>
                <li><strong>Publishing.</strong> Putting the finished work into the world where it can be seen, used, and remembered. Something a student can put in an application essay. Something they can open on a screen during an interview. Something that exists.</li>
              </ul>

              <p>
                Not finishing a course. <strong>Completing a creation.</strong>
              </p>

              <hr />

              <p>
                A few things we believe, plainly:
              </p>

              <p>
                <strong>Agency is the one form of competitiveness that doesn't go out of style.</strong> The substrate it runs on keeps changing — typewriters, English, code, AI — but the underlying capability is the same. People who can take an idea and turn it into something real have always been the ones who get to choose their own lives.
              </p>

              <p>
                <strong>Creating with AI in 2026 is what speaking a foreign language was in 2000.</strong> You may not know exactly what doors it will open. But you know, with quiet certainty, that having it means more doors stay open.
              </p>

              <p>
                <strong>What most young people are missing isn't talent. It's a starting point that's actually good enough.</strong> Talent is the easy part. The hard part is being given a real environment in which to use it — one with real problems, real tools, real feedback, and real stakes.
              </p>

              <p>
                That last belief is the one Woodo.ai exists to act on.
              </p>

              <p className="text-xl font-medium italic" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1E293B", lineHeight: 1.6, margin: "2.5rem 0" }}>
                Democratizing invention for everyone. The capacity to create should not belong to the few.
              </p>

              <p className="text-right" style={{ color: "#64748B", fontStyle: "italic" }}>
                — David<br />
                Co-founder, Woodo.ai
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
