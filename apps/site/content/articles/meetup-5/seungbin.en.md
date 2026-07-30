![A multi-fingered robotic hand rotating a sphere while finding contact points](/articles/meetup-5/seungbin/01-cover-contact.png)

*In contact-rich control, before deciding how much force to apply, a robot must first find when and where to make contact.*

When we think about robot control, the first things that usually come to mind are motors, sensors, and algorithms.

What torque should we apply? What observations should we use? What policy or controller should we run? All of these are important questions. But once a robot starts doing work in the physical world, a more fundamental question appears.

When should the robot touch the world?

A walking robot has to plant its feet on the ground. A robotic hand rolling a ball has to press the object at some point. A robot rotating a box or pushing a chair ultimately transfers force through contact. For a robot, doing almost anything in the physical world means touching it somehow.

The problem is that contact is not a simple event.

Dynamics change at the moment of contact. When two bodies are separated, the robot cannot exert force on the object. When they touch, the robot and object affect each other. So before asking “how should the robot apply force?” we have to ask “when and where should it make contact?”

I am currently researching contact-implicit trajectory optimization. The idea is not to prescribe contact in advance, but to let the optimization problem find the contact sequence and timing together.

The central question is simple.

Can an optimizer discover contact on its own, without a person specifying every instruction: “touch here, release here, then push again here”?

## Contact Turns It into a Different Problem

When a robot is separated from an object, the two move almost independently. The moment they touch, contact forces appear and their dynamics become coupled.

The no-contact state and contact state are not two smoothly connected points on the same continuum. They are different dynamics modes. Systems like this are usually described as having hybrid dynamics.

Optimization does not handle this kind of switching particularly well.

Trajectory optimization usually relies on gradient information. Contact breaks that structure. While the robot is separated from the object, the dynamics do not clearly communicate that “moving a little farther would let you push it.” At the moment of contact, the constraints change and the function becomes non-smooth.

A useful contact may be only a small movement away, but if nothing changes locally, the optimizer can simply stop where it is.

![A robotic gripper and object under different dynamics modes before and after contact](/articles/meetup-5/seungbin/02-hybrid-dynamics.png)

*Different dynamics modes govern the system before and after contact.*

## In Legged Robots, People Could Set the Sequence

Traditional model-based locomotion controllers can work around this problem to some extent. For a quadruped, people can define relatively intuitive foot-contact patterns such as a walk, trot, or bounding gait. The controller then searches for a trajectory on top of that predefined contact sequence.

Dexterous manipulation is different.

When several fingers rotate an object, it is difficult for a person to prescribe which finger should press where, when it should push, when it should detach, and when it should make contact again. The available contact strategy changes with the shape of the object, hand morphology, friction, and target orientation.

That naturally leads to a question: can optimization find the contact sequence instead?

## Handing the Hard Decision to the Optimizer

Contact-implicit trajectory optimization is an attempt to do exactly that.

A conventional method solves the problem after declaring, “this contact exists at this time.” A contact-implicit method does not fix the contact mode in advance. Instead, it places contact forces and contact constraints inside the trajectory optimization problem. The optimizer then searches not only for a trajectory, but also for when to create and break contact.

The idea is attractive. A person no longer has to design every contact mode in advance. If it works, the robot discovers the moments when it needs to transfer force to the object.

But hard contact makes the optimization problem extremely difficult.

Contact is expressed with a complementarity condition. If the gap between two bodies is positive, the contact force must be zero. If a positive normal contact force exists, the gap must be zero.

That is physically natural but inconvenient for optimization. Constraints and dynamics change at contact, the optimization landscape becomes non-smooth, and the gradient may stop providing useful directional information.

This makes the central technical question in contact-implicit optimization: how can we make contact optimization-friendly?

## Relaxation Opens a Path, but It Is Not Complete

One approach is relaxation.

We loosen the hard contact condition so the optimizer can move between different contact modes. A boundary that was originally disconnected becomes smoother, producing more useful gradients.

Intuitively, it is like replacing a steep cliff with a gradual slope. The optimizer can more easily determine which direction to move.

But relaxation does not eliminate the problem.

The optimization problem is still non-convex. Even with a useful gradient, there is no guarantee that the optimizer will find the desired contact sequence. It may settle into a different local solution depending on the initial guess.

Relaxation also creates a tradeoff. If the condition is too loose, the solution can diverge from hard-contact physics—for example, producing contact force before the bodies actually touch. If we reduce the relaxation, the result becomes more physically accurate, but the optimization becomes difficult again.

Using the method as a controller also requires solving the optimization quickly and reliably at every step. The burden increases as the number of contact candidates grows and the horizon gets longer.

Relaxation therefore opens a path toward solving contact-implicit optimization. It does not automatically guarantee a good solution or robust control.

![Relaxation turning a discontinuous contact landscape into a smooth path](/articles/meetup-5/seungbin/03-relaxation-landscape.png)

*Relaxation smooths a broken contact landscape and gives the gradient a path to follow.*

## The More Realistic Use Case I See Is Motion Retargeting

Motion retargeting means adapting a motion produced by one body to another. Transferring human motion-capture data to a humanoid, or adapting manipulation from one robotic hand to another hand or gripper, are both examples.

Contact remains a problem here. When body morphologies differ, directly transferring a motion can make a foot pass through the ground. A hand may move through empty space without touching the object, or the interaction present in the source motion may disappear.

Object-interaction datasets make this harder. They may not include contact information, and even if they do, the original contact labels may no longer be valid for a robot with different morphology.

This is where contact-implicit optimization may help.

We can provide the target motion or object orientation without enforcing the original contact labels. The optimizer instead searches for physically feasible contact again within the new morphology. It resolves the goal of the motion through a different robot body.

Motion retargeting also has one important advantage: a source motion already exists. After roughly mapping it to the target robot, that trajectory can serve as a warm start. Rather than discovering the entire motion from scratch, the optimizer can focus on repairing contacts and trajectories that broke during transfer.

A large morphology gap means the source motion still does not guarantee a good solution. But it is a much better starting point than searching for a contact-rich motion with no initial guess.

![Retargeting a human hand motion to a differently shaped robotic hand while rediscovering contact](/articles/meetup-5/seungbin/04-motion-retargeting.png)

*Even with a source motion as a warm start, the physical contact must be found again for the new robot morphology.*

From this perspective, contact-implicit trajectory optimization can be valuable even if it never becomes a general-purpose controller. It can serve as a planning or retargeting tool that narrows the gap between data and robot morphology.

Contact-implicit trajectory optimization is not a universal solution yet. But it points toward a direction in which contact is discovered inside the optimization problem rather than entirely designed in advance.

As robots gain more complex bodies and manipulate more complex objects, it will not be enough for people to specify every answer to “when and where should the robot touch?”

Contact-rich motion is not complete just because the robot can generate force. It also has to find the moment when it should touch the world.

That may be the next hard problem in contact-rich control: enabling robots to discover for themselves how to make contact with the world.
