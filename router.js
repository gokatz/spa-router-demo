const links = document.querySelectorAll("a[href]");
let currentRoute = "";

for (const link of links) {
  link.addEventListener("click", function(event) {
    let link = event.target.href;
    let { pathname } = new URL(link);
    handleRouting(pathname);
    event.preventDefault();
  });
}

window.onpopstate = event => {
  handleRouting(event.state, true);
};

let routeMap = [
  {
    pathname: "/about.html",
    template: "<h3 class='about'>This is the About page</h3>",
    name: "about"
  },
  {
    pathname: "/contact.html",
    template: "<h3 class='contact'>This the Contact page</h3>",
    name: "contact"
  },
  {
    pathname: "/",
    template: "<h3 class='home'>This the Home page</h3>",
    name: "home"
  }
];

function handleRouting(pathname, isPopingState) {
  // If there is no pathname, then the user is anded on the homepage, hence setting the pathname as '/'
  pathname = pathname === null ? "/" : pathname;

  /* 
    Clicking the same link multiple time will lead to duplicate pushState entries and clicking back in the
    browser nav bar will stuck on the same page

    Thus, we will track the current route name and if the navigation is made for the curently active
    route, noting will happen.
  */
  if (currentRoute === pathname) {
    return;
  }

  let selectedRouteInfo = routeMap.find(
    routeInfo => routeInfo.pathname === pathname
  );

  let { name, template, pathname: selectedRoutePathName } =
    selectedRouteInfo || {};

  if (name) {
    // saving currentRoute name
    currentRoute = selectedRoutePathName;

    // if the transition is made out of popState (ie, either clicking back or fwd browser navigation),
    // then we should not again push the same state. We just need to set the proper template layout.

    !isPopingState && window.history.pushState(pathname, name, pathname);
    document.querySelector("#outlet").innerHTML = template; // UI Component library
  } else {
    /* 
      TODO:
      If no route is selcted, route the navigation to home page (Sensible default)
      Alternatively, we can route them to a 404 page
    */

    alert("404: Page Not Found");
  }
}

// Initial route transition
// handleRouting(window.location.pathname);
