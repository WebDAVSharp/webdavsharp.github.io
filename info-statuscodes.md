---
layout: info
title: Status codes
permalink: /info/info-statuscodes/
prev_section: /info/info-exceptions
next_section: /info/info-response
---

For the status codes of Http, the WebDAV# server makes use of the [HttpStatusCode][1] enumeration, which is included in the .NET Framework 4.5, in the [System.Net][2] namespace.

The WebDav status codes are defined as an enum in the WebDAV# server, because the HttpStatusCode enumeration is missing the status codes 207 Multi-Status, 422 Unprocessable Entity, 423 Locked, 424 Failed Dependency, 507 Insufficient Storage.

To get the description of these HTTP and WebDAV status codes, the server uses the following method: [HttpWorkerRequest.GetStatusDescription][3] of the [System.Web][4] namespace.

The following example shows how the status code “Multi-Status” is added to the response of a WebDAV method.

    context.Response.StatusCode = (int)WebDavStatusCode.MultiStatus;
    context.Response.StatusDescription =
        HttpWorkerRequest.GetStatusDescription((int)WebDavStatusCode.MultiStatus);

  [1]: http://msdn.microsoft.com/en-us/library/system.net.httpstatuscode(v=vs.110).aspx
  [2]: http://msdn.microsoft.com/en-us/library/system.net(v=vs.110).aspx
  [3]: http://msdn.microsoft.com/en-us/library/system.web.httpworkerrequest.getstatusdescription.aspx
  [4]: http://msdn.microsoft.com/en-us/library/system.web.aspx