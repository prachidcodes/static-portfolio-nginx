# Static Portfolio Site with Nginx

A lightweight portfolio website served by Nginx inside a Docker container.

**Live site:** https://static-portfolio-nginx.onrender.com/

## Architecture
HTML, CSS and JavaScript in `site/`, bundled into the official `nginx:alpine`
image with a custom server block in `nginx/default.conf`.

## Nginx configuration
- gzip compression for text assets
- 7 day cache lifetime for static files
- security headers on every response
- custom 404 page
- `/health` endpoint for container health checks

## Run locally
    docker build -t static-portfolio-nginx .
    docker run -d -p 8080:80 --name portfolio static-portfolio-nginx

Then open http://localhost:8080

## Deployment
Deployed on Render from this repository's Dockerfile.
Docker Hub: https://hub.docker.com/r/prachidalvi/static-portfolio-nginx

## Screenshots

### Live site
![Live site](screenshots/live-site.png)

### Deployed on Render
![Render deploy status](screenshots/render-live.png)

### Container running and healthy
![docker ps showing healthy](screenshots/docker-ps-healthy.png)

### Response headers from the live URL
![curl headers](screenshots/curl-live.png)
![curl headers for CSS](screenshots/curl-css.png)

### Image on Docker Hub
![Docker Hub](screenshots/docker-hub.png)
