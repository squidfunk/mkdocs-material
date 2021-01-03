#Stats Collection for Jitsi

### Integrate the observerRTC library in your Jitsi Meet HTML

To load the observerRTC library, we need to edit the Jitsi Meet webpage.

1. Open your JitsiMeet  `index.html` page:

```shell
nano /usr/share/jitsi-meet/index.html
```

2. Add these two file after the line where `config.js` script is loaded:

```javascript
<script src="https://observertc.github.io/observer-js/dist/v0.3.5/observer.min.js"></script>
<script src="https://observertc.github.io/integrations/dist/v0.0.2/jitsi.integration.min.js"></script>
```

This should look something like:
```HTML
    <!--... --> 
    <!--#include virtual="static/settingsToolbarAdditionalContent.html" -->

    <!-- Added manually as part of Observe RTC installation; using full, unminified versions -->
    <script src="https://observertc.github.io/observer-js/dist/v0.3.5/observer.min.js"></script>
    <script src="https://observertc.github.io/integrations/dist/v0.0.2/jitsi.integration.min.js"></script>
  </head>
  <body>
    <!--#include virtual="body.html" -->
    <div id="react"></div>
  </body>
</html>

```

### Use the library in Jitsi project

For existing installations and typical deployments you can simply add a few lines to the end of the `meet-[your-domain]-config.js` configuration file. This is usually located under `/etc/jitsi/meet` in the Debian installation.

#### Edit config.js in your already installed jitsi-meet

1. Goto your `config.js` file from jitsi-meet `config` folder.

```shell
nano /etc/jitsi/meet/meet.my.domain-config.js
```

2. Add these two implementation specific variable at the very end of the file.

```javascript
config.analytics.observerPoolingIntervalInMs = 1000
config.observerWsEndpoint = "wss://{OBSERVER_WS_ENDPOINT}/service_uuid/media_unit_id/stats_version/json"
```

Make sure to specify your `service_uuid` and a unique string for `media_unit_id` to identify this specific Jitsi Meet instance. 

3. You need to set the `{OBSERVER_WS_ENDPOINT}` based on the observer deployment, you can set this later after you deploy Observer in your environment. 

#### Docker builds

Do the following if you are building from Docker.

1. You will need to pass the integration specific configuration using `config.js` before building the container. Goto your jitsi-meet `settings-config.js`and add the following:

```javascript
// observer rtc related config

{{ if .Env.POOLING_INTERVAL_IN_MS -}}
config.analytics.observerPoolingIntervalInMs = '{{ .Env.OBSERVER_POOLING_INTERVAL_IN_MS }}';
{{ end -}}


{{ if .Env.OBSERVER_WS_ENDPOINT -}}
config.observerWsEndpoint = '{{ .Env.OBSERVER_WS_ENDPOINT }}';
{{ end -}}
```

Now, if we build a new jitsi-meet container, these two environment variable will be present in `config.js` when jitsi-meet is loaded.

2. You need to set the `{OBSERVER_WS_ENDPOINT}` based on the observer deployment, you can set this later after you deploy Observer in your environment. 


### Reload the Jitsi Meet page from browser to apply changes. Jitsi Meet now integrated. 





