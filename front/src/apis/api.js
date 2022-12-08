import {get, post} from "./http.js"

export const getResult = (query) => {
    return post("/search/" + query)
}

export const testConnect = (params) => {
    return get("/" + params)
}