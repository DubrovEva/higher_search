import type { LoaderFunction, ActionFunction } from "@remix-run/node";

// todo: разобраться с переменными окружения
// const ORIGIN = process.env.NODE_ENV === "production" ?  "http://server:8080" : "http://localhost:8080";
const ORIGIN = "http://0.0.0.0:8080"//"http://server:8080"

const proxyRequest = (request: Request) => {
    const { pathname } = new URL(request.url); // localhost/api/router.Router/...
    const newPath = pathname.replace(/^\/api\//, "/");
    const { href } = new URL(newPath, ORIGIN);  // server/router.Router/...

    return new Request(href, request);
};

export const loader: LoaderFunction = async ({ request }) =>
    fetch(proxyRequest(request));

export const action: ActionFunction = ({ request }) =>
    fetch(proxyRequest(request));