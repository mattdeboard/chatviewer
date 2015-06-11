Background
==========

The goal of this application is to display the transcript of a discussion stored in a database.

This is inspired by the transcript presented by Business Insider here: http://www.businessinsider.com/tim-cook-full-interview-with-charlie-rose-with-transcript-2014-9

We're looking to make it more interactive.

For the sake of this document:
* The data represents a single Conversation that spans multiple Topics.
* A Discussion occurs around each Topic.
* Each thing said in the Discussion will be called a Note.


Task
====

*Using whatever technologies you prefer,* build a frontend application that implements the functionality in the attached wireframe.

In general, that functionality can be described as:

1. The page should load the Conversation from Firebase via the web APIs (using one or more queries -- at your discretion)
2. The page should render the Conversation in a way that groups Notes by Topic, preserving their natural ordering (so a reader could follow the Conversation).
3. A user should be able to filter the Conversation using a text input that searches only for those Notes that contain the text entered by the user. This filtering should occur on the client.
4. A user should be able to filter the Conversation to show only a single Topic at a time. When filtering, you should re-fetch the notes for the Topic from Firebase. (see the note below to understand why)

Notes on implementation
-----------------------

* You should use the Firebase web APIs -- either using a library or the REST API. Please do not write a backend that downloads the data and renders a static HTML page.
* In #4 above, we have asked you to re-fetch data when filtering by topic. We know that you already have the data and could do the filtering locally, but in #3 you've already shown you know how to do that. We'd like to see that you can also make requests that utilize server-side filtering.
* Bonus points if you write an isomorphic node.js app. :)

Resources
=========

All data is accessible via Firebase at https://redacted.firebaseio.com/ 

We've enabled anonymous access.

Documentation for the Firebase libraries is available at https://www.firebase.com/docs/web/

Please DO NOT use this endpoint in your final submission, but you can see the full JSON dump here: https://redacted.firebaseio.com/.json

The schema of the data is as follows:

```
{
    "participants": {
        ID: {
            "avatar": URL,
            "name": NAME OF PARTICIPANT
        },
        ...
    },
    "topics": {
        ID: {
            "name": NAME OF TOPIC,
            "discussion": [
                {
                    "speaker": ID, // Maps to "participants",
                    "text": WHAT WAS SAID
                },
                ...
            ]
        },
        ...
    }
}
```
