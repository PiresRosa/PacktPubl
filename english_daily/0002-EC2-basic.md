Been on EC2

in which we will create our first website on AWS.

So what is Amazon EC2?

Well, EC2 is one of the most popular of AWS' offering.

It is definitely used everywhere.

And what is it?

Well, it stands for Elastic Compute Cloud

and this is the way to do Infrastructure as a Service

on AWS.

So EC2 is not just one service.

It's composed of many things at a high level.

So you can rent virtual machines on EC2,

they're called EC2 instances.

You can store data on virtual drives or EBS volumes.

You can distribute load across machines,

Elastic Load Balancer.

You can scale services using an auto-scaling group or ASG,

and all these things, do not worry,

we will see in depth during this course.

Knowing how to use EC2 in AWS is fundamental

to understand how the cloud works.

Because as I said from before,

the cloud is to be able to rent these compute

whenever you need, on demand, and EC2 is just that.

So, EC2, what can we choose for our instances

so there're virtual server that were rent from AWS?

So what Operating System can we choose

for our EC2 instances?

Three options:

Linux, and it's going to be the most popular,

Windows or even Mac OS.

How much compute power and cores you want

on this virtual machine?

So how much CPU?

Then you need to choose how much random access memory

or RAM you want,

and how much storage space.

So for example,

do you want storage that is going to be attached

through the network

and we'll see about it with EBS or EFS,

or do you want it to be hardware attached?

In this case, it will be an EC2 instance store.

And we have a whole section on storage,

so don't worry about it.

And then finally,

the type of network you want to attach to your EC2 instance.

So, do you want a network card that is going to be fast?

What kind of public IP do you want?

And finally, we need to handle the firewall rules

of our EC2 instance, and that is the security group.

And I live, finally, finally,

there's the Bootstrap script to configure the instance

at first launch, which is called the EC2 User Data.

So we have lots and lots of options

and as you'll see in the hands-on,

even more options at other certification levels

that you need to know in EC2 instances,

but at a core of it what you need to remember is that

you can choose pretty much how you want your visual machine

to be and you can rent it from AWS.

And that is the power of the cloud.

You can do this by just in the blink of the eye, really.

So it is possible to bootstrap our instances

using the EC2 User Data script.

So what does bootstrapping mean?

Well, bootstrapping means launching commands when

the machine starts.

So, that script is only run once and when it first starts,

and then will never be run again.

So the EC2 User Data has a very specific purpose.

It is to automate boot tasks, hence the name bootstrapping.

So what tasks do you want to automate?

Usually, when you boot your instance

while you want to install updates, install software,

download common files from the Internet,

or anything you can think of really,

anything you can think of.

So it could be whatever you want,

but just know that

the more you add into your User Data script,

the more your instant has to do at boot time.

Simple, right?

By the way,

the EC2 User Data scripts runs with a root user.

So any command you have will have the pseudo rights.

Okay?

What type of instances do we get for EC2?

And this is an example.

I have hundreds and hundreds of EC2 instance types,

but, here are five for you.

So the first one is a t2 micro, very very simple.

It has one vCPU, one gigabyte of memory.

The storage is only for EBS,

and it has a low to moderate network performance.

But as soon as you increase the instance type

like for example if you stay in the same family,

so we stay in the t2 family but we go to t2.xlarge,

now we have access to four vCPU

16 megabytes of RAM,

gigabytes of RAM, sorry,

and network performance of moderate.

If we go to complete different new levels,

so c5d.4xlarge, which is a very complicated name,

you get 16 vCPU, so 16 cores,

you get 32 gigabytes of memory, so a lot more,

you get some storage that is attached to your EC2 instance,

this is where it says 400 NVMe SSD.

Now the network is going to get really good

up to 10 gigabytes,

as well as the bandwidth to talk to network storage.

And so, as you can see,

if you go to r5.16xlarge or m5.8xlarge,

again you have different characteristics.

So, the idea with this is that

you choose the kind of instance that fits best

your application,

and you can use that on the cloud on demand.

Okay?

Now, for this instance, for our course,

t2 micro is going to be part of the AWS free tier.

You can get up to 750 hours per month of t2 micro

which represents basically running that instance

continuously for a month.

And so this is what we'll be using in the hands-on

that comes in the next lecture.

So this was a short introduction to EC2.

Don't worry, it's going to get very very practical

very soon.

I will see you in the next lecture.