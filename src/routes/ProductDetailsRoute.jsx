import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveOrders } from "../redux/app/slices/cartSlice";
import { saveToWishlist } from "../redux/app/slices/wishSlice";
import shopHeader from "../assets/images/banner1.jpg";
import Rating from "@mui/material/Rating";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Drawer from "@mui/material/Drawer";
import { closeSidebar } from "../redux/app/slices/utilSlice";
import Footer from "../components/Footer";
import CustomAlert from "../components/CustomAlert";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import creditCards from "../assets/images/img-payment.png";
import { Tab } from "@headlessui/react";
import ShippingPolicy from "../components/ShippingPolicy";
import ReviewsDetails from "../components/ReviewsDetails";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
  collection,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import ShopCard from "../components/shop/ShopCard";
import LoadingIndicator from "../components/LoadingIndicator";
import ScrollToTop from "../components/ScrollToTop";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// SwiperCore.use([Navigation]);

const ProductDetailsRoute = () => {
  const location = useLocation();

  const burgers = useSelector((state) => state.food.burger);
  const pizzas = useSelector((state) => state.food.pizza);
  const pastas = useSelector((state) => state.food.pasta);
  const drinks = useSelector((state) => state.food.drink);

  const relatedProducts = () => {
    return [burgers[0], pizzas[0], pastas[0], drinks[0]];
  };

  const mayAlsoLikeProducts = () => {
    return [
      burgers[burgers.length - 1],
      pizzas[pizzas.length - 1],
      pastas[pastas.length - 1],
      drinks[drinks.length - 1],
    ];
  };

  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  const [currentCaro, setCurrentCaro] = useState(location.state.gallery[0]);

  const selectedTabClass =
    "w-full h-full bg-red-400 outline-none focus:outline-none text-white";
  const unselectedTabClass =
    "w-full h-full bg-slate-900 text-white outline-none focus:outline-none hover:bg-red-400 transition-colors duration-300 ease-in-out";

  const sidebarStatus = useSelector((state) => state.util.sidebar);
  const orders = useSelector((state) => state.cart.ordered);

  const [unit, setUnit] = useState(() => {
    let g = orders.filter((item) => item.id === location.state.id);

    return g.length > 0 ? g[0].count : 1;
  });
  const [openToast, setOpenToast] = useState(false);
  const [openToastWishlist, setOpenToastWishlist] = useState(false);

  const handleIncrement = () => {
    setUnit(unit + 1);
  };

  const handleDecrement = () => {
    setUnit(unit > 1 ? unit - 1 : 1);
  };

  const handleAddToCart = () => {
    if (unit > 0) {
      dispatch(saveOrders({ ...data, count: unit }));
      setOpenToast(true);
    }
  };

  useEffect(() => {
    dispatch(closeSidebar());
  }, []);

  useEffect(() => {
    setData(location.state);
    setCurrentCaro(location.state.gallery[0]);
    // console.log(location.state);
  }, [location.state]);

  const mainView = useRef();
  // const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  // const [wheelUpTimes, setWheelUpTimes] = useState(0);
  // const handleWheel = (e) => {
  //   if (e.deltaY > 0) {
  //     setShowBackToTopButton(false);
  //   } else {
  //     setShowBackToTopButton(true);
  //     setWheelUpTimes((prevState) => prevState + 1);
  //     // console.log(wheelUpTimes);
  //   }
  // };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [ratingValue, setRatingValue] = useState(2);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentSubmitionSuccessful, setCommentSubmitionSuccessful] =
    useState("");
  const [allComments, setAllComments] = useState([]);

  const onSubmitComment = async (e) => {
    e.preventDefault();

    if (auth.currentUser) {
      setCommentLoading(true);
      // Step 1: get user name
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        // Step 2: add comment to firestore
        await setDoc(
          doc(
            db,
            "foods",
            location.state.category,
            "items",
            location.state.id,
            "comments",
            auth.currentUser.uid
          ),
          {
            commentString: comment,
            uploadTime: Timestamp.now(),
            username: docSnap.data().name,
            isRegisteredUser: true,
            ratingStar: ratingValue,
          }
        );
        setComment("");
        setCommentLoading(false);
        setCommentSubmitionSuccessful(Math.random().toString(36));
      } else {
        setComment("");
        // console.log("No user found!");
        setCommentLoading(false);
      }
    } else {
      setCommentLoading(true);
      // console.log("User is not registered");

      // Add comment from user that not registered
      await addDoc(
        collection(
          db,
          "foods",
          location.state.category,
          "items",
          location.state.id,
          "comments"
        ),
        {
          commentString: comment,
          uploadTime: Timestamp.now(),
          username: name,
          isRegisteredUser: false,
          emailAddress: email,
          ratingStar: ratingValue,
        }
      );
      setName("");
      setEmail("");
      setComment("");
      setCommentLoading(false);
      setCommentSubmitionSuccessful(Math.random().toString(36));
    }
  };

  const fetchAllComments = async () => {
    const q = query(
      collection(
        db,
        "foods",
        location.state.category,
        "items",
        location.state.id,
        "comments"
      ),
      orderBy("uploadTime", "desc")
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      let posts = [];
      querySnapshot.forEach((docc) => {
        // console.log(doc.id, " => ", doc.data());
        posts.push({ ...docc.data() });
      });
      setAllComments(posts);
    }
  };

  useEffect(() => {
    fetchAllComments();
    // console.log(allComments);
  }, [commentSubmitionSuccessful, location.state]);

  const tabularData = [
    {
      title: "DESCRIPTION",
      content:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    },
    {
      title: "REVIEWS",
      content: (
        <ReviewsDetails
          setComment={setComment}
          setEmail={setEmail}
          setName={setName}
          comment={comment}
          email={email}
          name={name}
          commentLoading={commentLoading}
          onSubmitComment={onSubmitComment}
          allComments={allComments}
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
        />
      ),
    },
    { title: "SHIPPING POLICY", content: <ShippingPolicy /> },
  ];

  // useEffect(() => {
  //   console.log(location.state);
  // }, [location.state]);

  //Countdown function
  // const countDown = () => {
  //   // Set the date we're counting down to
  //   var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

  //   // Update the count down every 1 second
  //   var x = setInterval(function () {
  //     // Get today's date and time
  //     var now = new Date().getTime();

  //     // Find the distance between now and the count down date
  //     var distance = countDownDate - now;

  //     // Time calculations for days, hours, minutes and seconds
  //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var hours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     // Output the result in an element with id="demo"
  //     document.getElementById("demo").innerHTML =
  //       days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  //     // If the count down is over, write some text
  //     if (distance < 0) {
  //       clearInterval(x);
  //       return "EXPIRED";
  //     } else {
  //       return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  //     }
  //   }, 1000);
  //   return x;
  // };

  // const [sPerView, setSPerView] = useState(4);
  // const [mediaMd, setMediaMd] = useState(
  //   window.matchMedia("(min-width: 768px)")
  // );

  // const autoSlider = (x) => {
  //   if (x.matches) {
  //     // If media query matche
  //     console.log("grater than 768");
  //     document.getElementById("related").setAttribute("slidesPerView", 2);
  //   } else {
  //     console.log("less than 768");
  //     document.getElementById("related").setAttribute("slidesPerView", 3);
  //   }
  // };

  // useEffect(() => {
  //   autoSlider(mediaMd);
  // }, [mediaMd.matches]);

  if (data === null) {
    return (
      <div className="grid h-screen w-screen place-items-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div
      ref={mainView}
      className="relative flex min-h-screen flex-col justify-between"
    >
      {/* drawer */}
      <Drawer
        anchor="left"
        open={sidebarStatus}
        onClose={() => dispatch(closeSidebar())}
      >
        <Sidebar />
      </Drawer>

      <Navbar />

      {/* Header image goes here */}
      <div className="h-[375px] w-full bg-gray-300">
        <img
          src={shopHeader}
          alt=""
          className="h-full w-full object-fill brightness-50"
        />
      </div>

      <div className="flex flex-1 basis-auto justify-center">
        <div className="mx-2 my-20 max-w-6xl bg-white sm:mx-5 md:mx-10 lg:mx-20">
          <div className="grid w-full grid-cols-2 gap-8">
            <div className="relative col-span-full bg-lime-400/0 lg:col-span-1">
              <img
                src={currentCaro}
                className="aspect-video w-full object-cover"
                alt=""
              />
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={12}
                slidesPerView={4}
                className="mt-3"
              >
                {location.state.gallery?.map((item, index) => (
                  <SwiperSlide
                    key={item}
                    onClick={() =>
                      setCurrentCaro(location.state.gallery[index])
                    }
                    className={`py-2`}
                  >
                    <img
                      src={item}
                      alt=""
                      className={`${
                        index === location.state.gallery.indexOf(currentCaro) &&
                        "border-4 border-sky-300"
                      } aspect-square w-full cursor-pointer object-fill transition-all duration-300 ease-in-out hover:opacity-30`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="col-span-full flex flex-col space-y-10 lg:col-span-1">
              <div className="font-poppins flex flex-col space-y-1 pt-10 lg:pt-0">
                <p className="font-oswald text-2xl font-bold">{data.name}</p>
                <div className="flex items-center justify-start space-x-3">
                  <p className="text-lg">${(data.price * 0.8).toFixed(2)}</p>
                  <p className="text-gray-500 line-through">
                    ${data.price.toFixed(2)}
                  </p>
                </div>
                <Rating
                  size="small"
                  name="four star"
                  className="w-0"
                  defaultValue={4.5}
                  precision={0.5}
                  style={{ color: "#E98C81" }}
                />
              </div>

              <p>
                I must explain to you how all this mistaken idea of denouncing
                pleasure and praising pain was born and I will give you a
                complete account of the system, and expound the actual teachings
                of the great explorer of the truth, the master-builder of human
                happiness.
              </p>
              {/* <p id="demo">{countDown()}</p> */}

              <div className="font-poppins flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                <div className="flex items-center text-base font-semibold">
                  <button
                    onClick={handleDecrement}
                    className="border border-gray-300 p-3 px-4 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    -
                  </button>
                  <div className="font-oswald grid w-14 place-items-center border border-r-0 border-l-0 border-gray-300 py-3">
                    <p>{unit}</p>
                  </div>
                  <button
                    onClick={handleIncrement}
                    className="border border-gray-300 p-3 px-4 transition duration-300 ease-in-out hover:border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="whitespace-nowrap rounded-3xl bg-red-400 p-3 px-4 text-white transition duration-300 ease-in-out hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black/30"
                  >
                    ADD TO CART
                  </button>

                  <button
                    onClick={() => {
                      dispatch(saveToWishlist(data));
                      setOpenToastWishlist(true);
                    }}
                    className="whitespace-nowrap rounded-3xl border-[1px] border-gray-400 bg-white p-3 px-4 text-black transition duration-300 ease-in-out hover:border-red-300 hover:text-red-300"
                  >
                    Add to wishlist
                  </button>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <p className="font-poppins text-base font-semibold">
                    Share :
                  </p>
                  <FaFacebookSquare
                    size="1.85rem"
                    className="cursor-pointer text-blue-800 transition-colors duration-300 ease-in-out hover:text-red-400"
                  />
                  <FaTwitterSquare
                    size="1.85rem"
                    className="cursor-pointer text-blue-400 transition-colors duration-300 ease-in-out hover:text-red-400"
                  />
                  <FaLinkedin
                    size="1.85rem"
                    className="cursor-pointer text-blue-600 transition-colors duration-300 ease-in-out hover:text-red-400"
                  />
                  <FaPinterestSquare
                    size="1.85rem"
                    className="cursor-pointer text-red-600 transition-colors duration-300 ease-in-out hover:text-red-400"
                  />
                </div>
                <img
                  src={creditCards}
                  alt=""
                  className="w-3/5 border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* 4 tab section */}
          <div className="mt-20 w-full bg-indigo-300/0">
            <Tab.Group>
              <Tab.List className="font-poppins flex h-12 bg-blue-900/20 text-xs font-bold uppercase outline-none focus:outline-none sm:text-sm md:text-base">
                {tabularData.map((item) => (
                  <Tab
                    key={item.title}
                    className={({ selected }) =>
                      selected ? selectedTabClass : unselectedTabClass
                    }
                  >
                    {item.title}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                {tabularData.map((item) => (
                  <Tab.Panel
                    className="font-poppins bg-gradient-to-br from-slate-100 to-rose-100 py-9 px-3 text-xs sm:px-5 sm:text-sm md:px-8 md:text-base"
                    key={item.title}
                  >
                    {item.content}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>

          {/* Related product section */}
          <div className="mt-20 w-full bg-indigo-300/0">
            <p className="font-oswald text-center text-xl font-bold">
              RELATED PRODUCT
            </p>
            <p className="font-poppins mt-3 text-center">
              You can check the related product for your shopping collection.
            </p>
            <div className="mt-14 grid grid-cols-1 gap-6 bg-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts().map((item) => (
                <ShopCard key={item.id} showType="grid" data={item} />
              ))}
            </div>
          </div>

          {/* You may also like product section */}
          <div className="mt-20 w-full bg-indigo-300/0">
            <p className="font-oswald text-center text-xl font-bold">
              YOU MAY ALSO LIKE
            </p>
            <p className="font-poppins mt-3 text-center">
              Most of the customers choose our products. You may also like our
              product.
            </p>
            <div className="mt-14 grid grid-cols-1 gap-6 bg-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {mayAlsoLikeProducts().map((item) => (
                <ShopCard key={item.id} showType="grid" data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
      <CustomAlert
        alertType="success"
        message="Added to cart"
        isOpen={openToast}
        onClose={() => setOpenToast(false)}
      />
      <CustomAlert
        alertType="success"
        message="Added to wishlist"
        isOpen={openToastWishlist}
        onClose={() => setOpenToastWishlist(false)}
      />
    </div>
  );
};

export default ProductDetailsRoute;
