# Build a React App

* Source: <https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/>

[React](https://reactjs.org/) is the most widely used JavaScript frontend library.

In this tutorial we'll build a simple React app with Deno. The app will display a list of dinosaurs. When you click on one, it'll take you to a dinosaur page with more details. You can see the [finished app repo on GitHub](https://github.com/denoland/tutorial-with-react)

![demo of the app](https://docs.deno.com/runtime/tutorials/images/how-to/react/react-dinosaur-app-demo.gif)

## Create a React app with Vite and Deno [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#create-a-react-app-with-vite-and-deno)

This tutorial will use [Vite](https://vitejs.dev/) to quickly scaffold a Deno and React app. Vite is a build tool and development server for modern web projects. It pairs well with React and Deno, leveraging ES modules and allowing you to import React components directly.

In your terminal run the following command to create a new React app with Vite using the typescript template:

```sh
deno run -A npm:create-vite@latest --template react-ts
```

When prompted, give your app a name, and `cd` into the newly created project directory. Then run the following command to install the dependencies:

```sh
deno install
```

Now you can serve your new react app by running:

```sh
deno task dev
```

This will start the Vite server, click the output link to localhost to see your app in the browser.

## Add a backend [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#add-a-backend)

The next step is to add a backend API. We'll create a very simple API that returns information about dinosaurs.

In the root of your new project, create an `api` folder. In that folder, create a `main.ts` file, which will run the server, and a `data.json`, which will contain the hard coded dinosaur data.

Copy and paste [this json file](https://github.com/denoland/tutorial-with-react/blob/main/api/data.json) into the `api/data.json` file.

We're going to build out a simple API server with routes that return dinosaur information. We'll use the [`oak` middleware framework](https://jsr.io/@oak/oak) and the [`cors` middleware](https://jsr.io/@tajpouria/cors) to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

Use the `deno add` command to add the required dependencies to your project:

```shell
deno add jsr:@oak/oak jsr:@tajpouria/cors
```

Next, update `api/main.ts` to import the required modules and create a new `Router` instance to define some routes:

main.ts

```ts
import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import data from "./data.json" with { type: "json" };

const router = new Router();
```

After this, in the same file, we'll define two routes. One at `/api/dinosaurs` to return all the dinosaurs, and `/api/dinosaurs/:dinosaur` to return a specific dinosaur based on the name in the URL:

main.ts

```ts
router.get("/api/dinosaurs", (context) => {
  context.response.body = data;
});

router.get("/api/dinosaurs/:dinosaur", (context) => {
  if (!context?.params?.dinosaur) {
    context.response.body = "No dinosaur name provided.";
  }

  const dinosaur = data.find((item) =>
    item.name.toLowerCase() === context.params.dinosaur.toLowerCase()
  );

  context.response.body = dinosaur ?? "No dinosaur found.";
});
```

Finally, at the bottom of the same file, create a new `Application` instance and attach the routes we just defined to the application using `app.use(router.routes())` and start the server listening on port 8000:

main.ts

```ts
const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
```

You can run the API server with `deno run --allow-env --allow-net api/main.ts`. We'll create a task to run this command in the background and update the dev task to run both the React app and the API server.

In your `package.json` file, update the `scripts` field to include the following:

```jsonc
{
  "scripts": {
    "dev": "deno task dev:api & deno task dev:vite",
    "dev:api": "deno run --allow-env --allow-net api/main.ts",
    "dev:vite": "deno run -A npm:vite",
    // ...
}
```

If you run `deno task dev` now and visit `localhost:8000/api/dinosaurs`, in your browser you should see a JSON response of all of the dinosaurs.

## Update the entrypoint [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#update-the-entrypoint)

The entrypoint for the React app is in the `src/main.tsx` file. Ours is going to be very basic:

main.tsx

```tsx
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
```

## Add a router [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#add-a-router)

The app will have two routes: `/` and `/:dinosaur`.

We'll use [`react-router-dom`](https://reactrouter.com/en/main) to build out some routing logic, so we'll need to add the `react-router-dom` dependency to your project. In the project root run:

```shell
deno add npm:react-router-dom
```

Update the `/src/App.tsx` file to import and use the [`BrowserRouter`](https://reactrouter.com/en/main/router-components/browser-router) component from `react-router-dom` and define the two routes:

App.tsx

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import Dinosaur from "./pages/Dinosaur";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:selectedDinosaur" element={<Dinosaur />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Proxy to forward the api requests [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#proxy-to-forward-the-api-requests)

Vite will be serving the application on port `5173` while our api is running on port `8000`. Therefore, we'll need to set up a proxy to allow the `api/`-paths to get to be reachable by the router. Overwrite `vite.config.ts` with the following to configure a proxy:

vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
```

## Create the pages [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#create-the-pages)

We'll create two pages: `Index` and `Dinosaur`. The `Index` page will list all the dinosaurs and the `Dinosaur` page will show details of a specific dinosaur.

Create a `pages` folder in the `src` directory and inside that create two files: `index.tsx` and `Dinosaur.tsx`.

### Types [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#types)

Both pages will use the `Dino` type to describe the shape of data they're expecting from the API, so let's create a `types.ts` file in the `src` directory:

types.ts

```ts
export type Dino = { name: string; description: string };
```

### index.tsx [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#index.tsx)

This page will fetch the list of dinosaurs from the API and render them as links:

index.tsx

```tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dino } from "../types.ts";

export default function Index() {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/dinosaurs/`);
      const allDinosaurs = await response.json() as Dino[];
      setDinosaurs(allDinosaurs);
    })();
  }, []);

  return (
    <main>
      <h1>Welcome to the Dinosaur app</h1>
      <p>Click on a dinosaur below to learn more.</p>
      {dinosaurs.map((dinosaur: Dino) => {
        return (
          <Link
            to={`/${dinosaur.name.toLowerCase()}`}
            key={dinosaur.name}
            className="dinosaur"
          >
            {dinosaur.name}
          </Link>
        );
      })}
    </main>
  );
}
```

### Dinosaur.tsx [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#dinosaur.tsx)

This page will fetch the details of a specific dinosaur from the API and render it in a paragraph:

**Dinosaur.tsx**

```tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dino } from "../types";

export default function Dinosaur() {
  const { selectedDinosaur } = useParams();
  const [dinosaur, setDino] = useState<Dino>({ name: "", description: "" });

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/dinosaurs/${selectedDinosaur}`);
      const dino = await resp.json() as Dino;
      setDino(dino);
    })();
  }, [selectedDinosaur]);

  return (
    <div>
      <h1>{dinosaur.name}</h1>
      <p>{dinosaur.description}</p>
      <Link to="/">🠠 Back to all dinosaurs</Link>
    </div>
  );
}
```

### Styling the list of dinosaurs [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#styling-the-list-of-dinosaurs)

Since we are displaying the list of dinosaurs on the main page, let's do some basic formatting. Add the following to the bottom of `src/App.css` to display our list of dinosaurs in an orderly fashion:

src/App.css

```css
.dinosaur {
  display: block;
}
```

## Run the app [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#run-the-app)

To run the app use the task you set up earlier

```sh
deno task dev
```

Navigate to the local Vite server in your browser (`localhost:5173`) and you should see the list of dinosaurs displayed which you can click through to find out about each one.

![demo of the app](https://docs.deno.com/runtime/tutorials/images/how-to/react/react-dinosaur-app-demo.gif)

## Build and deploy [Jump to heading#](https://docs.deno.com/runtime/tutorials/how_to_with_npm/react/#build-and-deploy)

At this point the app is being served by the Vite development server. To serve the app in production, you can build the app with Vite and then serve the built files with Deno. To do so we'll need to update the api server to serve the built files. We'll write some middleware to do this. In your `api` directory create a new file called `routeStaticFilesFrom.ts` and add the following code:

routeStaticFilesFrom.ts

```ts
import { Next } from "jsr:@oak/oak/middleware";
import { Context } from "jsr:@oak/oak/context";

// Configure static site routes so that we can serve
// the Vite build output and the public folder
export default function routeStaticFilesFrom(staticPaths: string[]) {
  return async (context: Context<Record<string, object>>, next: Next) => {
    for (const path of staticPaths) {
      try {
        await context.send({ root: path, index: "index.html" });
        return;
      } catch {
        continue;
      }
    }

    await next();
  };
}
```

This middleware will attempt to serve the static files from the paths provided in the `staticPaths` array. If the file is not found it will call the next middleware in the chain. We can now update the `api/main.ts` file to use this middleware:

main.ts

```ts
import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import data from "./data.json" with { type: "json" };
import routeStaticFilesFrom from "./api/routeStaticFilesFrom.ts";

const router = new Router();

router.get("/api/dinosaurs", (context) => {
  context.response.body = data;
});

router.get("/api/dinosaurs/:dinosaur", (context) => {
  if (!context?.params?.dinosaur) {
    context.response.body = "No dinosaur name provided.";
  }

  const dinosaur = data.find((item) =>
    item.name.toLowerCase() === context.params.dinosaur.toLowerCase()
  );

  context.response.body = dinosaur ? dinosaur : "No dinosaur found.";
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/dist`,
  `${Deno.cwd()}/public`,
]));

await app.listen({ port: 8000 });
```

Add a `serve` script to your `package.json` file to build the app with Vite and then run the API server:

```jsonc
{
  "scripts": {
    // ...
    "serve": "deno task build && deno task dev:api",
}
```

Now you can serve the built app with Deno by running:

```sh
deno task serve
```

If you visit `localhost:8000` in your browser you should see the app running!

🦕 Now you can scaffold and develop a React app with Vite and Deno! You’re ready to build blazing-fast web applications. We hope you enjoy exploring these cutting-edge tools, we can't wait to see what you make!
