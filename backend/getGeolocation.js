navigator.geolocation.getCurrentPosition(success, error);
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    var geolocation = new Array(latitude,longitude)
    console.log(geolocation)
    return geolocation;
}
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};