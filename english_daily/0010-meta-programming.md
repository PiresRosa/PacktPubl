> https://dev.to/mahezer/metaprogramming-how-to-be-lazy-and-reach-high-levels-of-productivity-1lhf

# Metaprogramming - how to be lazy and reach high levels of productivity

I was recently tasked with abstracting a database into an API. The database had a lot of confusing data formatting functions which should also be abstracted in my API. Since it was a generic market system, the documentation for the database was available through a humongous Excel file explaining how each field should receive data.

Initially, I worked with the tools from my text editor to have the maximum productivity I could get, but apparently, there was no end to these database tables. Each table had around 300 fields, and I needed to create files for data formatting, payload validation and unit tests.

After a week, I was far away from finishing my first task, demotivated and my productivity was way smaller than I'd like. All I did was simply bash my head against the keyboard calling formatting functions for each field in a table the whole day, and even after a good night's rest, every day became a huge fight against falling asleep in front of the computer from boredom.

It was right on a Monday that a question popped in my mind

Why should I type all this?

I started my "new" task the same day: creating someone to type all that for me.

I used one full day and a bit over 300 lines of code, and created a script that parsed the Excel file, filtered which was the table I was trying to abstract and generated the payload validation function. Then, all I had to do was to dump the generated file inside my original project and check to see if everything was working. The entire file generation process took around 350~400ms.

I was in love with my new baby, and a week later, it was already generating every file and function that needed any heavy typing. Everyone got something out of this adventure. I had the oportunity to work on an exciting task, and the task was finished way quicker than I ever thought possible.

I know this is a very isolated metaprogramming example, but my real goal with this article is to make you question yourself if you can't fit some of that in your current task. Do you feel bored with what you need to do? Are you tired of banging your keyboard mindlessly? So create "someone" to do it for you!

The best part of being a programmer is to see the possibility of improving a situation, and to have the knowledge to actually improve it, so embrace this power!

Okay, but what about this metaprogramming?
The "meta-" prefix in this case means "reflection upon itself". Metaprogramming is the programming you do make some actual programming task easier :)

This idea came from stretching out the concepts from Tim Ferriss' book The 4-Hour Workweek. The original concept is that we should automate any task that takes us too long, and there are quite a few reasons to actually do this.

First off, speed. A computer is much, much faster to execute repetitive tasks than any human. You can leave your computer working for hours or days and it will not feel tired, bored nor slow down.

Second off, precision. A computer doesn't write typos or reads a text from the wrong place. The computer will always do what it was programmed to do. This is a double edged sword, since you'll need to know what is it that you want to do and how the computer should do it. But once you've got your code straight, you can simply execute the code and go do something else entirely.

Last but not least, fun! Making a robot that automates tasks is challenging, and it is way more fun than typing repetitive stuff forever. Not to mention that it is super fun to see your script running and fixing a problem for you (boredom) and a problem for your boss (time).

Bill Gates once said that he prefers to hire lazy people to do hard tasks because they will always find simple solutions for those problems.

So here goes a controversial advice: Be lazier!

Not in the sense of slacking at your job, or in the sense of procrastinating the things you need to do. But in the way that makes you avoid repetitive work.

The biggest value a programmer brings to the table is exactly the ability to abstract complex tasks and automate repetitive tasks, and not our typing speed. It's part of the job to find those tasks and automate them.

Have your eyes sharp for any menial tasks that pop up and eliminate them. This will free you team's time to focus on what really matters, the complex problems.

Do you have some report that takes hours to set up? Automate it.
Do you have bureaucracy that hinders your work? Automate it.
Do you have a task that pops up every single month? Automate it!

Cover image: Foto de Drew Coffman na Unsplash
This article is also available in Portuguese here
Article originally published (in portuguese) at Holyscript