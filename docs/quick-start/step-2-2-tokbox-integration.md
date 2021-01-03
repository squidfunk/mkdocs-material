#Stats Collection for TokBox

### OpenTok Quickstart <a name="opentok-quickstart"></a>

#### Include core library 

You should do this before including `opentok.js` file in your html page. We have a public version hosted on GitHub you can use as shown below.

```html 
    <script src="https://observertc.github.io/observer-js/dist/v0.3.5/observer.min.js"></script>
```
#### Define server endpoint in global( window ) scope

```html
    <script>
        let observerWsEndPoint = ObserverRTC.ParserUtil.parseWsServerUrl(
            "{OBSERVER_WS_ENDPOINT}",               // observerURL
            "{ServiceUUID}",                        // Add a unique ServiceUUID here
            "{Your_Service_name}",                  // MediaUnitID
            "v20200114"                             // getStats-version
        );
    </script>
```
#### Include the integration library

1. Minified version: 
    ```html 
    <script src="https://observertc.github.io/integrations/dist/v0.0.2/tokbox.integration.min.js"></script>
    ```
2. In the end it might look similiar to this
    ```html
        <html>
        <body>
      <!--  
      .....
      .....
      -->      
        <script src="https://observertc.github.io/observer-js/dist/v0.3.5/observer.min.js"></script>
        <script>
        let observerWsEndPoint = ObserverRTC.ParserUtil.parseWsServerUrl(
            "ws://localhost:8088/",           // observerURL
            "b8bf0467-d7a9-4caa-93c9-8cd6e0dd7731", // Add a unique ServiceUUID here
            "opentok-demo",                         // MediaUnitID
            "v20200114"                             // StatsVersion
        );
        </script>
        <script src="https://observertc.github.io/integrations/dist/v0.0.2/tokbox.integration.min.js"></script>
        <script src="https://static.opentok.com/v2/js/opentok.js" charset="utf-8"></script>
    ```