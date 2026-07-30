![AI literacy arbitrage](/articles/meetup-4/chulwoo/01-cover-ai-literacy-arbitrage.png)

*The AI literacy gap is not only about implementation speed. A market appears in the ability to connect vague customer needs with a product that actually works.*

Some work looks easy to people who know how to use AI well.

You gather materials, shape the structure, run Codex, build a website, connect an API, and deploy it. If you add feedback, something people can actually touch can appear within a few days.

But the same work is a months-long outsourcing project for someone else.

This is not just a difference in development speed. I think it is a fairly large market. More precisely, it is arbitrage created by the gap in AI literacy. Between people who have connected AI to real work and people who have not, there is a larger imagination gap than it first appears.

Maple ([maplesr.com](https://maplesr.com)) is a Mac app for building source-based LLM wikis. When you add sources such as lecture PDFs, transcripts, papers, web articles, or personal notes, an LLM creates concept pages, links pages together, and keeps track of which source each explanation came from. Users can ask questions to the wiki, and good answers can be reflected back into wiki updates.

![Maple app wiki](/articles/meetup-4/chulwoo/02-maple-app-wiki.png)

*Maple began as a Mac app that turns sources into a wiki and sends questions and updates back into the knowledge loop.*

I originally built Maple for my own studying. As I ran an LLM wiki workflow with Obsidian and Codex, I found that giving an agent too much freedom made page names, source attribution, and update criteria keep drifting. Maple was an app designed around UI/UX that controls this high degree of freedom so the workflow can be optimized for learning.

But after building and sharing Maple publicly, the market I saw was not the personal study app market.

## Customers ask before they can imagine what is possible

![Vague customer needs to wiki](/articles/meetup-4/chulwoo/03-vague-needs-to-wiki.png)

*Customers who do not know frontier technology usually describe the edges of what they want before they can specify the product itself.*

I posted the building process on Threads.

My intention was to show what problem I was solving, what screens I was making, and why this workflow was needed. It was a kind of building in public.

But people interpreted Maple in ways that were different from the use case I had explained, and they reached out with different needs of their own.

The first organization that contacted me was an academy that teaches IB. IB stands for International Baccalaureate, and it is close to an international curriculum used for overseas university admissions. They had a lot of lecture materials, problem sets, solutions, and concept explanations. The problem was that those materials were not organized in a structure that students could easily use.

What they wanted was not a clear product specification from the beginning.

"We want students to use our materials better."

"It would be nice if students could ask questions."

"It would be nice if lectures and problem sets were connected."

"It feels like AI could be added here."

These requirements point in the right direction, but they are not yet a product. Customers talk about the edges of the outcome they want. But they usually do not know how far the technology can go, what structure is needed, which parts should be automated, and which parts should be reviewed by humans.

This does not mean customers are incapable. They know their own domains, they know what is inconvenient, and they are willing to pay. But they lack imagination about where frontier technology is right now, and how LLMs, agents, and web apps can be combined.

When people do not know what is technically possible, their requirements remain abstract.

## Arbitrage comes from translation, not implementation

Many people understand AI arbitrage as "building faster with AI." Speed matters, of course. Work that once took weeks can be done in days, and one person can now push surprisingly far into work that previously required several people. But the real arbitrage appears before implementation.

Customers cannot precisely describe what they want. This is especially true for customers who do not know frontier technology well. Words like "we want to add AI," "we want to provide materials better," or "it would be good if students could ask questions" are only starting points. If you start building immediately from there, the result becomes strange outsourcing. The stated features may get built, while the actual problem remains unresolved.

The important work is translating a customer's abstract requirement into a problem that AI can execute.

In the case of the IB academy, the problem was not "let's add a chatbot." The real problem was turning lecture materials and problem sets into a source-grounded learning system. A builder imports sources into the Maple app, builds a wiki, and manages the structure. A student visits a public website, sees a study path, searches concepts, and asks questions through chat when needed.

In other words, the problem had to be redefined as an `import, build wiki, publish, ask, maintain` loop.

![Clarify and build loop](/articles/meetup-4/chulwoo/04-clarify-build-loop.png)

*Arbitrage comes less from "the ability to build quickly" and more from the ability to translate abstract requirements into executable workflows.*

Once this loop is defined, AI becomes powerful. You can ask Codex to build a public wiki website, connect an API for questions, fix the UI while looking at it, and adjust the source-aware answer flow. But before that, what needs to be built must be defined.

Knowing how to use AI is not only about writing good prompts. It is the ability to listen to a vague need, imagine the workflow behind it, break it into technically possible parts, and quickly show the customer an understandable result. Technical imagination and implementation experience are both needed.

Customers are not buying a few lines of code. They are buying the ability to imagine something they cannot yet clearly imagine, turn it into an executable structure, and bring it all the way to a working form.

## This gap will not disappear easily

From the outside, it can look like this arbitrage will disappear quickly. AI tools are improving fast, and development tools are becoming easier. So it seems like everyone will soon use AI well, and this gap will disappear too.

But the faster AI develops, the more the gap can keep reappearing. Even someone who catches up to today's frontier has to learn again a few months later. New models, new workflows, new product patterns, and new cost structures keep arriving.

![Moving AI frontier gap](/articles/meetup-4/chulwoo/05-moving-frontier-gap.png)

*As the AI frontier moves faster, keeping up becomes work in itself, and the literacy gap keeps being recreated.*

And people have a higher psychological barrier to studying or trying something new than we might expect.

They do not use tools even when the tools are free. They do not read documentation even when reading it would be enough. They do not run open source projects themselves even when they are available. Even when something feels doable with only a few hours of investment, once their own work and money are involved, they often want to hand it to someone else.

This is not a matter of laziness. For most people, learning a new AI tool is not their main job. They are busy with their own work, and they often lack the criteria to judge where something is stuck when it fails. For someone who has not done it before, installation, API keys, source organization, prompts, deployment, maintenance, and cost management are all uncertainty.

So many customers choose to pay rather than pay the cost of learning directly.

From the customer's perspective, this is rational. In the past, building a homepage through outsourcing could cost several million to more than ten million won and take months. If someone can organize their materials, build a website, add chat, and create a structure that can keep operating within a few days, that value is meaningful.

The difference between the internal cost of someone who knows how to use AI well and the value a customer feels. That difference is creating the market right now.

## Services are easy. Product is hard.

But saying this market is large does not automatically mean it can become a good product company.

Customer requirements are usually different. What an IB academy wants, what a startup wants when managing team information, and what a VC wants when organizing investment review materials may all look like "wikis" on the surface. But the actual workflows are different. The source types are different, the permission structures are different, and who reads and who edits are different too.

If you accept every requirement, you can make money. With AI, outsourced work can be handled fairly quickly, and you can also charge a monthly maintenance fee. But if that is all you do, Maple becomes AI business process outsourcing rather than a product.

![Service to product loop](/articles/meetup-4/chulwoo/06-service-product-loop.png)

*If you accept every request, it becomes services. If you identify the repeating loop, it can become a product.*

To become a product, you have to find the repeating structure. Materials accumulate. Those materials have sources. Someone asks questions based on those materials. Good answers should be reflected back into the structure. The important question is how well you can capture this common loop.

I still do not know whether the arbitrage created by this literacy gap can be expanded in a scalable way. Clarifying a customer's abstract requirement is highly human work, and every domain has different context. But I do think this market will exist for longer than people expect.

As AI advances, people's AI literacy does not automatically level out. Instead, the frontier keeps moving forward, and most customers will again stand in front of it with abstract requirements. At that point, the person they need is not simply someone who builds on their behalf.

They need someone who can pull the customer's imagination toward the frontier, define vague needs as executable problems, and quickly give those problems form with AI.

As long as that gap remains, the difference in AI literacy will continue to be a market.
