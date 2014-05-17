---
layout: setup
title: Process
permalink: /process/
---

First, the server will initialize itself.


After that, the server will wait for a WebDAV request to come in.

Then, the request will be processed and we go to the method handlers.

Each method has its own method handler.


## HttpListener ##

With the HttpListener we can listen to a specific url with a specific port.
This will be our listener for the entire time the server runs.

## Status codes ##

The statuscodes used are the HttpStatuscodes.
The description of the statuscode is needed, you can use the HttpWorkerRequest to get the string value of the status code.

The statuscodes specific for WebDAV (like ... ) have we implemented ourselves as an enum.
The description of the WebDAV status codes can also be getted with the HttpWorkerRequest.


## Method handlers ##
Every method handler needs to be derived from iwebdavmethodhandler

The two needed items in this a method handler are the Property for the Names
And the process method.

That process method has parameters like the context, server and store.




That method returns an WebResponse.

To just send a simple response, you can also use the context.SendSimpleResponse method.
The SendSimpleResponse method sends a response with the statuscode 200 OK in it.
If some other statuscode is needed. You can add the statuscode as a parameter.



## this and that ##



## How authentication is being done. ##

Standard, the server will make use of the Negotiate authentication.
This is defined in the standard constructor of HttpListenerAdapter.

    public HttpListenerAdapter()
    {
        _listener = new HttpListener();
        _listener.AuthenticationSchemes = AuthenticationSchemes.Negotiate;
        _listener.UnsafeConnectionNtlmAuthentication = false;
    }

When this is initialized, the server processes requests with authentication.
When a request is received, in the WebDAV server the thread will receive the Identity of the user.
That way, the user can be impersonated when the file system is being accessed.

    // For authentication
    Thread.SetData(Thread.GetNamedDataSlot(WebDavServer.HttpUser), context.AdaptedInstance.User.Identity);

In the DiskStore classes, so in the thread, the user is being impersonated with the given Identity

    // Impersonate the current user and move the file
    WindowsImpersonationContext wic = Identity.Impersonate();
    File.Move(sourceItemPath, destinationItemPath);
    wic.Undo();


## If there is an error ##

We We have defined some exceptions to go allong with the HTTP en WebDAV status codes.
If more exceptions with statuscodes are needed, you just add a new class.
Change the name. Implement the WebDavException and you just need to add the standard constructor.

Here is an example of the WebDavConflictException, which is derived from the WebDavException class.
The exception is Serializable.
by default the message is null and the innerException too.
With the base class we set the statuscode to the conflict statuscode.

    [Serializable]
    public class WebDavConflictException : WebDavException
    {
        public WebDavConflictException(string message = null, Exception innerException = null)
            : base(HttpStatusCode.Conflict, message, innerException)
        {
            // Do nothing here
        }
    }


## How to build up the response ##

With the context, there is also a response property.
We set it at the end of our method handler.




-----------------------

from setup-server.md


But if you want to make use of another authentication scheme, you can add it to the WebDavServer instance.

    HttpListener listener = new HttpListener();
    listener.AuthenticationSchemes = AuthenticationSchemes.Basic;
    WebDavServer server =
        new WebDavServer(new WebDavDiskStore("your_local_path"), listener);