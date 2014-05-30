---
layout: info
title: Method Handlers
permalink: /info/info-methodhandlers/
prev_section: /info/info-httplistener
next_section: /info/info-authentication
---

Every WebDAV method should have a method handler in the WebDAV# server.
Also, every WebDAV method handler has the IWebDavMethodHandler interface implemented and is derived from the WebDavMethodHandlerBase.

A WebDAV method handler is defined by a property called Names, where you can find the name of the handled WebDAV method, and the method called ProccesRequest.
This last method will implement all the functionality for processing and executing the request. It will also send a response to the client
You can see the signatures in the code below.

    public IEnumerable<string> Names;
    public void ProcessRequest(WebDavServer server,
        IHttpListenerContext context, IWebDavStore store);

The Names property is very important, because the WebDavMethodHandlers class will scan the assembly and check for method handlers.
It will include the method handlers who have the IWebDavMethodHandler interface implemented and map it to the name that is defined in the Names property.

The method handlers which are currently available in the solution:

* WebDavCopyMethodHandler (COPY method)
* WebDavDeleteMethodHandler (DELETE method)
* WebDavGetMethodHandler (GET method)
* WebDavHeadMethodHandler (HEAD method)
* WebDavLockMethodHandler (LOCK method)
* WebDavMkColMethodHandler (MKCOL method)
* WebDavMoveMethodHandler (MOVE method)
* WebDavOptionsMethodHandler (OPTIONS method)
* WebDavPropfindMethodHandler (PROPFIND method)
* WebDavProppatchMethodHandler (PROPPATCH method)
* WebDavPutMethodHandler (PUT method)
* WebDavUnlockMethodHandler (UNLOCK method)
