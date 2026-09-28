import { ServerResponse } from "node:http";
export default function send (
    response:ServerResponse,
    satatusCode: number,
    body:unknown

):void{
    response.writeHead(
        satatusCode,
        {'content-type': 'application/jason'}
    );
    response.end(JSON.stringify(body));
}