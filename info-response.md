---
layout: info
title: Response
permalink: /info/info-response/
prev_section: /info/info-statuscodes
---

Each WebDAV method sends, after processing the request, a response as an instance of the [WebResponse][1] class of the [System.Net][2] namespace.
A WebDAV method can either send a response with a body, or without one.

## Response without a body ##

To send a response without a body, the IHttpListenerContext has a method called SendSimpleResponse.
This method can have an HTTP status code as a variable, which is by default the status code 200 OK.

In the example below, the status code 201 Created will be send to the client.

    context.SendSimpleResponse(HttpStatusCode.Created);

## Response with a body ##

To send a response with a body, you first need to set the headers of the response to the correct value. These headers are, for example, the content length and the content type.

In the example below, the XML body of the response is converted to a byte array. Then, the status code and status description are set to the Multi-Status status code.
The content length and content type are added. With an output stream, the response is written to the client and the response is closed.

    private void SendResponse(IHttpListenerContext context,
        XmlDocument responseDocument)
    {
        // convert the XmlDocument
        byte[] responseBytes = Encoding.UTF8.GetBytes(responseDocument.InnerXml);

        // set the status code and status description
        context.Response.StatusCode = (int)WebDavStatusCode.MultiStatus;
        context.Response.StatusDescription =
            HttpWorkerRequest.GetStatusDescription(
            (int)WebDavStatusCode.MultiStatus);

        // add the content length
        context.Response.ContentLength64 = responseBytes.Length;
        context.Response.AdaptedInstance.ContentType = "text/xml";

        // write and close the response
        context.Response.OutputStream.Write(responseBytes, 0,
            responseBytes.Length);
        context.Response.Close();
    }

  [1]: http://msdn.microsoft.com/en-us/library/system.net.webresponse.aspx
  [2]: http://msdn.microsoft.com/en-us/library/system.net.aspx
