![A purpose-built military logistics robot handling shells in a bright test bay](/articles/meetup-3/taekyu/01-purpose-built-logistics.png)

*For work that repeatedly handles heavy payloads, the right answer may start with a body designed for the task rather than a body shaped like a person.*

Imagine a robot that has to keep moving 40kg artillery shells.

That is hard for people. The work is repetitive, heavy, and easy to get injured doing. The military has fewer people to spare, but it still has to maintain equipment and firepower. So it is natural to think of robots. Why not let a robot take over the carrying work people used to do?

But then a question appears.

Should that robot be humanoid? Or should it be a strange-looking machine specialized for moving shells?

If you look at the robotics market today, everyone talks about general humanoids. Robots that look like people, walk like people, use arms and hands like people, and may eventually do every job people do. The demo videos look impressive. The investor story is easy to understand. "A robot does the work people do" is a powerful sentence.

But do we really need a general humanoid just to move a 40kg shell?

More broadly, what does modern industry actually need: general humanoid robots, or task-specific robots?

## Everyone talks about general, but the field is still specific

The promise of general humanoids is attractive.

The world is designed around humans. Door handles, stairs, factory lines, tools, shelves, vehicles, warehouses. If a robot shaped like a person can enter human spaces and replace human labor as-is, a huge market opens without rebuilding the environment.

But that promise has a major assumption.

The robot actually has to be general. Whatever you ask it to do, it needs to be at least 80 percent good. It has to walk, lift, see, judge, recover from failures, and stay safe in unexpected situations. Many humanoids in the market today feel less like they are already general and more like they want to become general.

The problems in the field, by contrast, are usually specific.

Move shells. Weld. Assemble parts in a particular process. Manipulate a specific instrument in an operating room. Move objects repeatedly in a warehouse. From a company customer's point of view, the first thing they want is not "a robot that can do everything somewhat well." They want "a robot that reliably solves the exact job I am struggling with now."

From an engineering perspective, a task-specific robot often looks easier. You can reduce degrees of freedom, constrain the environment, and design payload and endurance around the task. And yet the market language keeps leaning toward general humanoids.

Why?

![A humanoid robot and a task-specific transport robot sharing the same industrial workspace](/articles/meetup-3/taekyu/02-general-vs-specific.png)

*The promise of general humanoids is attractive, but real field problems usually come with much more specific physical requirements.*

## Specific markets are real, but they can look awkwardly small

A problem like moving shells is not small.

It is a job used across the military, it is directly connected to manpower reduction, and if it is solved well it could expand into other military logistics. It is much larger than a custom robot for one factory. But from the perspective of a large defense contractor, it may still not look attractive enough. They already sell major products like K9 self-propelled howitzers, and they may have little reason to spend years and heavy R&D money on a robot business with a smaller commercial profile.

For a startup, on the other hand, this can be a large enough market.

But from the military or a large customer's point of view, choosing a startup is difficult. This kind of equipment is not software you use for one or two years and throw away. It has to be maintained for 10 or 20 years. The supplier cannot disappear. The equipment cannot fail in the field. Someone has to take responsibility for safety. Even if a small startup has the technically better answer, the procurement risk felt by the customer is large.

So an odd gap appears.

The market is small and annoying for large companies, but large and trust-heavy for small companies. Because of this gap, the specific robots that are actually needed may not appear. The problem becomes less about engineering and more about incentives.

![A specialized robot prototype sitting in the middle of a bright procurement test environment](/articles/meetup-3/taekyu/03-procurement-gap.png)

*Task-specific robot markets can fall into an awkward gap: too small for large companies, too risky for small ones.*

## What special-purpose vehicles reveal

The analogy of special-purpose vehicles is useful here.

Think about ambulances or refrigerated trucks. A single company does not build an ambulance or refrigerated truck from scratch end to end. Hyundai, Kia, or another automaker makes a good van or truck platform, and specialized conversion companies adapt it for a particular purpose. Because the general vehicle platform is mature enough, task-specific vehicles can reach the market through conversion companies with lower technical depth than the original platform maker.

Could something similar happen with humanoids?

Will a general humanoid platform become mature first, and then many companies customize it into military, construction, medical, and factory robots? Or will robots that solve specific tasks arrive first, with those accumulated solutions later leading toward generality?

There is no easy answer.

If a humanoid platform becomes as stable as a vehicle platform, the general-to-specific path is natural. You buy the base body, then change the hands, tools, software, or payload system for a specific task. But if the general humanoid platform itself is not yet stable enough, you cannot build a conversion industry on top of it.

Right now we are probably somewhere in between.

The promise of general humanoids is large, but the platform is early. At the same time, building every task-specific robot completely from scratch is inefficient. The important question becomes: how much needs to be general, and where should the specific design begin?

![A robotics integration workshop showing one platform extended through multiple task modules](/articles/meetup-3/taekyu/04-modular-platform.png)

*Once a platform is mature enough, many task-specific systems can be built on top of it.*

## Can robotics copy the LLM playbook?

Many people now see robotics as the next frontier after LLMs.

In LLMs, the general model proved extremely powerful. Instead of building a small model for every specific task, a larger foundation model could cover many niche solutions at once. So people naturally imagine the same pattern in robotics. If a larger robot foundation model appears, will task-specific robots and vertical software all be absorbed into the general model?

But robots are different from language.

Language is copied, trained, and evaluated inside digital space. Robots fight the physical world of F=ma. Motors, reducers, batteries, heat, materials, payload, balance, safety, and maintenance all become hard constraints. The data is much more expensive too. When a robot fails, it does not merely produce nonsense. Things can break, and people can get hurt.

That is why the LLM pattern of "a larger general model eats specific solutions" cannot be applied directly to robotics.

Software is important, of course. As in autonomous driving, when a robot's reliability and recovery improve, the range of usable applications can expand nonlinearly. But the body that software runs on still has physical limits.

In robotics, generality is not only a limit of intelligence. It is a limit of the body.

![A robot, motors, batteries, and drivetrain components placed in front of a payload test rig](/articles/meetup-3/taekyu/05-physical-constraints.png)

*In robotics, generality is not just about model size. It is about motors, reducers, batteries, heat, and safety.*

## The real criteria are market size, risk, endurance, and procurement

If you ask philosophically whether robots should be general or specific, there is no answer.

A better question is this: in which tasks will specific robots win, and in which tasks will general humanoids win?

Several criteria matter.

First, how special are the physical requirements of the task? If the requirements are strong, such as 40kg payload, repetitive transport, heat dissipation, or balance, the advantage of a specific design grows.

Second, how large is the market? If the market is too small, it is hard to build a custom robot. But if the vertical is large enough, such as military, construction, or large-scale manufacturing, a specific robot can become a company.

Third, how high is the cost of failure? In areas like medicine, the military, and heavy equipment, where safety and liability matter, adoption is slow and procurement is conservative. Here, "can keep responsibility for a long time" matters as much as "works well."

Fourth, how desperate is the customer? If people are scarce, the work is dangerous, and the cost of the old method keeps rising, customers are more likely to adopt new technology. If the current process is uncomfortable but tolerable, they will not take the risk.

Fifth, how mature is the platform? If a general humanoid platform becomes cheap and stable enough, specific applications can be built on top of it. If not, building a specific system first may be more realistic.

Through this lens, there is no single answer. Some domains will be taken by general humanoids, and some will be taken by task-specific robots. Household work, which is varied but relatively low-payload, may favor a general platform. Medical, military, and heavy industrial work, where the requirements are sharper, may leave room for specific solutions for a long time.

## The real problem may be structure, not technology

The most frustrating point is this.

This is not an engineering problem. It is a structural problem.

Capable and self-directed people tend to join small organizations like startups rather than heavy large organizations.

So technical innovation often happens in lighter, more flexible small organizations, not in slow large ones.

But to survive and raise money, small organizations need to show continuous steep growth. In that process, they end up overusing early promises like general humanoids.

In the end, capable people may be pushed away from solving the engineering problems the industry truly needs, and toward producing exciting demo videos that can open investor wallets.

The real next level of robotics may not begin with the organization that makes more provocative shorts. It may begin with the organization that solves an engineering problem actually worth solving.
