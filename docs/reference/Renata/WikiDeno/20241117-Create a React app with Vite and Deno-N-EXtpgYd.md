# Create a React app with Vite and Deno

 [Vite](https://vitejs.dev/) to quickly scaffold a Deno and React app. Vite is a build tool and development server for modern web projects. It pairs well with React and Deno, leveraging ES modules and allowing you to import React components directly.

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