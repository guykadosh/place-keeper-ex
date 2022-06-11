'use strict'

const KEY_PLACES = 'placeDB'

let gPlaces
let gMarkers = []

_createPlaces()

function getPlaces() {
  return gPlaces
}

function addPlace(coords, name) {
  const place = _createPlace(coords, name)
  gPlaces.push(place)

  _savePlacestoStorage()

  return place
}

function removePlace(placeId) {
  const placeIdx = gPlaces.findIndex(place => placeId === place.id)

  gPlaces.splice(placeIdx, 1)

  _savePlacestoStorage()
}

function getPlace(placeId) {
  return gPlaces.find(place => place.id === placeId)
}
function getAsCSV() {
  let csvStr = `Id, lat, lng, Name`
  gPlaces.forEach(place => {
    const csvLine = `\n${place.id}, ${place.coords.lat}, ${place.coords.lng}, ${place.name}`
    csvStr += csvLine
  })
  return csvStr
}

function pushMarker(marker) {
  gMarkers.push(marker)
}

function removeMarker(markerId) {
  const markerIdx = gMarkers.findIndex(marker => marker.id === markerId)

  return gMarkers.splice(markerIdx, 1)[0]
}

function _createPlaces() {
  let places = _loadPlacesFromStorage()

  if (places) {
    gPlaces = places
    return
  }

  places = [
    _createPlace({ lat: 32.1416, lng: 34.831213 }, 'Chernick House'),
    _createPlace({ lat: 29.9967317, lng: 34.9149277 }, 'Kolker House'),
    _createPlace({ lat: 31.70846, lng: 35.1976055 }, 'Shmukler House'),
    _createPlace({ lat: 36.1416, lng: 38.831213 }, 'Shmaryahu House'),
  ]

  gPlaces = places

  _savePlacestoStorage()
}

function _createPlace(coords, name) {
  return { id: makeId(4), coords, name }
}

function _loadPlacesFromStorage() {
  return loadFromStorage(KEY_PLACES)
}

function _savePlacestoStorage() {
  saveToStorage(KEY_PLACES, gPlaces)
}
