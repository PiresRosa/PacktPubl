# Adding a work trial to your interview process
> https://www.lennysnewsletter.com/p/adding-a-work-trial-to-your-interview

Indeed they have. Karri Saarinen (CEO of Linear) mentioned they run candidates through work trials, as did Jason Fried (co-founder and CEO of 37signals). When I asked folks on Twitter who else they’ve seen do a great job with work trials, I learned that trials have also been a longtime practice at Automattic, Gumroad, Auth0 (now part of Okta), PostHog, and a number of other companies. Work trials aren’t a new concept, but they do seem to be trending.


To get you an answer, I interviewed the founders of the six companies most known for work trials, and from their collective wisdom put together a guide for building your own work trial process:

What exactly is a “work trial”?

Why do work trials?

What are examples of good trial projects?

How do they fit into the overall interview process?

Should you pay candidates, and, if so, how much?

How do you evaluate a candidate’s performance?

How do you convince people to invest this much time in an interview?

Lessons for implementing your work trial

A big thank-you to Matt Mullenweg (Automattic), Jason Fried (37signals), Karri Saarinen and Cristina Cordova (Linear), Sahil Lavingia (Gumroad), James Hawkins (PostHog), and Matias Woloski (Auth0/Okta) for their insights and advice 🙏

What exactly is a “work trial”?
A work trial refers to a step in the interview process where candidates are asked to complete a project that’s representative of the work they’ll be doing in the role. The “representativeness” falls on a spectrum, from doing an in-depth project at home (e.g. 37signals) to co-working with existing employees in the real codebase building something the company will ship (e.g. Linear).

Where you fall on the spectrum of how close to reality your work trial should be is directly correlated with the size of your company. The fewer people you’re hiring (and thus the more important each hire is), the more time you should be investing in a work trial. As you grow, you can streamline the process.

Why do a work trial?
Simple: it gives you significantly more signal on the candidate.

As James Hawkins (co-founder and CEO of PostHog) shared, “It makes it obvious who to hire. It is frequently surprising how someone performs relative to what we thought in the interviews about their skills.”

Linear found that the only way they could know if the candidate was a fit for their unique culture was by co-working with them:

“The majority of companies don’t work in the way we do, which leads to fewer people with these kinds of skills. A conventional interview process, often modeled by large companies, doesn’t account for this. It’s challenging to assess in interviews if someone is truly a builder, has good taste and judgment, can take initiative, and approaches problems productively.” —Karri Saarinen, Linear

This is the same conclusion Automattic eventually came to:

“The more we thought about why some hires succeeded and some didn’t, the more we recognized that there is no substitute for working alongside someone in the trenches.

We recognized we were being influenced by aspects of an interview—such as someone’s manner of speaking or behavior in a restaurant—that have no bearing on how a candidate will actually perform. Some people are amazing interviewees and charm everyone they talk to. But if the job isn’t going to involve charming others, their interview skills don’t predict how well they’ll do as employees. Just like work, interviews can be ‘performed’ without real productivity. So we gradually changed our approach.” —Matt Mullenweg, founder and CEO

Work trials not only help you better gauge the candidate’s skill set, they also help you understand how much the candidate wants to work at your company, as Matias, Sahil, and Matt pointed out:

“It did mean that we might miss out on some people who couldn’t make the time for it, but because at a startup, commitment—and wanting it—is very important, it was a good filter.” —Matias Woloski, co-founder and CTO of Auth0

“The trial is about their work. But it’s also about them seeing all the internals of the company, culture, finances, my attitude, etc.” —Sahil Lavingia, founder and CEO of Gumroad

“It’s a two-way street. It allows us to be as confident as possible in making a decision and enables the person interviewing to do the same thing.” —Matt Mullenweg, founder and CEO of Automattic

What are examples of good trial projects?
Karri Saarinen best summarized the recurring lesson across my interviews:

“The goal with the work trial is to simulate a normal working environment as much as possible.”

Gumroad wins for taking this idea furthest by hiring the candidates as contractors for 4 to 6 weeks. As Sahil Lavingia put it, “It’s so very hard a priori to know if someone can do the job. So we just pay them to do it!”

Throughout the year, the Gumroad team marks certain tasks on their roadmap as “good for trialers” and then they assign these tasks to interview candidates. “Generally,” Sahil said, “they ship a lot of small bug fixes and stuff. For example, we have a current trialer working on adding wishlists to Gumroad, which is a pretty big feature. Shan recently passed with flying colors, and here’s an update to give a sense of the work trialers do”:


As part of this trial, Gumroad gives candidates access to their internal tools, including their local GitHub, Figma, Notion, Slack, etc.

“Another way to look at work trials is, you’re hired by default but will likely be fired in 30 to 60 days if you don’t perform like the rest of the team by the end of that time limit.” —Sahil Lavingia

Linear comes in a close second in terms of realism by having candidates co-work with their future team for 3 to 5 days, in the actual codebase, also with access to the company’s GitHub, Figma, Slack, and Notion accounts.

“We assemble a supporting project team, including a recruiter, the hiring manager, and 3 to 5 teammates who would closely intersect with this role once they’re hired.

Our recruiter and people operations coordinator handle necessary logistics pre-trial, like securing a non-disclosure agreement, granting temporary tool access, scheduling meetings, and prepping docs conveying context on goals and expectations.

Work trial projects sometimes end up being the first project for the new hire when they get started.” —Karri Saarinen

Examples of projects Linear gives candidates:

For an engineer, building a feature allowing teams to effectively triage incoming feature requests

For a content marketer, writing a blog post based on a feature release (which they shipped part 2 of to production recently after the candidate was hired)

For a designer, designing a way to resolve comments:


Linear’s actual prompt for past designer candidates
Automattic, Auth0, and PostHog used to operate like Linear and Gumroad, bringing the candidate on part-time to work alongside existing employees for some number of days, but as they’ve grown, they’ve tweaked their trial process to be more time-efficient and standardized.

“Our work trial task will be representative of the day-to-day work someone in the role at PostHog does, but it isn’t actual work we’d use or ship. It used to be actual work. We changed it to representative work because:

Actual work comes with tricky implications around things like IP ownership, needing to hire them as contractors, etc.

The codebase is now way too big and complex for this to be practical.

Tasks are generally designed to be too much work for one person to complete in a day, in order to get a sense of the candidate’s ability to prioritize, and they’re open-ended as per above.”

—James Hawkins, CEO

Here’s an example project PostHog assigned a recent PM candidate, which they complete at home and then present to the hiring team:


At Automattic, they also used to give candidates access to the actual codebase, but as Matt Mullenweg told me, “it lacked consistency and was hard to scale. These days, for more generic engineering roles, we set up a separate repository with an already forked, smaller project, which is better controlled in terms of candidate experience, code, tasks, and access.

The project scope also varies, but it will be as close to the actual work as possible. If you’re an engineer, you’ll be writing real code. If you’re a designer, you’ll design.

In some cases, there’s a real-world project they’ll work on. However, in many cases, folks will work on a ‘synthetic’ project that simulates the work they’ll do very closely without waiting for a suitable project to come up.

Several people are usually involved in the process. There’s always a Lead who is the main point of contact for the candidate. The others involved are the folks the candidate would interact with most. This could be anywhere from two to six people (or more), depending on the role. For more interactive roles, such as Sales or positions where folks will be presenting internally, the trial project may include a final presentation. Mostly, however, the work is done asynchronously.

Folks are also set up on Slack and P2 (our internal communication tool) so they can get used to the tools we use, communicate how they need to, and have access to all the information they need.”

Here’s a blog post snippet from an engineering candidate who went through the Automattic work trial:


Auth0 used to do an in-depth take-home exercise, as Matias Woloski (co-founder and CTO) shared:

“The project was typically from a real-world situation we faced and solved in the past. This allowed us to know the ins and outs of the problem, which is useful when assessing and guiding candidates.

We’d reuse the same exercise across all levels and adjust expectations. For positions we didn’t hire for often (e.g. Director of Infrastructure), we’d make up the exercise when a few candidates reached that stage in the pipeline.”

Here’s an example project prompt for an engineering role at Auth0 (high-res copy here):


However, a couple of years ago, after being acquired by Okta, Auth0 moved away from these projects in favor of shorter exercises, fully knowing they would get less signal on candidates: