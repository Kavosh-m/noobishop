import caro1 from "../assets/images/caro1.jpg";
import caro2 from "../assets/images/caro2.jpg";
import caro3 from "../assets/images/caro3.jpg";
import ex from "../assets/images/excited.png";
import { Link } from "react-router-dom";

const caroImages = [
  {
    id: "jfjdhfjygg7",
    content: <img src={caro1} alt="" className="h-full w-full object-cover" />,
  },
  {
    id: "eyhfgbsgdbcj77",
    content: <img src={caro2} alt="" className="h-full w-full object-cover" />,
  },
  {
    id: "ppkkmnjuhetf098",
    content: <img src={caro3} alt="" className="h-full w-full object-cover" />,
  },
  //   {
  //     id: "vmikggfhdghgty8888",
  //     content: (
  //       <Link
  //         to="/products/CP19Fe4orzHElxvlrgLA"
  //         className="flex h-full items-end justify-center bg-yellow-200"
  //       >
  //         <p>SPECIAL OFFER</p>
  //         <img src={ex} alt="" className="aspect-square h-[90%] object-fill" />
  //       </Link>
  //     ),
  //   },
];

export const logo = require("../assets/images/logo2.png");
export const shopHeader = require("../assets/images/shop_header.jpg");
export { caroImages };
