var STORES_DATA = null;

function stores_get_success(data) {
  STORES_DATA = data;
}

function stores_get_error(jqXHR) {
  if (jqXHR.status != 200) {
    alert("Erro ao carregar lista de lojas");
  }
}

function stores_get() {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: "/static/data/lojas.json",
    success: stores_get_success,
    error: stores_get_error
  });
}

function stores_get_list(state) {
  stores = [];
  for(var i = 0; i < STORES_DATA.length; i++) {
    if (STORES_DATA[i].state == state) {
      stores.push(STORES_DATA[i]);
    }
  }
  return stores;
}

function stores_unique_cities(stores) {
  cities = [];
  for(var i = 0; i < stores.length; i++) {
    var store = stores[i];
    if (! cities.includes(store.city)) cities.push(store.city);
  }
  cities = cities.sort();
  return cities;
}

function stores_by_city(stores, city) {
  filtered_stores = [];
  for(var i = 0; i < stores.length; i++) {
    var store = stores[i];
    if (store.city == city) filtered_stores.push(store);
  }
  return filtered_stores;
}

function stores_city_html(city) {
  return '<div class="store-city">' + city + '</div>';
}

function linkify(text) {
  var replace_pattern = /(\b(https):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  text = text.replace(replace_pattern, '<a href="$1" target="_blank">$1</a>');

  return text;
}

function stores_store_html(store) {
  return '<div class="store-item">' +
    '<div class="store-name">' + store.name + '</div>' +
    '<div class="store-address">' + linkify(store.address) + '</div>' +
    '<div class="store-postal-code">' + store.postal_code + '</div>' +
    '</div>';
}

function store_change() {
  var state = $("#estado_field").val();
  var stores = stores_get_list(state);
  var cities = stores_unique_cities(stores);

  var target_div = $('#store-content');
  target_div.empty();

  for(var i = 0; i < cities.length; i++) {
    var city = cities[i];
    target_div.append(stores_city_html(city));

    city_stores = stores_by_city(stores, city);
    for (var j = 0; j < city_stores.length; j++) {
      var store = city_stores[j];
      target_div.append(stores_store_html(store));
    }
  }
}

$( document ).ready(function() {
  stores_get();
  $('#estado_field').change( function(e) {e.preventDefault(); store_change(); return false; } );
});
