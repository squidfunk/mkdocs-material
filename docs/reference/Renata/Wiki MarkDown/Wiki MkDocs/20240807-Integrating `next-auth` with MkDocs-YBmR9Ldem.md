# Integrating `next-auth` with MkDocs

## Objective

The goal is to secure an internal MkDocs site using `next-auth` for authentication. This allows us to control access to our documentation site, ensuring only authenticated users can view it.

## Steps to Achieve This

### 1. Set Up a Next.js Project

First, we need to create a Next.js project that will handle the authentication.

1. **Install Node.js and npm**:
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

2. **Create a new Next.js project**:
   ```bash
   npx create-next-app my-next-auth-app
   cd my-next-auth-app
   ```

3. **Install `next-auth`**:
   ```bash
   npm install next-auth
   ```

### 2. Configure `next-auth`

Set up the authentication providers and session options.

1. **Create a file `[...nextauth].js` in `pages/api/auth/`**:
    ```javascript
    // pages/api/auth/[...nextauth].js
    import NextAuth from 'next-auth';
    import Providers from 'next-auth/providers';

    export default NextAuth({
      providers: [
        Providers.Google({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
        // Add other providers as needed
      ],
    });
    ```

2. **Set up environment variables in a `.env.local` file**:
    ```
    GOOGLE_ID=your-google-client-id
    GOOGLE_SECRET=your-google-client-secret
    ```

### 3. Proxy the MkDocs Site

We will use a proxy middleware to serve the MkDocs site.

1. **Install `http-proxy-middleware`**:
    ```bash
    npm install http-proxy-middleware
    ```

2. **Create a file `middleware.js` in the root of your project**:
    ```javascript
    // middleware.js
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
      app.use(
        '/docs',
        createProxyMiddleware({
          target: 'http://localhost:8000',
          changeOrigin: true,
        })
      );
    };
    ```

3. **Update your `next.config.js` to include the middleware**:
    ```javascript
    // next.config.js
    const withMiddleware = require('./middleware');

    module.exports = withMiddleware({
      // Your existing Next.js config
    });
    ```

### 4. Run MkDocs Server

Start your MkDocs server to serve the documentation.

```bash
mkdocs serve
```

### 5. Run the Next.js Project

Start your Next.js project to handle authentication and proxy requests.

```bash
npm run dev
```

### 6. Access the Application

Open your browser and go to `http://localhost:3000/docs`. You will be prompted to log in before accessing the MkDocs site.

By following these steps, you can secure your internal MkDocs site using `next-auth` for authentication, ensuring that only authorized users can access your documentation.
