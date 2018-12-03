# Velcro-Web

This project is the web interface to view and interact with web scraped data for the purpose of understanding current online presense of Velcro Brand.

## Running the Project
1. Clone the repo into your desired directory and cd into it
2. Log into mysql using Command Line or Terminal
3. Run the init.sql file. This will create the velcro database and Users table
4. run `node ./bin/www {host} {user} {password}`
	- The command line arguments must be the hostname, username, and password of your mysql instance.
5. Go to your browser and go to **localhost:3000**
6. You are now able to create a user and login. Further content in regards to a dashboard with data visualizations is coming.