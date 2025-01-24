const http = require("http"); // Import Node.js core module
const fs = require("fs"); // Import file module
const path = require("path");

// Set the directory path for the templates folder
const templatesDir = path.join(__dirname, "templates");
const stylesDir = path.join(__dirname, "styles");

// Function to serve HTML files
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error loading the requested page.");
      return;
    }
    res.setHeader("Content-Type", contentType);
    res.end(data);
  });
}

// Creating server
const server = http.createServer((req, res) => {
  // Log the incoming request method and URL
  console.log(`Received request: ${req.method} ${req.url}`);

  // Serve the CSS file when requested
  if (req.url === "/styles/styles.css") {
    fs.readFile(path.join(stylesDir, "styles.css"), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error loading styles.css");
        return;
      }
      res.setHeader("Content-Type", "text/css");
      res.end(data);
    });
    return;
  }

  // Serve the requested page
  switch (req.url) {
    case "/":
      serveFile(res, path.join(templatesDir, "page.html"), "text/html");
      break;
    case "/about":
      serveFile(res, path.join(templatesDir, "about.html"), "text/html");
      break;
    case "/contact":
      serveFile(res, path.join(templatesDir, "contact.html"), "text/html");
      break;
    default:
      res.statusCode = 404;
      res.end("Page not found");
  }
});

// Start listening on port 3000
server.listen(3000, () => {
  console.log("Node.js web server is running at http://localhost:3000");
});
