/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import services from "./service/service";
import { IconButton, Divider } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Autocomplete from "@mui/material/Autocomplete";
import sampleImage from "../../assets/Artboard 2-8.png";
import axios from "axios";

import {
    Box,
    Button,
    Container,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Alert,
    Snackbar,
    AlertTitle,
} from "@mui/material";

import { createTheme, alpha, getContrastRatio, ThemeProvider } from "@mui/material/styles";

import "./styles.css";

// Update the Button's color options to include a violet option
const violetBase = "#7a2ed6";
const violetMain = alpha(violetBase, 0.8);

const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            // main: fundiinLogoColor,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
        },
    },
});

const source = ["BX An Suong", "BX Mien Tay", "BX Mien Dong"];

const destination = ["Da Lat", "Suoi Linh", "Tan Phu"];

export default function Demo() {
    const [open, setOpen] = React.useState(false);
    const [qrData, setQrData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [paymentMethod, setPaymentMethod] = React.useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const [snackbarOpenError, setSnackbarOpenError] = React.useState(false);
    const [snackbarOpenSuccess, setSnackbarOpenSuccess] = React.useState(false);
    const [selected, setSelected] = React.useState(null);

    const { routeId } = useParams();

    const navigate = useNavigate();

    const [selectedValueSource, setSelectedValueSource] = useState("");
    const handleAutocompleteChangeSource = (event, newValue) => {
        setSelectedValueSource(newValue);
        console.log("Selected value:", newValue); // You can handle the selected value as needed
    };

    const [selectedValueDes, setSelectedValueDes] = useState("");
    const handleAutocompleteChangeDes = (event, newValue) => {
        setSelectedValueDes(newValue);
        console.log("Selected value:", newValue); // You can handle the selected value as needed
    };

    const initMoney = 290000;
    const [totalMoney, setTotalMoney] = React.useState(
        initMoney.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
        })
    );

    const [data, setData] = React.useState({
        phone: {
            value: "0815743401",
            isValid: true,
        },
        email: {
            value: "merchant.care@fundiin.vn",
            isValid: true,
        },
        fullName: {
            value: "Hoàng Mạnh Cường",
            isValid: true,
        },
    });

    const updateState = (key, value, isValid) => {
        setData((previousData) => ({
            ...previousData,
            [key]: {
                value,
                isValid,
            },
        }));
    };

    const [routeData, setRouteData] = React.useState({});
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/route/api/" + routeId);
                setRouteData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Gọi hàm fetchData
    }, []);

    React.useEffect(() => {
        updateState("phone", data.phone.value, ValidatePhone(data.phone.value) ? true : undefined);
        updateState("email", data.email.value, ValidateEmail(data.email.value) ? true : undefined);
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePhone = (e) => {
        let value = e.target.value;
        updateState("phone", value, ValidatePhone(value));
    };

    const handleChangeName = (e) => {
        let value = e.target.value;
        updateState("phone", value);
    };

    const handleChangeEmail = (e) => {
        let value = e.target.value;
        updateState("email", value, ValidateEmail(value));
    };

    const [selectedValue, setSelectedValue] = React.useState("a");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleCheckbox = (e) => {
        console.log("e.targer.value: ", e.target.value);
        console.log("Payment method: ", paymentMethod);
        setPaymentMethod(e.target.value);
    };

    const [quantity, setQuantity] = React.useState(1); // Số lượng ban đầu

    const handleIncrease = () => {
        setQuantity(quantity + 1);
        const newToltalMoney = (quantity + 1) * 290000;
        const formattedTotalMoney = newToltalMoney.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
        });
        setTotalMoney(formattedTotalMoney);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            const newToltalMoney = (quantity - 1) * 290000;
            const formattedTotalMoney = newToltalMoney.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
            });
            setTotalMoney(formattedTotalMoney);
        }
    };

    const handlePayment = async (e) => {
        const checkoutInfo = {
            phone: data.phone.value,
            fullName: data.fullName.value,
            routeId: routeId,
            email: data.email.value,
            quantity: quantity,
            totalMoney: parseInt(totalMoney.replace(/[^0-9.-]+/g, "")),
            source: selectedValueSource,
            destination: selectedValueDes,
        };

        console.log("Checkout info: ", checkoutInfo);

        if (parseInt(totalMoney.replace(/[^0-9.-]+/g, "")) > 50000000) {
            setError("AMOUNT_EXCEEDED_UPPER_LIMIT");
            setSnackbarOpenError(true);
        } else {
            try {
                await services
                    .InitPayment(checkoutInfo)
                    .then((res) => {
                        console.log("Response: ", res);
                        setSuccess("Checkout sucessfully");
                        setSnackbarOpenSuccess(true);
                        navigate(`/thanh-toan/${res.data.data.orderId}`);
                    })
                    .catch((error) => {
                        console.log("error: ", error);
                        setError(error.response.data.message);
                        setSnackbarOpenError(true);
                    });
            } catch (error) {
                console.log("error: ", error);
                setError("Some thing went wrong");
                setSnackbarOpenError(true);
            }
        }
    };

    const ValidateEmail = (val) => {
        const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(val);
    };

    const ValidatePhone = (val) => {
        const expression = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return expression.test(val);
    };

    const ValidatePayment = () => {
        return paymentMethod === "" ? false : true;
    };

    const handleClick = (id) => {
        setSelected(id);
    };

    const header = (
        <>
            <Grid container spacing={4} alignItems="center" justifyContent={"center"} direction="row">
                <Grid item xs={12} display={"flex"} justifyContent={"space-between"}></Grid>

                <Grid item xs={12} display={"block"}>
                    <Grid item xs={12} display={"block"}>
                        <img src={sampleImage} alt="Sample" style={{ width: "100%", height: "auto" }} />
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ marginBottom: "" }}>
                    <div className="item-name">Thông tin chuyến đi </div>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: "" }}>
                    <div className="">Tuyến xe: {routeData.name}</div>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                    <div>Thời gian xuất bến: {routeData.timeStart} </div>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                    <div>Giá vé: {routeData.price} đ</div>
                </Grid>
            </Grid>
            <Grid container spacing={4} alignItems="center" justifyContent={"center"} direction="row">
                <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                    <Grid item xs={5.5} display={"block"}>
                        <div className="heading3">1. Phone number</div>
                        <div className="body">
                            <TextField
                                required
                                id="outline-required"
                                label="Phone"
                                error={!data.phone.isValid}
                                helperText={data.phone.isValid ? "" : "Phone is invalid"}
                                placeholder="Enter your phone"
                                onChange={(e) => handleChangePhone(e)}
                                size="medium"
                                color="success"
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5.5} display={"block"}>
                        <div className="heading3">2. Email address</div>
                        <TextField
                            label="Email"
                            error={!data.email.isValid}
                            helperText={data.email.isValid ? "" : "Email is invalid"}
                            placeholder="Enter your email"
                            onChange={(e) => handleChangeEmail(e)}
                            size="medium"
                            color="success"
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} display={"block"}>
                    <Grid item xs={5.5} display={"block"}>
                        <div className="heading3">3. Full Name</div>
                        <div className="body">
                            <TextField
                                required
                                id="outline-required"
                                label="Full Name"
                                onChange={(e) => handleChangeName(e)}
                                size="medium"
                                color="success"
                                placeholder="Enter your full name"
                                fullWidth
                            />
                        </div>
                    </Grid>
                </Grid>

                <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                    <Grid item xs={5.5} display={"block"}>
                        <div className="heading3">4. Thông tin điểm đón</div>
                        <div className="body">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={source}
                                onChange={handleAutocompleteChangeSource}
                                sx={{ width: 500 }}
                                renderInput={(params) => <TextField {...params} label="Source" />}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5.5} display={"block"}>
                        <div className="heading3">5. Thông tin điểm trả</div>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={destination}
                            onChange={handleAutocompleteChangeDes}
                            sx={{ width: 500 }}
                            renderInput={(params) => <TextField {...params} label="Destination" />}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                    <div className="item-quantity">
                        <div className="heading3">6. Số lượng:</div>
                        <div className="quantity">
                            <IconButton aria-label="decrease" onClick={handleDecrease}>
                                <RemoveCircleOutlineIcon sx={{ color: "var(--ifm-link-color)" }} />
                            </IconButton>
                            <span className="quantity-show">{quantity}</span>
                            <IconButton aria-label="increase" onClick={handleIncrease}>
                                <AddCircleOutlineIcon sx={{ color: "var(--ifm-link-color)" }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} display={"block"}>
                    <Grid item xs={12} display={"flex"} justifyContent={"right"}>
                        <div className="heading3">Tổng tiền:</div>
                        <div className="heading3 total-money">{totalMoney}</div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );

    const body = (
        <>
            <Grid container alignItems="center" justifyContent={"center"}>
                <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="violet" size="large" onClick={(e) => handlePayment(e)}>
                            <span className="checkout-btn">Thanh toán</span>
                        </Button>
                    </ThemeProvider>
                </Grid>
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
                                    <div className="checkout-title-guild">
                                        {" "}
                                        Pay with <img src={String()} width="60" loading="lazy" /> by QR code{" "}
                                    </div>
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
                            {/* <Grid item xs={12} md={6} >
                <div className="checkout-title-guild">
                  
                  {" "}
                  Pay with <img src={fundiin} width="60" loading="lazy"/> by QR
                  code{" "}
                </div>
                <div className="checkout-detail">

                  <p>
                    <span> <b>Step 1:</b> </span>
                    <span>
                      Open your<strong> Fundiin</strong> app
                    </span>
                  </p>
                  <p>
                    <span> <b>Step 2:</b> </span>
                    <span>
                      Select the <CropFreeTwoToneIcon></CropFreeTwoToneIcon> <strong>Code Scan</strong>
                    </span>
                  </p>
                  <p>
                    <span> <b>Step 3:</b> </span>
                    <span>Confirm payment on app</span>
                  </p>
                </div>

              </Grid> */}
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </>
    );

    return (
        <>
            <Snackbar
                open={snackbarOpenError}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpenError(false)}
                className="custom-snackbar"
            >
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error}</strong>
                </Alert>
            </Snackbar>

            <Snackbar
                open={snackbarOpenSuccess}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpenSuccess(false)}
                className="custom-snackbar"
            >
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    <strong>{success}</strong>
                </Alert>
            </Snackbar>

            {/* Test */}
            <div className="ticket">
                <div className="ticket-header">{header}</div>

                <div className="ticket-body">{body}</div>
            </div>
        </>
    );
}
