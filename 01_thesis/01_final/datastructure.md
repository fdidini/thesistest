### Data Structure

#### Github data

__01. Getting data from the API__

I'm making GET requests via the Github API. With authentication, I'm able to make a specific request on all repositories with a specific filter/cutout point. Since I'm interested in seeing trends and popularity, my focus was to retrieve all repos with 1000 stars or more. In Github-speak, this means followers and popularity, similar to Facebook likes or other social-media measure.

The data itself is coming paginated: each response gives back a JSON in the body of the response, with the first 30 results matching our GET request. By looking at the header in our response, we also can learn how many more pages of result we have to still require.

For each repository we have an Object with 30 or more key properties. Most of them are extra endpoints to retrieve even more data. Some are quantitative/scalar: like the number of stars (Stargazers count), number of forks (a copy of that repository) or total size in bytes. Size is also available in the Language property: our repository Object has a endpoint where you can get more data about the combination of all coding languages, each by size.

Here's a normal breakdown of those languages:

```
example of response

```
We can also return other extra objects as values: an array of all users who follow that repository, for example. The richness of the API is an advantage but also presents us with dilemmas on what we could include or exclude.

__02. Parsing and structure__

As a first step, I'm envisioning a relational database-like structure, where each instance in our model is a repository, and inside that instance we have an unique ID (the ID from the repo itself, provided by Github). Other properties in our instance that are available with just one request:

1. 'Size': size of the repository in bytes (Integer)
2. 'Stargazers_count': count of the number of followers (Integer)
3. 'Forks': count of the number of copies of the repository (Integer)
4. 'Createdate': creation of the repository (Date)

Two major properties need to be appended to a instance later, since they rely on extra calls to the API, by using specific endpoints.

1. 'Languages': using an endpoint from our first GET request, we can list all languages used on a repository, and we also have for each one of these languages their size in bytes
2. 'Topics': by also calling another endpoint (but one that's actually NOT provided by the first GET request), we can see all topics listed in that repository. An array of strings. It can provides us with more nuance, as a qualitative approach, in printing out specific libraries and sub-themes for major languages (such as React, CSS-grid, tensor flow, among others).

...


#### Comparison data

__01. Getting data around__

This is the tricky part for this project. How do I come up with an interesting metric to compare with Github?

I decided to look for other knowledge hubs. I've turned my interest to Universities, Experimental Workshops and MOOCs. We have github data for Universities and Experimental Workshops:

1. Cornell Tech https://github.com/cornelltech
2. School of Poetic Computation https://github.com/SFPC
3. MIT media lab https://github.com/mitmedialab
4. Ecole Mathemathiques https://github.com/imie-source
5. Flatiron School https://github.com/flatiron-school

These are just some that we could do the same analysis and see how they follow or not some of the Github trends.


====

Considerations

- Do we need frequencies/AJAX?
- It's now important building a methodology where we can compare both sides, and have a clear path/guide for our audience (how we can build a programming course?). Is Github the way (maybe not). What do we see on the Universities and Courses side that's interesting? (Get the description of them and NLP?).
- The order here helps us with it.
- Some of the Github Uni users have different structures: some are courses, some are projects, others also have resources. Let's think of different ways that this could work!


I will have a list of the most common repositories; could also do the same about users and organizations.
After that, we can create a dictionary: these could in turn fuel another search for topics.

Our data from individual places could be then analyzed with this. We could also see tags from inside the Github trend data with the Unis.

What's the purpose of the repositories? It's also a important point.








<br><br><br><br><br><br><br><br><br>
====
