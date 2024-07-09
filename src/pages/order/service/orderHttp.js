import axios from "axios";

// Tạo ra một đối tượng HttpClient
const OrderHttp = axios.create({
    baseURL: "http://localhost:8080/route/api/place-order", // URL mà tất cả các Http sẽ gửi đến
    timeout: 3600000, // Thời gian chờ là 3.600.000 mili giây = 1h
    headers: {
        // Gắn các thông tin sau vào header
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

OrderHttp.interceptors.response.use(
    // Xử lý các request trước khi chúng được gửi đi, hoặc sử lý các response trước khi chúng được đưa vào request
    (response) => {
        console.log("response: ", response);
        return response;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

export default FundiinHttp;
