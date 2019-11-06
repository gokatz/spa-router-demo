# SPA Router Demo

Simple and very basic implementation of a Single page application (SPA) router

## Navigation Types:

1. Clicking the link for a page within the app
2. Pressing Forward and Backward browser navigation
3. Direct URL navigation (or reloads)

## Steps:

1. Listen the click event of a link (say, /about.html page) inside app
2. Prevent the default action of the link
3. Extract the target information (/about.html)
4. Fetch the UI template for the target page
5. Push the state into the history API manually using the `pushState` API.
6. Render the fetched UI template into the outlet
7. Prevent duplicate state entiries (when navigating to the same route multiple times) by maintaining the currentRoute state.
8. Listen for all links and maintain a router map to store information about the route/page. **This completes the type 1 navigation**
9. Next up is the browser navigation.
10. Since we handle all the app state using the `pushState` API, browser navigation (back/forward) will result in triggering `popState` event.
11. Listen for the `popState` event and extract the target information.
12. Repeat the step 4, 6, 7 for the extracted target. Yes, skip step 5.
13. This is because, pushing the state again will create duplicate entries for the destination target. **This completes the type 2 navigation**
14. Now, we have to handle the direct URL hit.
15. For the initial landing page (home), we should repeat the step 4, 5, 6, 7 with the target as _home_ page
16. If the user hits a URL other than the home/index page, the server would return a 404 response as the server will not have any knowledge about the particular URL.
17. Thus, server has to be configur to respond with `index.html` for any request originating from the domain and the routing can be handled in the client side.
18. In this case, we have to extract the target from the initial URL hit by the user (via `window.location` API)
19. Repeast the step, 4, 5, 6, 7 with the extracted target. **This completes the type 3 navigation**
20. Handle the 404 pages.
