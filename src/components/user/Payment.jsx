import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loadScript from "../../utils/loadScript";
import toast from "react-hot-toast";
import { createOrderAPI, verifyPaymentAPI } from "../../api/user";
import { calculateRevenueAPI } from "../../api/user";


function Payment({ children, courseId, setIsEnrolled, onEnroll }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleEnrollCourse = async () => {

      if (!user.loggedIn || !localStorage.getItem("isAuth")) {
        return navigate("/signin?private=true");
      }
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        console.log("Razorpay sdk  failed to load");
        toast.error("something went wrong! please try again later");
        return;
      }
      const result = await createOrderAPI(courseId);
  
      if (!result) {
        console.log("Create Order API failed!");
        toast.error("Something went wrong! please try again later");
        return;
      }
      console.log(result.data.data);
      const {
        amount,
        id: order_id,
        currency,
        orderId: order_id_from_db,
      } = result.data.data;
  
      console.log(amount, currency, order_id_from_db);
      const options = {
        key: "rzp_test_rwud39pugiL6zo",
        amount: amount.toString(),
        currency: currency,
        name: "Brain Bosster",
        description: "Complete the Payment for your course",
        order_id: order_id,
        handler: async function (response) {
          console.log(response);
          const body = {
            course_id: courseId,
            order_creation_id: order_id,
            order_id_from_db,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          const result = await verifyPaymentAPI(body);
          if (!result?.data?.signatureIsValid ||result?.data?.signatureIsValid === false) {
            toast.error("Payment Verification Failed ", {
              duration: 1000,
            });
            return
          }

          toast.success("Payment Successful", {
            duration: 1000,
          });
          setIsEnrolled(true);
          try {
            await calculateRevenueAPI(order_id_from_db);
            console.log("Revenue calculated successfully");
          } catch (error) {
            console.error("Error processing revenue:", error);
            toast.error("Failed to calculate revenue. Please contact support.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#1a56db",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
  
    return (
      <button
        onClick={() => handleEnrollCourse()}
        className="mt-10 block w-full rounded-md bg-green-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {children}
      </button>
    );
  }
  export default Payment;
  