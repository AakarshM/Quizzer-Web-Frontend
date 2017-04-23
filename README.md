# Quizzer-Web-Frontend
Web frontend for Quizzer. The web platform is exclusively for teachers and offers features different from Android.

#Context
-----------
# Time frame
Took me a while to finish this project since its quite extensive and detail oriented. An estimate time frame is January 2017 - April/May 2017

# What is Quizzer?
Getting inspiration from iClicker/REEF, I wanted to create my own version via tech I've learned. In a class of x students and one professor
this app comes into play where it allows the professors to create courses, and create live real-time sessions. In these sessions, the students
answer the questions asked and they get scores added up into their place in the database (Mongo). 

# What about abscences? 
To avoid making the app useless, absences had to be taken into account. A solution for this was to implements routes from the teacher's 
side and every time a question is removed (i.e the question is done), this route is responsible for increasing the count in the database for all students.

# What about data?
Students, teachers, scores, questions, everything is stored in MongoDB. Specifically picked MongoDB due to its flexibility with JSON environments. 

# Questions in DB?
Everytime a professor asks a questions and then removes it (i.e. the question is done, students have answered), an HTTP request is created to the Express server, which saves the questions (with options, correct answer) in an easily accessible format. The next time someone wants to view the questions, another simple HTTP route (implemented via the web app) can be called.

# What are the platforms?
The client app for students is an Android app and the client for teachers is a website/webapp.

# What is the tech?
Node.js is used for the HTTP API, Socket.io is used (client + server) for real time connections/sessions. Java is used to build the Android client and the usual, HTML/CSS/Javascript/jQuery is used for the web front end. MongoDB is used for the database.

# Important
I've used a bunch of online templates for the web UI to make it look decent, credits are places everywhere and also on the UI (while browsing) itself.

