# Quizzer-Web-Frontend
Web frontend for Quizzer. The web platform is exclusively for teachers and offers features different from Android.

#Context
-----------

# What is Quizzer?
Getting inspiration from iClicker/REEF, I wanted to create my own version via tech I've learned. In a class of x students and one professor
this app comes into play where it allows the professors to create courses, and create live real-time sessions. In these sessions, the students
answer the questions asked and they get scores added up into their place in the database (Mongo). 

# What about abscences? 
To avoid making the app useless, absences had to be taken into account. A solution for this was to implements routes from the teacher's 
side and every time a question is removed (i.e the question is done), this route is responsible for increasing the count in the database for all students.

# What are the platforms?
The client app for students is an Android app. 
