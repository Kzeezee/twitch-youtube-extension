import axios from "axios";
import { TwitchAccessToken } from "../const/types";
import qs from 'qs'

export var CurrentTwitchAccessToken: TwitchAccessToken | null = null;

export async function renewTwitchAccessToken() {
    try {
        const {data} = await axios({
            method: 'post',
            url: 'https://id.twitch.tv/oauth2/token',
            data: qs.stringify({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials'
            }),
            responseType: 'json',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Axios error: ", error.message);
            return error.message;
        } else {
            console.log("Unexpected error: ", error);
            return "An unexpected error has occured";
        }
    }
}