import axios from "axios";

const API_URL = "http://localhost:8080/order/api/create";
const API_ROUTE_URL = "http://localhost:8080/route/api/place-order";

class CheckoutService {
    InitPayment(checkoutInfo) {
        console.log("Checkout Info: ", checkoutInfo);
        return axios.post(`${API_ROUTE_URL}`, checkoutInfo);
    }

    GetRouteById(routeId) {
        console.log("RouteId: ", routeId);
        return axios.get(`${API_URL}/${routeId}`);
    }
}

export default new CheckoutService();
