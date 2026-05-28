![Laparoscopic tools and trajectory data in a bright surgical data lab](/articles/meetup-3/yechan/01-surgical-data-lab.png)

*Much of surgical skill is still not structured as data. That gap may be where a medical robotics startup should begin.*

There is still a lot of unstructured data in the operating room.

Where is the surgeon looking? How much force are they applying to the instrument? At what moment do they change judgment? What trajectory do they follow through the procedure? After surgery, the EMR contains diagnoses, prescriptions, and operation notes. But much of the actual surgical technique still remains inside the body and experience of the surgeon. In areas like laparoscopic surgery, which is still widely used, we do not yet have enough infrastructure for recording and learning from expert movements at scale.

That was the starting point of what I wanted to talk about.

What we are building is not simply another surgical robot. More precisely, it is closer to surgical data infrastructure: a system that records and interprets surgical data, then eventually connects that data to robot learning. It is not just about leaving a video record of surgery. It is about recording the position of laparoscopic instruments, force, joint movement, and trajectory so that the act of surgery itself can become more precise data.

And this data is not taken outside the hospital. It is stored and managed on an internal hospital server, in an on-premise environment. Each hospital keeps full sovereignty over its own data, and the data is processed and used inside that institution. On top of that structure, we build the layer that makes standardization, interpretation, and model training possible.

The problem is that this vision is not only technically difficult.

Once you build a company, prepare a seed round, and start meeting investors, the questions quickly move elsewhere. What does this company need to prove right now? How much money does it need? What valuation is appropriate? Who should be the lead investor? How should the global market be designed?

At first, it is easy to think that building good technology is enough. But in front of the first financing round, a harder question appears: what evidence will we create before the next round?

## Surgical data may need to come before the surgical robot

When people look at the surgical robotics market, they immediately think of da Vinci.

da Vinci already has a massive installed base and has become the name that represents the category of robotic surgery. But robotic surgery has not replaced every kind of surgery. Laparoscopic surgery still accounts for a very large share of procedures. Considering cost, workflow, clinical need, and the equipment environment inside hospitals, laparoscopy remains the most realistic option in many cases.

So a more important question appears.

Where does a lot of surgical data actually come from? From procedures already happening on a robot platform? Or from the much wider base of conventional laparoscopic surgery?

The opportunity we see is closer to the latter. If sensors and encoders can be attached to laparoscopic instruments, and the movements during real surgery can be recorded as a surgical record, immediate value appears. It can be used for education and training, for research, and later for understanding the performance of a particular technique or team more quantitatively.

The important point is that this data is not accumulated in one central server. It remains inside each hospital. Data does not move outside the hospital, and each institution independently owns and controls its data. We build a software layer that allows consistent interpretation and learning even in this distributed environment.

In the long run, this data can become the foundation for robot learning. Expert movements can be collected, policies can be built from those trajectories, and eventually those policies can move into hardware. But if this long vision is explained from the beginning only as "we are going to build a complete surgical robot," it can feel too far away for both investors and users.

What an early company needs to prove first should be smaller and more concrete.

![Laparoscopic instruments, sensors, encoders, and trajectory arcs in a dark macro scene](/articles/meetup-3/yechan/02-instrument-trajectory.png)

*The first value may come not from a complete robot, but from a data layer that records position, force, and motion in existing laparoscopic surgery.*

## Is this a hardware company, or a software and data company?

This was the biggest positioning question.

From the outside, we look like a medical robotics company. We are building hardware, thinking about devices that enter the operating room, and ultimately looking toward robotic intervention. But at the seed stage, the thing the company must prove right now may not be "we can build a great robot all the way to the end."

The core of the first two to three years may instead be closer to integrating with the hospital environment, recording surgical data, connecting it to education and research workflows, and creating software-like value from that data. Each hospital has its own IT environment and regulatory constraints, and there are limits on data movement. So it is essential to design a structure that works on top of data without moving it out.

With that framing, the company story changes.

"We are building a hardware and robotics company that will take a long time" and "we are starting from a surgical data layer that protects hospital data sovereignty" are completely different stories built on top of the same technology.

The former can look like a company that needs a lot of research money and time. The latter can look like a company that can create early revenue and an adoption path.

Of course, both have to be true. But in a seed round, the company has to be clear about what it will prove first. Investors do not look only at the long vision. They look at what milestones can be reached before the next round.

![An on-premise hospital server room connected to a surgical data monitor cart](/articles/meetup-3/yechan/03-on-prem-data-layer.png)

*The key is a structure that enables standardization, interpretation, and learning inside the hospital without moving the data outside.*

## Valuation is not a number. It is the difficulty of the next round

When an early founder thinks about valuation, the first instinct is simple.

If you can raise the same amount of money, isn't a higher valuation better? If you receive the same capital while diluting less ownership, isn't that obviously better?

In reality, it is not that simple.

The first valuation is not just today's price. It is also the bar the company has to clear in the next round. A valuation that is too low can clearly be bad for the founder. But a valuation that is too high can raise expectations before the company has created enough proof. Then the next round becomes harder. The market eventually asks, "Why is this company more expensive than it was last time?"

So the real seed valuation question is not "what number looks impressive?" It is closer to "can we justify this price by the next round?"

This question is especially important in fields like medical robotics, where progress takes time. Research, regulatory work, hospital integration, and clinical validation all require time. If the runway becomes too short, the company's energy gets pulled into fundraising instead of research. On the other hand, if expectations are set too high too early, the company keeps being asked for larger proof before it has been properly validated.

Valuation is not a founder's pride number. It is the difficulty setting for the company's next stage.

![A bright strategy table with a runway model representing financing milestones](/articles/meetup-3/yechan/04-seed-path.png)

*A seed valuation is not just today's price tag. It sets the height of the bridge the company has to cross before the next round.*

## The company needs proof that works globally, quickly

Another question was geography.

For early experiments and iteration, it is important to work in an environment where cycles can be fast. But if the long-term market is global, an approach optimized for only one region is not enough.

Saying later, "now we will go global," is different from building global validation from the beginning. In medical robotics, hospital prestige, reference sites, and KOL networks matter. So it is important to secure results that are not limited to one region and can be reproduced across different environments.

In the end, the important question is not only where to start. It is how generalizable the evidence is.

![A dark global validation network connecting multiple hospital models](/articles/meetup-3/yechan/05-global-validation.png)

*In medical robotics, evidence that can be reproduced across different environments speaks louder than success in a single hospital.*

## In a seed round, you are not selling the future. You are selling the path

After thinking through all of this, one thing became clearer.

What a founder sells in a seed round is not the giant future itself. It is the path to that future.

A path that records surgical data, preserves it safely inside hospitals, enters education and research workflows, and then expands from that data into robotic learning. A path that maintains data sovereignty while still enabling learning. A path that holds a long hardware vision, but creates adoption first through a software and data layer.

Investors ultimately judge whether that path makes sense. Founders also need to use that path to decide valuation, investors, runway, and milestones.

Operating-room data is still not structured enough. There is clearly a large opportunity in that gap. But technology alone is not enough to turn that opportunity into a company. The company also has to decide which problem to solve first, who to sell to first, and what proof to create before the next round.

The essence of the first seed round was not receiving money. It was deciding the order in which the company would prove its existence to the world.
