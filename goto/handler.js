"use strict"

module.exports = (event, context) => {
    let redirect;

    /* Use a switch statement, or look up the routes in a database
     * such as MongoDB, Redis or Postgres. AWS and DigitalOcean provide
     * remote, managed databases that would work here and maintain
     * a connection pool */
    if(event.path == "/home") {
        redirect = "https://www.alexellis.io/";
    } else if(event.path == "/sponsors" || event.path == "/insiders") {
        redirect = "https://github.com/users/alexellis/sponsorship";
    }

    /* Let the user know we couldn't find the URL, we could
     * also return a HTML page and set the correct encoding for the
     * browser to understand. */
    if(!redirect) {
        return context
            .status(400)
            .fail("Unknown short URL");
    }

    /* 302 Moved Temporarily
     * Prevents the browser from caching the redirection
     * https://en.wikipedia.org/wiki/HTTP_302 */
    context
        .status(302)
        .headers({"location": redirect})
        .succeed();
}