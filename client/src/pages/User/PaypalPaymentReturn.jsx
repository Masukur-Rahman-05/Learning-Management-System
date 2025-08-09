import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CapturePayment } from "@/Redux/user/UserPaymentSlice.js";

const PaypalPaymentReturn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  console.log(paymentId, payerId);

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        console.log(orderId);

        const response = await dispatch(
          CapturePayment({ paymentId, payerId, orderId })
        );

        if (response?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          navigate("/my-courses");
        }
      }

      capturePayment();
    }
  }, [payerId, paymentId]);

  console.log(params);
  return (
    <div className="w-screen h-screen flex justify-center mt-[10%]">
      <div>
        <h1 className="text-3xl font-bold text-blue-500">
          Processing, Please Wait ...{" "}
        </h1>
      </div>
    </div>
  );
};

export default PaypalPaymentReturn;
