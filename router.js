const links = document.querySelectorAll("a[href]");

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

function handleRouting(pathname, isPopingState) {
  let currentPathname = window.location.pathname;

  if (currentPathname === pathname) {
    return;
  }

  switch (pathname) {
    case "/about.html": {
      !isPopingState &&
        window.history.pushState("/about.html", "about", "/about.html");
      document.querySelector("#outlet").innerHTML =
        "<h3 class='about'>This is an About page</h3>"; // UI Component library
      break;
    }

    case "/contact.html": {
      !isPopingState &&
        window.history.pushState("/contact.html", "contact", "/contact.html");
      document.querySelector("#outlet").innerHTML =
        "<h3 class='contact'>This is a Contact page</h3>"; // UI Component library
      break;
    }

    default: {
      !isPopingState &&
        window.history.pushState("/index.html", "home", "/index.html");
      document.querySelector("#outlet").innerHTML =
        "<h3 class='home'>This is a Home page</h3>"; // UI Component library
      break;
    }
  }
}

// function handleInitialLoad() {
//   handleRouting(window.location.pathname);
// }

// handleInitialLoad();
