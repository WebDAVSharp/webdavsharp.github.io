---
layout: info
title: Info Http Listener
permalink: /info/info-httplistener/
prev_section: /info
next_section: /info/info-methodhandlers
---

The [HttpListener][1] instance, of the [System.Net][2] namespace, in the WebDAV server listens to a specific port of a specific URL.

In the constructor of the HttpListenerAdapter, the listener receives the Negotiate authentication scheme by default.

    public HttpListenerAdapter()
    {
        _listener = new HttpListener();
        _listener.AuthenticationSchemes = AuthenticationSchemes.Negotiate;
        _listener.UnsafeConnectionNtlmAuthentication = false;
    }

After initializing the listener, the URL to listen to still needs to be set.

In the following example, the server instance is initialized, so the HttpListener of the server is also initialized. So after that, the listener is addressed and the required URL is added to the prefixes of the listener. Now, the server listens to the given URL.

    WebDavServer server = new WebDavServer(new WebDavDiskStore(“your_path_here”));
    server.Listener.Prefixes.Add(“your_url_here”);

  [1]: http://msdn.microsoft.com/en-us/library/vstudio/system.net.httplistener
  [2]: http://msdn.microsoft.com/en-us/library/vstudio/system.net