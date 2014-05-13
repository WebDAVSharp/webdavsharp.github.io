---
layout: setup
title: Setup Server
permalink: /setup/setup-server/
prev_section: /setup
next_section: /setup/setup-carotdav
---

On this page you can find the explanation of how to configure your WebDAV server.

## Guide ##

### Step 1 ###

Create a new application in Visual Studio, a console application for example.

### Step 2 ###

Add references to the .dll file of the WebDAVSharp server.

### Step 3 ###

To make the logger work, you first need to get the [Common.Logging][1] NuGet package.
You can simply download it from the NuGet Package Manager in Visual Studio.

After that, you need to add the configuration for the logger.
In the code below, you can find the configuration code for a console logger,
but more Common.Logging configurations can be found [here][2].

    using System.Collections.Specialized;
    using Common.Logging;

    // create properties
    NameValueCollection properties = new NameValueCollection();
    properties["showDateTime"] = "true";
    // set Adapter
    LogManager.Adapter =
        new Simple.ConsoleOutLoggerFactoryAdapter(properties);

### Step 4 ###

The WebDAV server needs administrator rights, that is why you need to ask for them in your manifest file.
Simply add the following code to the manifest, but place it as high as possible in the file.
Otherwise, it might not work.

    <security>
        <requestedPrivileges xmlns="urn:schemas-microsoft-com:asm.v3">
            <requestedExecutionLevel
                level="requireAdministrator"
                uiAccess="true" />
        </requestedPrivileges>
    </security>

### Step 5 ###

When the configuration for the logger is implemented,
and the request for administrator rights is added in the manifest file,
then you can start the server.

First you need to create a new instance of the WebDavServer and add some values to the instance.
The following code shows how it needs to be done.
You can replace "your_local_path" with, for example: `c:\`.
And you can replace "http://your_url_here/" with, for example: `http://localhost/`.
Of course, you can add a port number to the URL, for example: `http://localhost:3000/`.

    WebDavServer server =
        new WebDavServer(new WebDavDiskStore("your_local_path"));
    server.Listener.Prefixes.Add("http://your_url_here/");
    server.Start();

### Step 6 ###

Run your application and you're finished.

## Sample project ##

Link to sample project : COMING SOON

## OPTIONAL: Authentication configuration ##

The standard authentication configuration of the WebDAVSharp server is the [Negotiate authentication scheme][3].

But if you want to make use of another authentication scheme, you can add it to the WebDavServer instance.

    HttpListener listener = new HttpListener();
    listener.AuthenticationSchemes = AuthenticationSchemes.Basic;
    WebDavServer server =
        new WebDavServer(new WebDavDiskStore("your_local_path"), listener);


  [1]: http://netcommon.sourceforge.net/
  [2]: http://netcommon.sourceforge.net/docs/2.1.0/reference/html/ch01.html#logging-configuring-in-code
  [3]: http://msdn.microsoft.com/en-us/library/system.net.authenticationschemes(v=vs.110).aspx