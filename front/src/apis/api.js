import {get, post} from "./http.js"

export const getResult = () => {
    return post("/getResult", {
        // query: query
    })
}

export const testConnect = () => {
    return get("/")
}