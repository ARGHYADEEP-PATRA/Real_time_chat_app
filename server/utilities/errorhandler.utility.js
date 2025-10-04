class errorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode;
        Error.captureStackTrace(this,this.constructor)
    }
}

export const errorhandler=errorHandler;


/*  
without Error.captureStackTrace :-
if you did not use this line , the error report would include unnessacery tecnical data 
like where the error handler class itself is defind.
That is not very helpful when you trying to debug.

with error.capturestacktrace ,you're saying :
'skip all the setup details and just show me where the  error actually happened in the program
*/