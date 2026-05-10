It's hard to talk about AI these days without talking about semiconductors and chips. NVIDIA GPU, Google TPU, HBM, CUDA — these terms have moved past industry jargon into the everyday vocabulary of anyone trying to keep up with AI even a little.

But why those names actually matter, what counts as a genuinely "good chip," and where exactly the bottleneck in today's AI systems sits — that's surprisingly hard to grasp intuitively. Most of us only see the model's performance or the service's output. Yet AI's real competitive edge is increasingly decided not by the model itself, but by how that model can actually be run in the real world.

The key to understanding AI chips, in my view, isn't memorizing product names. It's developing a sense for the axes you should be looking along. Three of them, broadly:

Compute, memory bandwidth, memory size.

Once you start looking at all three together, the picture starts to connect. You can see why a particular chip is overwhelmingly expensive, why a particular component goes into shortage, and why memory companies are moving into the center of the AI era — all in one frame.

## Compute performance: TFLOPS, TOPS

The first thing that comes up in any chip conversation is usually a number like TFLOPS or TOPS.

These are metrics for how many operations per second a chip can execute. If we compare it to a human studying and working in a library, this is the number that tells you how quickly they can read books and write. They matter, of course. AI models ultimately run on enormous amounts of numerical computation.

But in real AI systems, high compute alone doesn't translate directly into performance. The reason is simple: even the fastest chip has to wait if the data to compute on doesn't arrive in time.

An AI model takes inputs, reads weights, stores intermediate results, and passes them on to the next operation — endlessly. In that flow, the actual bottleneck is often data movement, not compute. So when you look at AI chips, memory bandwidth becomes as important as compute — sometimes more so.

## Memory bandwidth: GB/sec

If we keep the same human analogy, this is the number that tells you how quickly and how much you can bring books from the stacks. The current bottleneck in AI silicon is closer to this memory bandwidth. Look briefly into LLM inference and this sense becomes obvious.

People often think, "if the GPU is fast, isn't that the whole story?" But in practice, "how fast can you pull the data you need into the compute units" matters far more than "how much can you compute" much of the time.

The compute units are powerful, but if memory can't push data through fast enough, the chip can't deliver its full performance. This isn't just about processor performance — it's about how well the calculator, the storage, and the logistics system between them are interlocked.

This is where HBM's importance naturally surfaces.

HBM is high-bandwidth memory, and it directly attacks the part that's most often the bottleneck in today's AI systems. The point isn't to make compute units stronger; it's to feed them fast enough that they don't go hungry. That's also why SK Hynix and Samsung are gaining presence. In the AI era, "who makes the better chip" is no longer the only thing that matters — "who can move data faster" has become central.

## Memory / VRAM size: GB

Memory size matters as much as memory bandwidth. In the human analogy, it is the total number of books available in the library.

We tend to take model sizes — 7B, 70B — as abstract numbers. But from a chip's point of view, those are very physical numbers. A larger model means more weights to store and load, and those weights have to sit on memory before any computation can happen.

In other words, if memory is short, even the most powerful compute can't run a large model properly. So the AI chip race isn't only "who's faster" — it's also "who can host and run larger models more reliably and more efficiently."

This subtly but decisively changes how you look at AI.

We keep thinking of AI as a software problem. Better models, better algorithms, better prompts. Fair enough. But real AI systems run thoroughly on hardware. They have to fit in memory. The bandwidth has to hold up. The power and heat have to be manageable. AI is, in the end, not abstract intelligence — it's a computing system running on physical resources.

## The moment you chain multiple GPUs, the problem becomes a system

This becomes even sharper the moment you connect multiple GPUs.

To train or serve a large model, one GPU isn't enough. So you split the model across multiple cards, parallelize the compute, and shuttle intermediate results back and forth. The important thing here isn't just that GPU count goes up. For multiple GPUs to work together, the data flowing between them also has to move at enormous speed.

So the more GPUs you connect, the more the inter-chip communication structure starts to matter more than each chip's individual performance. Each chip can be strong, but if they exchange results slowly, the whole system fails to capture the gains of parallelism. Looking at AI infrastructure, then, isn't really about picking one good GPU — it's closer to figuring out where the bottleneck shows up across the whole system.

Understanding AI hardware doesn't end at "what is a good chip?" The more important question is "what is a good system?"

## NVIDIA's real moat isn't explained by hardware alone

In this light, NVIDIA's lead also looks a little different.

NVIDIA's strength is often described in terms of raw chip performance. In reality, the deeper and wider moat is the software ecosystem built around CUDA.

Other companies can build good chips. They can build them cheaper. They can hit higher efficiency on specific workloads. But for people to actually move to those chips, the frameworks, kernels, optimization code, and operational experience that run on top of them have to come along too. Today's AI industry has too much of its stack built on CUDA. Better benchmark numbers alone don't move the ecosystem.

This is a critical point. The AI chip market isn't a hardware race; it's a hardware-and-software ecosystem race. Building a good chip and getting people to actually develop and operate on top of it are completely different problems on completely different difficulty curves. NVIDIA's dominance sits on top of that gap.

## Long-term, the bigger game is probably inference

That said, I don't think the future will permanently consolidate around a single general-purpose GPU.

Quite the opposite — long-term, AI's center of gravity is likely to shift further toward inference rather than training.

Training is a heavy, episodic event. Inference, as a service grows, runs every day, continuously, at overwhelming scale. At that point what matters isn't "what's most general-purpose" — it's "what produces tokens most cheaply."

In that environment, a purpose-built chip designed for a specific inference workload may be a stronger choice than a general-purpose GPU that handles both training and inference. That's why Google's TPU is meaningful, and why several companies are seriously considering custom silicon. At sufficient scale, performance competition becomes cost-structure competition, and cost-structure competition turns around and reshapes chip design itself.

There's a sober reality to keep in mind here too. Designing a chip and actually mass-producing one stably are completely different problems. Design lives in the realm of talent and ambition. Manufacturing lives in the realm of foundries and supply chains. That's why something like TSMC ends up at the strategic center.

## "Good chip" might not be a single thing

This isn't only a data center story.

Widen your view to on-device AI, edge AI, and robotics, and the definition of "good chip" shifts again. In those areas, absolute peak performance matters less than power efficiency, memory architecture, and integration with the device.

That's why something like Apple Silicon is interesting. From a different direction than data center GPUs, it's been optimized to a high degree of polish for the actual user environment. The future of chips, then, is likely less "one winner takes all areas" and more "the optimum changes depending on what computation is run where."

That's why competition around AI chips is getting more complicated. The important thing now isn't to pick the single fastest chip — it's to understand which bottlenecks exist for which use cases.
