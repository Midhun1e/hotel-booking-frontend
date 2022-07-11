import apiClient from "./httpService";

export function getCurrentlyStaying(values) {
  return apiClient.get("/restaurant/booking/staying", values);
}

export function getFoodItems() {
  return apiClient.get("/restaurant/booking/fooditems");
}

export function getRestaurant(values) {
  return apiClient.get("/restaurant/signin", values);
}

export function saveFoodItems(values) {
  return apiClient.post("/restaurant/booking/fooditems",values);
}

export function addFoodItemstoBill(values) {
  return apiClient.post("/restaurant/booking/addtobill",values);
}

export function restaurantSignin(values) {
  return apiClient.post("/restaurant/signin", values);
}

export function restaurantSignup(values) {
  return apiClient.post("/restaurant/signup", values);
}

export function restaurantChangePassword(values) {
  return apiClient.post("/restaurant/changePassword", values);
}

export function editRestaurantData(values) {
  return apiClient.put("/restaurant/signup", values);
}