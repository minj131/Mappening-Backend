# Mappening-Backend

## Overview
A single platform for events across campus. Mappening helps raise awareness of events by aggregating event information from various sources of advertising.

## Documentation
Hosted on GitHub Pages at http://ucladevx.com/Mappening-Backend/

## Built With
- Python 2.7.14
- Flask (Port 5000): Web microframework for Python
- mLab: Database-as-a-Service cloud-hosted MongoDB
- Pymongo: Database Connector between MongoDB and Flask
- Facebook Graph API + Login/OAuth for getting event information and user authentication
- Google Maps/Places API Web Service for getting place information
- AWS EC2/Elastic Container Service for deployment
- Sphinx to automatically generate documentation
- Tkinter, Selenium, Google chromedriver for internal tools
- Beautiful Soup for web scraping

## Setting Up the Environment
- Download [Docker](https://www.docker.com) and [Docker-Compose](https://github.com/docker/compose/releases) release 1.16.1.
  - Run the Docker daemon
- Clone this repository
  - `git clone https://github.com/ucladevx/Mappening-Backend.git`
- For Mac users, install Xcode developer tools `xcode-select --install`
- Get the `.env` file which contains sensitive information from a dev and add it to src/mappening/utils/
- NOTE: the database connection doesn't seem to work over UCLA_WEB wifis, a more secure connection is needed (UCLA_WIFI)

## How to Push Image to AWS ECS
- Enter the repository
  - `cd Mappening-Backend`
- Login, build, and push image to AWS
  - `make push`

## How to Run Backend Locally
- Build and run container
  - `make dev`
- Navigate to `localhost`
- Access flask api directly at port 5000
  - Use `localhost:5000/api/<insert_api_route_here>`
  - e.g. `localhost:5000/api/events`
- Stop running with `CTRL+C` or `make stop` in a separate terminal window

## More Info
- Check out the [frontend](https://github.com/ucladevx/Mappening-Frontend) repository
- Check out the [deployment](https://github.com/ucladevx/Mappening-Deployment) repository
  - Contains instructions for local development and production

## Repo Breakdown
- Backend source code in `src/`
- tkinter GUIs in `tkinter/`
- Autodocumentation in `docs/`
- Beautiful Soup Scraping in `scraping/`
