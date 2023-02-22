# Tyzen9 Electron & React Boilerplate

This Electron React Boilerplate 

# Common Questions
## "Network.loadNetworkResource Failed." Errors
These errors will appear in the console if the Brower has "Enable JavaScript Source Maps" enabled.
```
[40476:0221/210559.296:ERROR:CONSOLE(1)] "Request Network.loadNetworkResource failed. {"code":-32602,"message":"Unsupported URL scheme"}", source: devtools://devtools/bundled/core/protocol_client/protocol_client.js (1)
[40476:0221/210559.297:ERROR:CONSOLE(1)] "Request Network.loadNetworkResource failed. {"code":-32602,"message":"Unsupported URL scheme"}", source: devtools://devtools/bundled/core/protocol_client/protocol_client.js (1)
[40476:0221/210559.297:ERROR:CONSOLE(1)] "Request Network.loadNetworkResource failed. {"code":-32602,"message":"Unsupported URL scheme"}", source: devtools://devtools/bundled/core/protocol_client/protocol_client.js (1)
```
To resolve this, Open Developer Tools, go to "Settings" for Developer Tools, then uncheck `[ ] Enable JavaScript Source maps` under the "Sources" settings.
This that this disables this message, it really does not address the problem at the browser level