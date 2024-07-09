import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import CircularProgress from "@mui/material/CircularProgress";
import {
    Box,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
} from "@mui/material";
import axios from "axios";

const paymentMethods = [{ name: "MOMO" }, { name: "FUNDIIN" }];

const Demo = () => {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    const [open, setOpen] = useState(false);
    const [qrData, setQrData] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/route/api/get-payment-method/${orderId}`);
                console.log("Response: ", response);
                setOrderData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsFetching(false);
            }
        };

        if (isFetching) {
            fetchData();
        }

        return () => {
            setIsFetching(false);
        };
    }, [isFetching, orderId]);

    const handleMethodChange = (e) => {
        const { value } = e.target;
        setSelectedMethod(value);
        console.log("orderId: ", orderId);
        callApi(value);
    };

    const callApi = async (method) => {
        const paymentUrlBody = {
            orderId: orderId,
            paymentMethod: method,
        };
        try {
            const response = await axios.post("http://localhost:8080/route/api/get-payment-url", paymentUrlBody);
            console.log("Get Payment Url:", response.data.data);
            setQrData(response.data.data);
            handleClickOpen();
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const callOrderStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/route/api/get-order-status/${orderId}`);
            console.log("Order Status:", response.data.data);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="ticket">
            <div className="ticket-header" style={{ marginTop: "50px" }}>
                <Box sx={{ padding: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>
                                Chọn phương thức thanh toán
                            </Typography>
                            <RadioGroup
                                aria-label="payment-method"
                                value={selectedMethod}
                                onChange={handleMethodChange}
                            >
                                {paymentMethods.map((method) => (
                                    <FormControlLabel
                                        key={method.name}
                                        value={method.name}
                                        control={<Radio />}
                                        label={<Box sx={{ display: "flex", alignItems: "center" }}>{method.name}</Box>}
                                    />
                                ))}
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" color="primary" gutterBottom>
                                {orderData.totalAmount ? `${orderData.totalAmount.toLocaleString()}đ` : "Loading..."}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="h6">Thông tin hành khách</Typography>
                                <Divider />
                                <Typography variant="body1">Họ và tên: {orderData.fullName}</Typography>
                                <Typography variant="body1">Số điện thoại: {orderData.phoneNumber}</Typography>
                                <Typography variant="body1">Email: {orderData.email}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="h6">Thông tin lượt đi</Typography>
                                <Divider />
                                <Typography variant="body1">Tuyến xe: {orderData.routeName}</Typography>
                                <Typography variant="body1">Thời gian xuất bến: {orderData.startTime}</Typography>
                                <Typography variant="body1">Điểm lên xe: {orderData.startLocation}</Typography>
                                <Typography variant="body1">Tổng tiền lượt đi: {orderData.totalAmount}đ</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container alignItems="center" justifyContent={"center"}>
                    <Dialog maxWidth="xs" fullWidth={true} open={open} onClose={handleClose}>
                        <DialogTitle>QR Payment</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={6}>
                                <Grid item xs={12} md={12} justifyContent="center" alignItems="center">
                                    <Box
                                        sx={{
                                            textAlign: "center",
                                            fontSize: "1rem",
                                            fontWeight: "700",
                                        }}
                                    >
                                        <QRCode value={qrData} />
                                    </Box>
                                    <Box
                                        pt={4}
                                        alignItems="center"
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <CircularProgress size={20} />
                                        <span className="qr-guild"> Đang chờ bạn quét ...</span>
                                    </Box>
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </div>
        </div>
    );
};

export default Demo;
