---
title: "Agent embedded software"
created: "2026-11-14"
heroImage: "/images/agent-embeded-software.png"
heroImageAlt: "Painting of a sloth resting on a tree branch among green leaves, staring blankly ahead"
---

I was recently fascinated by Geoff Huntleys and Krzysztof Cieślaks 
[idea](https://x.com/k_cieslak/status/2107128392172896484?a=QipCN_M-wbILFMFj-X8&s=20)
of having an agent emeded in your software. No need for a terminal
or a bespoke client, it's there in the software you're 
already using, just waiting for you to request changes.

The demos that Geoff and Krzysztof showcase are cool but they only really work
if it's you personal software you're working on, or you have tremendiously
patient users who don't mind the software they're using chaning under them.
But the feeling of making requests in a chatbox and seeing the change before your 
eyes is magical, there's definetly something there.

After being inspired, I, ofcourse did what anyone in 2026 does, I pointed Opus 5.5
at the tweets and told it to recreate it. 10 mins later I could play with my very
own todo app that an agent changes on the fly right there in the GUI. I thought 
it was cool for like a second and then got back to work, forgetting about it.

It did spark something in me though. How cool would it be if instead of a 
coworker telling me what changes they want they could just request them in a chatbox,
see them, make sure they are how they want them and then, open a PR for me to reivew. 

I built exactly that

When an authenticated user is using the app
and they notice something they want changed, they open a chatbox, explain what
they want and press "request changes". The system then generates a preview for
them and gives them a link. The preview will shortly contain the changes they 
requested, they can then go back and forth until they are satisfied with the result.
Once they are done they press the "create a PR" button and the developers take 
it from there. 

![Demo video](/videos/recursive-todo-demo.mp4)

It's pretty fun to play arround with and it never gets old seeing the app change
beneath you. I think this could be a good pattern to foster richer communication 
between developers and other staff.

Link to the repo [recursive-todo-app](https://github.com/oskarcokl/recursive-todo-app)
