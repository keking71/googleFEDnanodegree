/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('have urls', function() { // is each feed URL defined and not empty?
           allFeeds.forEach(function(feed) { // for each feed
             expect(feed.url).toBeDefined(); // does the url property exist?
             expect(feed.url.length).not.toBe(0); // does the url property contain data?
             });
         });

         it('have names', function() { // does each feed have a name defined and not empty?
           allFeeds.forEach(function(feed) { // for each feed
             expect(feed.name).toBeDefined(); // does the name property exist?
             expect(feed.name.length).not.toBe(0); // does the name property contain any data?
           });
         });
    });

    describe('The menu', function() { // new suite
        var body = document.querySelector('body'); // get the body element
         it('is hidden by default', function() { // is the menu hidden by default?
           expect(body.classList.contains('menu-hidden')).toBe(true); // check body element for class that hides menu
         });

         it('changes visibility when clicked', function() { // does the menu visibility toggle when clicked?
           var menu = document.querySelector('.menu-icon-link'); // get menu icon element
           menu.click(); // when menu click function runs
           expect(body.classList.contains('menu-hidden')).toBe(false); // check body element for class that shows menu

           menu.click(); // when menu click function runs again
           expect(body.classList.contains('menu-hidden')).toBe(true); // check body element for class that hides menu
          });

    });

    describe('Initial Entries', function() { // new suite
        var feed = document.querySelector('.feed'); // get the feed element

         beforeEach(function(done) { // before tests
           loadFeed(0, done); // call the feed once it's done working 
         });

         it('completes its work', function(){
           expect(feed.children.length > 0).toBe(true); // check to make sure there is some child data on the feed
         });
    });

    describe('New Feed Selection', function() { // new suite

        // beforeEach
        // done()
        // new feed is loaded by loadFeed
        // content is changed

    });
}());
