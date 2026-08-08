![A sensory science lab where the chemical signals in coffee aroma become data an AI can read](/articles/meetup-5/terry/01-cover-chemical-sense.png)

*Digitizing smell and taste means turning invisible chemical signals into data a model can read.*

AI can now see, listen, and speak remarkably well.

Images arrive as pixels, sound as waveforms, and language as tokens. Models identify objects in photographs, transcribe speech, and reason through natural language.

But living organisms do not survive through sight and hearing alone.

When deciding whether something is safe to eat, better avoided, familiar, or dangerous, organisms read chemical signals. Sweetness was a clue for energy; bitterness was a clue for toxicity. Taste and smell are not merely matters of preference. They are ancient senses for reading the chemical state of the world.

Consider a good cup of coffee. People can quickly tell whether it tastes brighter than usual, leaves a bitter finish, or carries a lighter aroma. Yet the moment we try to record those differences as data, compare them across people, and make them legible to a model, the problem becomes difficult. One person says floral, another says fruity, and someone else simply says sour.

If AI is to approach general intelligence that interacts with the physical world as humans do, is seeing and hearing enough? Or does it also need to read the senses that remain largely absent from AI—taste and smell?

I do not think taste and smell are the only missing pieces of AGI. But they are important missing sensory pieces. AI needs to smell not only to make better perfume or better-tasting drinks, but because an entire chemical world remains beyond its reach.

## Intelligence Turns Sensation into Action

In the simplest terms, intelligence can be understood as the ability to turn sensory input into action.

Living organisms see, hear, touch, taste, and smell, then act on those inputs. From an evolutionary perspective, intelligence begins less with abstract puzzle-solving than with converting signals from the environment into behaviors necessary for survival.

Today's AI is already strong in some of these senses. Vision has been a major research field for decades. Audio and speech have advanced rapidly, and language models are, by definition, highly capable with language.

Taste and smell, by contrast, remain relatively empty spaces.

This gap is more than an interesting niche. If general intelligence is a system that acts within the world, then that world is not made only of visible objects and verbal descriptions. It also contains airborne molecules, the chemical structures of food, and odors in the environment.

If AI cannot read that layer, its understanding of the world remains incomplete.

## Smell Is a Chemical Signal, Not Just a Preference

It is easy to think of taste and smell as subjective preferences.

We say that coffee tastes good, perfume smells pleasant, or a particular food is too bitter. Those descriptions are sufficient in everyday life, but not for a model. People use descriptors such as floral, woody, and citrus differently.

That does not mean taste and smell are purely subjective.

Their starting point is physical. There are molecules, receptors, binding events, and neural signals. The way a chemical compound interacts with taste buds or olfactory receptors forms the sensory layer. Experience and memory then attach to those signals and turn them into perception.

This is why we need to distinguish sensory input from perception.

The sensory layer concerns how an external stimulus enters the body—how strongly a molecule binds to a particular receptor, for example. Perception concerns how a person interprets that signal.

The first problem to solve is closer to the sensory layer.

Given a chemical structure, can we predict what kinds of taste or aroma it may produce, how sweet or bitter it might be, or which odor descriptors could apply? Modeling the memories and emotions that differ from one person to another comes later.

![Airborne molecules becoming a combinatorial response pattern across olfactory receptors](/articles/meetup-5/terry/02-olfactory-receptors.png)

*Smell is not a one-to-one correspondence between a molecule and a receptor. It is closer to a combinatorial pattern across many receptors.*

## Digitizing Chemical Sense Starts with Reading Molecules

Saying that AI should smell does not mean attaching a nose to a machine.

More precisely, it means digitizing chemical sense: turning the relationship between molecular structure, sensory response, and human descriptors into representations a model can read.

Color has standardized representations such as RGB and Pantone. Taste and smell need comparable representations. A model must be able to read which receptor pattern a molecule creates and how that pattern connects to a sensory descriptor.

Human smell emerges from the combinatorial responses of hundreds of receptor types. One molecule does not map neatly to one receptor. Instead, many receptors create a response pattern that resembles a barcode, which the brain interprets as an odor.

Taste follows a similar structure. We may speak of basic axes such as sweet, bitter, sour, salty, and umami, but actual flavor perception combines taste and smell. AI therefore needs more than a model that learns human words for smell and taste. It needs to learn the mapping between molecular structures and sensory outcomes.

The phrase “ChatGPT for chemicals” is intuitive, but it can also be misleading.

The core idea is to make chemical structure the model's language instead of English sentences. Molecules enter like words, while bond structures act like grammar. Just as a model learns patterns in sentences, it can learn patterns in chemical structures.

Chemistry uses string representations such as SMILES to describe molecular structure as text. A model can take these strings—or graph structures—as input and learn useful representations.

The model we need first does not necessarily have to be a decoding model like GPT. In chemical data, learning a strong embedding may be more important at the beginning. An embedding compresses a complex object into a numerical vector.

A natural starting point is classification and prediction: will this molecule taste sweet or bitter, bind to a particular receptor, or carry a certain descriptor label? Later, generative models may create new molecules conditioned on a desired taste or aroma. But meaningful generation depends on strong understanding.

![A chemical foundation model converting molecular structures into representations and sensory predictions](/articles/meetup-5/terry/03-chemical-foundation-model.png)

*The starting point for a chemical foundation model is a representation that can read molecular structure.*

## A Bigger Problem Than Better Perfume

The most direct application of these models is food and beverage development. Creating a new flavor is slow and expensive. If a model can narrow down which combinations of ingredients are likely to produce a desired flavor profile, it can shorten the R&D cycle.

Masking bitterness is another major use case. Plant-based proteins, health foods, and children's medicines can be difficult to use because of their taste. If we can predict which molecules strongly activate bitter receptors and which combinations suppress that signal, the way we design food and medicine could change.

Health and nutrition open an even more intriguing set of questions. Could something taste sufficiently sweet without sugar? Could we reduce the appeal of high-sugar food and help change eating behavior?

Perfume and personal care follow the same structure: define a desired sensation, then find a molecular combination that can produce it. Yet these applications are only the surface.

The larger significance is that AI begins to read the chemical world. The same kinds of representations could extend into pharmaceuticals, environmental monitoring, and biotechnology.

![A chemical-sensing AI analyzing food, medicine, and environmental samples in one laboratory](/articles/meetup-5/terry/04-real-world-applications.png)

*The same chemical representation can extend beyond flavor R&D into pharmaceuticals and environmental monitoring.*

## Filling the Missing Sense Requires Human Experience Data

The largest bottleneck in this field is data.

Images and text are abundant on the internet. Data describing what a person felt when smelling a particular odor, or how they described a mixture of molecules, is far scarcer.

Chemical data itself exists. The problem is the lack of sufficiently large datasets that connect chemical structures with human sensory labels. Smell and taste ultimately have to be experienced and recorded by people.

Subjectivity returns here. The same molecule can feel different to different people because of receptor genetics, prior experience, and memory.

It would therefore be an exaggeration to claim that a chemical foundation model will solve perception all at once.

A more realistic path is incremental. First, learn the relationships between molecules and receptors, and between molecules and sensory descriptors. Then add individual variation, contextual information, and emotional response.

![Research participants showing different sensory responses to the same aroma](/articles/meetup-5/terry/05-personal-perception-data.png)

*The same chemical signal can lead to different perceptions depending on receptors, memories, and experience.*

AI needs to smell not because smell alone is special.

Taste and smell represent a layer of the world that AI can barely read today. A world composed only of what is visible and what can be written down is incomplete. The environments we inhabit are full of molecules, and our bodies are constantly reading them.

When AI begins to read that layer, flavor perception becomes more than a question of coffee or perfume. It becomes part of filling a missing sense in general intelligence.
