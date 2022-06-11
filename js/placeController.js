'use strict'

// window.initMap = initMap

let gMap, gMarker, infoWindow

function initPlace() {
  renderUserColors()
  renderPlaces()
  renderPlacesMarkers()
}

function renderPlaces() {
  const places = getPlaces()

  let strHTMLs = places.map(
    place => `
      <div class="place" onclick="onFocusLocation('${place.id}')">
        <span class="place-name">${place.name}</span>
        <button class="btn-remove" onclick="onRemovePlace(event, '${place.id}')">X</button>
      </div>
`
  )

  document.querySelector('.places').innerHTML = strHTMLs.join('')
}

// Render markers on the map
function renderPlacesMarkers() {
  const places = getPlaces()

  places.forEach(placeMarker)
}

// Initialize and add the map
function initMap() {
  // The location of Eilat
  const eilat = { lat: 29.557867, lng: 34.930034 }

  // The map, centered at Eilat
  gMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: eilat,
  })

  // Set info winow (for errors)
  infoWindow = new google.maps.InfoWindow()

  // Add button for center on current location
  const centerLocationBtn = document.createElement('div')

  createCenterBtn(centerLocationBtn, gMap)
  gMap.controls[google.maps.ControlPosition.TOP_CENTER].push(centerLocationBtn)

  // Handle clicking on center button
  centerLocationBtn.addEventListener('click', onFocusUserLocation)

  // Handle clicking on map
  gMap.addListener('click', onMapClick)

  // The marker, positioned at Eilat
  const marker = new google.maps.Marker({
    position: eilat,
    map: gMap,
  })
}

function onMapClick(e) {
  // Opens modal
  const elModal = document.querySelector('.modal')
  elModal.classList.add('open')

  // focus on user click
  gMarker = placeMarkerAndPanTo(e.latLng, gMap)

  //
  const coords = e.latLng.toJSON()
  elModal.dataset.coords = JSON.stringify(coords)
}

function onAddPlace(ev) {
  ev.preventDefault()

  const elModal = document.querySelector('.modal')
  const name = document.querySelector('[name="place-name"]').value
  let coords = elModal.dataset.coords
  coords = JSON.parse(coords)

  elModal.classList.remove('open')
  if (!name) return

  const place = addPlace(coords, name)

  // Add Marker to list
  gMarker.id = place.id
  gMarker.name = place.name

  pushMarker(gMarker)

  gMarker = ''

  // Update DOM
  renderPlaces()
}

function onRemovePlace(ev, placeId) {
  ev.stopPropagation()

  // Remove Place
  removePlace(placeId)

  // Remove Marker Model
  const marker = removeMarker(placeId)

  // Remove from map
  marker.setMap(null)

  // Update DOM
  renderPlaces()
}

// Place marker on click and move to
function placeMarkerAndPanTo(latLng, map = gMap) {
  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
  })

  map.panTo(latLng)

  return marker
}

// Places marker on the map
function placeMarker({ coords, id, name }) {
  const marker = new google.maps.Marker({
    position: coords,
    map: gMap,
    id,
    title: name,
  })

  marker.addListener('click', () => {
    gMap.setCenter(coords)
    gMap.setZoom(14)
  })

  pushMarker(marker)
}

function onFocusUserLocation() {
  // Try HTML5 geolocation, gets user current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        gMap.setCenter(pos)
        gMap.setZoom(10)
        placeMarker({ pos, id: 0, name: 'Current Place' })
      },
      () => {
        handleLocationError(true, infoWindow, gMap.getCenter())
      }
    )
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, gMap.getCenter())
  }
}

function onFocusLocation(placeId) {
  const place = getPlace(placeId)

  gMap.setCenter(place.coords)
  gMap.setZoom(15)
}

function downloadCSV(elLink) {
  const csvContent = getAsCSV()

  elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}

function createCenterBtn(controlDiv) {
  // Set CSS for the control border.
  const controlUI = document.createElement('div')

  controlUI.style.backgroundColor = '#fff'
  controlUI.style.border = '2px solid #fff'
  controlUI.style.borderRadius = '3px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.cursor = 'pointer'
  controlUI.style.marginTop = '10px'
  controlUI.style.marginBottom = '22px'
  controlUI.style.padding = '5px'
  controlUI.title = 'Click to center the map on your current location'
  controlUI.innerHTML = `<img src="img/location.png" style="height: 30px;">`
  controlDiv.appendChild(controlUI)
}
