#Learning Backbone.js Best Practices
The goal of this repo is to encourage collaboration on surfacing and showcasing Backbone.js development best practices and idioms in a manner that hopefully evolves in a direction that evolves to be beneficial for whoever needs to understand and use Backbone.js best practices over time.

- Skip to [_How You Can Help_](#how-you-can-help).

##Background
I started this repo to present the code for a Backbone.js project I was working on to a Backbone.js specialist for code review. 

While I've found many resources online for learning Backbone.js I also found much of the advice to be contradictory and/or confusing. To be charitable I believe the reason is because Backbone.js best practices have evolved at a rapid pace and thus best practices of a year ago are often no longer best practices.

So as I prepared this repo for presentation I realized it would be even better if I could invite any and all people with Backbone.js expertise to review, comment and submit pull requests with a goal of showcasing a (or many) "real world" use of case(s) that can evolve over time unlike blog posts and even Stack Overflow answers that often tend to be frozen in time.

Will it be successful?  Who knows, but it won't be if I never try.

###Curated Learning Resources
As the first step in trying to learn Backbone.js best practices I curated a list of links at my company's [Pinboard.in](http://pinboard.in) account, although there was no way using Pinboard to present them via any logical order:

- https://pinboard.in/u:newclarity/t:learning/t:backbone.js

###Plans for this Repo
We plan to add pages that document the facts and techniques discovered and the best practices implemented in the wiki on this site.

###How You Can Help
If your colleagues think of you as a Backbone.js guru then please, we'd love to have your input. There are several ways to contribute:

1. **Share** this repo [via Twitter](https://twitter.com/intent/tweet?text=Backbone.js%20gurus%3A%20Need%20your%20help%20surfacing%20and%20showcasing%20best%20practices.%20https%3A%2F%2Fgithub.com%2Fmikeschinkel%2Flearning-backbonejs-best-practices%2Fblob%2Fmaster%2FREADME.md%20%23backbonejs) asking for help to surface and showcase best practices.

1. **Comment** on [any of the issues](https://github.com/mikeschinkel/learning-backbonejs-best-practices/issues) posted in this repo.

2. Read the code and **make suggestions** by [posting a new issue](https://github.com/mikeschinkel/learning-backbonejs-best-practices/issues/new).

2. Fork the code, make changes, **submit a pull request** then optionally explain the changes by [posting a new issue](https://github.com/mikeschinkel/learning-backbonejs-best-practices/issues/new).

Thanks in advance for your collaboration.

##The "Stack Editor" App
The current source code in this repo if for a real-world need to create what we are calling a _"Stack Editor"_. It will be embedded in the add/edit page within the WordPress admin console for custom post type for a very well-known company's [brand](http://sethgodin.typepad.com/seths_blog/2009/12/define-brand.html) pages for their marketing **intranet** _(yes: "WordPress-based Intranet," you read that correctly.)_ 

Currently this code is completely self-contained and is just standalone HTML+CSS+JS where the JS is jQuery, jQuery UI, Underscore, Backbone and custom JS.

###The Use Case
The Stack Editor provides a **visual page layout editor** that enables the admin to add and/or reorder _"Layers"_ that will be displayed full-width and vertically on a brand's intranet web page. 

The Stack Editor will support configuring user pages on their marketing intranet will that allow each brand to showcase their marketing campaigns for geographic regions and for other brands in the company and it will also allow them to showcase documents and presentations they need to share internally.

####Content Types
Each layer will be a content container that can display one of more content items:
- Contacts (e.g. contact info for people)
- Events
- Downloadables			- Works	_(still looking for a better name for this grouping)_		- Documents		- Spreadsheets		- Presentations	- Media			- Video		- Audio		- Images	- Other	- Stacks _(a Brand has a Stack, and Stacks can be embedded in other Stacks)_		- Mixed _(any combination of the above)_		

####Layouts
Each layer will also have a Layout that defines how content items will be presented:
- **Horizontal List** - A horizontal card list.
- **Vertical List** - A vertical list of text descriptions.
- **Stamp Grid** - A two column grid of item images _("stamps")_ with text descriptions each.
- **Featured** - Featured video or image for an item with various controls.
- **Featured + List** - _"Featured"_ plus a horizontal card list below.
- **Hero** - A large image w/o controls showcasing an item.

####Stacks
A Stack is a collection of vertical Layers. The idea is that the admin user adds Layers to the Stack and orders them top-to-bottom using drag-and-drop in the order they wish them to be displayed on the intranet web page.

####Layers
Layers in the Stack Editor are containers for criteria to be used to select the content to be displayed in the Layer. Layer criteria includes but won't be limited to:

- Brand
- Geographic Region
- Sort Order
- Date Range _(via published date)_
- Posts with tags to explicitly INCLUDE
- Posts with tags to explicitly EXCLUDE
- Specific posts to explicitly INCLUDE
- Specific posts to explicitly EXCLUDE
- Other _(to be determined)_


##Current Demo
You can see the current demo [here](http://newclarity.net/stack-editor/).

##Current Status
The code first submitted in July 2013 is **definitely not following best practices** and so the goal is for me _(and others)_ to learn from the process of evolving this code into something that can represent best practices. And anyone who contributes significant code or advice will be listed on this **readme** as a significant contributor.

There has been no attempt thus far to make the code look "pretty"; everything has been focused on functionality.


##License

- MIT License

