Project is build using angular 4, html and styling is done using scss. We have used express js in the backend and mongodb for the database.

This project helps you create different types of charts used for various records such as industrial financial records,hospital generic records etc. Rather this project is useful where the file provided has huge amount of data and it is converted into different graphical formats.

To run the project you initially have to connect the nodes and also need to connect to the database.

Steps to run the project:
1.Connecting the nodes: Go to the announcements-node folder. Run the command 'nodemon app' to initialize the port 8080.

2.Connecting the database: Install mongodb. Connect to database using 'mongod --dbpath="../data/db" ' command in the bin path.

3.Install the node modules in announcements-node and announcementsFrontend using the 'npm install' command.

4.Now the app is ready to start and you can serve the application using 'ng serve -o' command.
