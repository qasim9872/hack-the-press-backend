import { GEOLOCATION_API_KEY, GEOLOCATION_BASE_URL, GEOLOCATION_PLACES_BASE_URL } from "@root/config/location.config"
import axios from "axios"
import q from "query-string"

export const format = (lookup: { [key: string]: any }) => {
  return {}
}

export const lookup = async (lat: number, long: number) => {
  const queryString = q.stringify({
    latlng: [lat, long].join(","),
    key: GEOLOCATION_API_KEY,
  })

  const apiUrl = [GEOLOCATION_BASE_URL, queryString].join("")

  const results = await axios.get(apiUrl)

  return results.data
}

export const places = async (lat: number, long: number) => {
  // location=25.2679425%2C55.3219123999999743&rankby=distance&key=YOUR_API_KEY

  const queryString = q.stringify({
    location: [lat, long].join(","),
    // radius is not allowed when rankby is set to distance
    // radius: 5000, // max is 50 000 meters
    rankby: "distance",
    key: GEOLOCATION_API_KEY,
  })

  const apiUrl = [GEOLOCATION_PLACES_BASE_URL, queryString].join("")

  const { data } = await axios.get(apiUrl)
  const { results } = data

  const placesNearby = []
  for (const place of results) {
    // hack for demo so newspeak house is always on the top
    if (place.name === "Newspeak House") {
      placesNearby.unshift(place.name)
    } else {
      placesNearby.push(place.name)
    }
  }

  return placesNearby
}
