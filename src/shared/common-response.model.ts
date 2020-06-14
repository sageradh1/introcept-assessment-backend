//Use a common response a pattern for API consumers and for logging 
export class CommonResponse{
    constructor(
        public path: string,  //which endpoint
        public method:string,
        public statusCode: number,
        public status: string, //for only Success or Failure
        public timestamp: string,
        public data: {},  //Inside will be relevant information or data
      ) {}

}