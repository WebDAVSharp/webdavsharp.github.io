---
layout: info
title: Info Exceptions
permalink: /info/info-exceptions/
---

The WebDAV server has some exceptions included which are mapped to HTTP or WebDAV status codes.

The WebDavException is derived from the [HttpException][1] class and it’s also the base class of every other exception in the solution.

As an example, the WebDavConflictException class is shown below.
The class has been made serializable and is derived from the WebDavException class.
Within the class, there is a constructor with the message and the inner exception as variables, which are null by default.
In this constructor, the constructor of the base class WebDavException will be called and the corresponding status code is set to the exception, along with the given message and inner exception.

    [Serializable]
    public class WebDavConflictException : WebDavException
    {
        public WebDavConflictException(string message = null,
            Exception innerException = null)
            : base(HttpStatusCode.Conflict, message, innerException)
        {
            // Do nothing here
        }
    }

The exceptions that are currently derived from the WebDavException class:

* WebDavConflictException (409 Conflict)
* WebDavForbiddenException (403 Forbidden)
* WebDavInternalServerException (500 Internal Server Error)
* WebDavLengthRequiredException (411 Length Required)
* WebDavMethodNotAllowedException (405 Method Not Allowed)
* WebDavNotFoundException (404 Not Found)
* WebDavNotImplementedException (501 Not Implemented)
* WebDavPreconditionFailedException (412 Precondition Failed)
* WebDavUnauthorizedException (401 Unauthorized)
* WebDavUnsupportedMediaTypeException (415 Unsupported Media Type)

If another exception is required, one can always be added.


  [1]: http://msdn.microsoft.com/en-us/library/system.web.httpexception.aspx
