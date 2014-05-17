---
layout: info
title: Info Authentication
permalink: /info/info-authentication/
---

By default, the server will make use of the [Negotiate authentication scheme][1].
This is defined in the standard constructor of HttpListenerAdapter.

    public HttpListenerAdapter()
    {
        _listener = new HttpListener();
        _listener.AuthenticationSchemes = AuthenticationSchemes.Negotiate;
        _listener.UnsafeConnectionNtlmAuthentication = false;
    }

If a client wants to connect to the server, it must send its credentials by following the Negotiate authentication scheme.

When the server receives a request with the credentials included, the server will start a thread to process the request, but first, the credentials are added to the data of the thread. That way we can access the credentials in the thread itself.

    Thread.SetData(Thread.GetNamedDataSlot(WebDavServer.HttpUser),
        context.AdaptedInstance.User.Identity);

After starting the tread and trying to access the file system, we need to check if the user has access to that particular file or folder.
So we impersonate the user with the credentials we’ve just set on the thread. This impersonation will be done with the [WindowsImpersonationContext][2] class in the DiskStore classes.

    WindowsImpersonationContext wic = Identity.Impersonate();
    // file or folder operations here
    wic.Undo();

  [1]: http://msdn.microsoft.com/en-us/library/system.net.authenticationschemes(v=vs.110).aspx
  [2]: http://msdn.microsoft.com/en-us/library/system.security.principal.windowsimpersonationcontext.aspx
