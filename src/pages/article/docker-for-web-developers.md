---
title: What is Docker and why should you use it?
description: Docker looks complicated but can revolutionize your web development workflow.
hero: v1596628634/works/containers
thumbheight: 6
herotype: <span>Docker helps developers</span> <span>Docker helps teams</span> <span>Docker helps deployments</span> <span>Docker helps clients</span> <span>Docker helps you</span>
publish: 2020-08-05
tag: web, tools
layout: article.ejs
---

Docker runs applications. *That's it*.

But the term "*application*" refers to big web dependency stuff...

* **web servers:** Apache, NGINX, etc.
* **language runtimes:** Node.js, PHP, Python, Ruby, Rust etc.
* **databases:** MySQL, PostgreSQL, Oracle, MongoDB, redis, etc.
* **web applications:** Content Management Systems, ecommerce stores, forums, etc.
* and **anything else:** Elastic Search, message queues, emailers, etc.

However, Docker takes a revolutionary approach. It makes web applications simpler to manage and more robust while extending their working life&hellip;


## Installing dependencies

> Docker can install, configure, and run any software in minutes

Have you ever struggled to install a dependency such as a web server, language runtime, or database on your development machine?

How long did it take to configure? Was it easy to keep up-to-date? Did you need to retain legacy versions? Is it possible to run multiple editions of the same application at the same time, e.g. MySQL 5 and 8?

With a [single command](#quick-start-example), Docker can install, configure, and run a dependency in minutes. Stopping and relaunching an application takes seconds.


## Secure and safe development

Have you ever been concerned about those dependencies?

Could they make your system slow or unstable? Are you installing third-party libraries which have security vulnerabilities, distribute malware, or mine crypto currency? Is your own code reliable? Can you guarantee your function to delete logs won't accidentally wipe other files?

> development becomes risk-free

Docker runs each dependency in an isolated container. Think of it as a small virtual machine *containing* an operating system and a single application.

Other than using disk space, containers don't change your PC: *conflicts cannot occur*. An application could delete every file in its container and your system will keep running. Restarting that container brings everything back: *development becomes risk-free*.


## Run your application elsewhere

Can you copy your application and its dependencies elsewhere?

Are other developers, testers, or managers able to install and run it on their PC? What if they're using a different operating system? Are all the dependencies available? Do they have subtle differences which could break your application?

> installation is simple and it's guaranteed to work

Docker makes your application portable. Installation is simple and it's guaranteed to work in an identical way on any another device, whether it's running Windows, macOS, or Linux.

Developers can work on local code using whatever editor, tools, and workflows they prefer.


## Deploy to a live server

Finally, can you deploy your application quickly and easily? Does it behave as users arrive and do unexpected things?! Can it be scaled as it becomes more popular?

> your application will become more robust

A Docker environment can also be launched on a live server. Horizontal scaling becomes possible since you can run additional instances of the application on the same or other servers.

Tools such as Docker Swarm and Kubernetes can simplify the process and manage load balancers. Your application will become more robust: a crashed container can restart immediately and updates can be deployed with zero downtime.


## Quick start example

The following `docker` terminal command launches a PHP 7.4-enabled Apache web server which mounts the files in the current directory to the web root folder:

```sh
docker run \
  -it --rm -p 8080:80 --name php \
  -v "$PWD":/var/www/html \
  php:7.4-apache
```

*Note for Windows users*: remove the line-breaks and `\` slashes then replace `$PWD` with the absolute path in Linux notation, e.g. `/c/myprojects/php/`.

You can add an `index.php` file to your current directory with the following content:

```php
<?php phpinfo();
```

then open <http://localhost:8080/> in your browser to run the PHP code.

Press `Ctrl|Cmd + C` in the terminal to stop the server.


## Are you using Docker?

Few developers use Docker. *It seems complex...*

* The documentation is daunting.
* There are many features and numerous options.
* It's not always clear how to get started.
* Tutorials rarely describe how to create a development environment.

Yet the [quick start above](#quick-start-example) illustrates Docker's power. Like Git, you can use it without in-depth expertise and build your knowledge over time.

The ["**Docker for Web Developers**" book and video course](https://dockerwebdev.com/) has a single objective: *to quickly demonstrate how you can use Docker in your web development projects.*

After a concise explanation of Docker terminology and concepts, it demonstrates typical web project *recipes* including:

* running a database and client
* launching a WordPress development system
* developing a modern Single-Page App (SPA) with a REST API powered by NGINX, Node.js, and MongoDB.

It shows how update the source files locally, use live reloading, and debug client and server code using tools including Chrome DevTools and VS Code. The examples can be adapted to any technology stack, new projects, or existing apps.

<div data-revealer="up" data-youtube="Z3l8Iec4dBk"></div>

The [full course provides](https://dockerwebdev.com/):

1. a **192-page ebook** (PDF, epub, Kindle mobi)
1. a **quick reference** to the most-used Docker and Docker Compose options
1. **90 minutes of video tutorials**
1. **source code** for use in your own projects
1. a **private chat room** for help and support
1. **ongoing updates** as Docker changes occur
1. a full **money-back guarantee**

It's aimed at web developers at any level of experience who have never used Docker before. See [DockerWebDev.com](https://dockerwebdev.com/) for more details.

The full book and video course costs **$99 USD** (approximately &pound;75 or &euro;83) plus your local sales tax where applicable. The book and videos can also be purchased separately.

<h2 class="typist" data-typist-repeat="1" data-typist-cursor-show="2">LIMITED SPECIAL OFFER!...</h2>

Enter the discount code **dock30** at the checkout or [buy now to receive **30% off**](https://gumroad.com/l/DockerWebDev/dock30).
