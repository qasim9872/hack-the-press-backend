import config from "config"

export const GEOLOCATION_BASE_URL = config.get<string>("GEOLOCATION.BASE_URL")
export const GEOLOCATION_PLACES_BASE_URL = config.get<string>("GEOLOCATION.PLACES_BASE_URL")
export const GEOLOCATION_API_KEY = config.get<string>("GEOLOCATION.API_KEY")
