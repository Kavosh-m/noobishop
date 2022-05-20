import { Rating } from "@mui/material";
import React from "react";
import { ImSpinner9 } from "react-icons/im";
import { auth } from "../firebase";

const ReviewsDetails = ({
  setComment,
  setEmail,
  setName,
  comment,
  email,
  name,
  commentLoading,
  onSubmitComment,
  allComments,
  ratingValue,
  setRatingValue,
}) => {
  const dateFormatter = (time) => {
    let v = time.toString().split(" ");
    // console.log(time.toString().split(" "));

    return `${v[1]} ${v[2]}, ${v[3]}`;
  };

  const submitDisableEvaluater = () => {
    return auth.currentUser
      ? comment.length < 1
      : name.length < 1 || email.length < 1 || comment.length < 1;
  };

  return (
    <div className="border border-slate-300 p-4">
      <div className="space-y-4">
        {allComments?.map((item, index) => (
          <div
            key={index.toString(36)}
            className="border border-slate-300 px-5 py-2"
          >
            <div className="font-oswald flex items-center space-x-1 text-sm font-bold md:text-base lg:text-lg">
              <p>{item.username}</p>
              <p>-</p>
              <p className="text-sm font-light md:text-base lg:text-lg">
                {dateFormatter(item.uploadTime.toDate())}
              </p>
            </div>
            <Rating
              size="small"
              readOnly
              value={item.ratingStar ? item.ratingStar : 0}
              style={{ color: "#E98C81" }}
              className="mt-1"
            />
            <p className="font-poppins mt-2">{item.commentString}</p>
          </div>
        ))}
      </div>

      {/* Add new comment */}
      <div className={`${allComments.length < 1 ? "mt-0" : "mt-12"}`}>
        <h2 className="font-oswald text-base font-bold lg:text-lg">
          Add a review
        </h2>
        {!auth.currentUser && (
          <p className="my-2">
            Your email address will not be published. Required fields are marked
            *
          </p>
        )}
        <h4 className="font-oswald mb-1 mt-2 font-bold">Your Rating</h4>
        <Rating
          size="small"
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
          style={{ color: "#E98C81" }}
        />

        {/* Form elements */}
        <div className="mt-6 space-y-3">
          {!auth.currentUser && (
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="w-full basis-[48%] space-y-2">
                <p>Name *</p>
                <input
                  placeholder=""
                  className="w-full p-3 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full basis-[48%] space-y-2">
                <p>Email *</p>
                <input
                  placeholder=""
                  className="w-full p-3 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <p>Comment</p>
            <textarea
              className="w-full p-3 outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        {commentLoading ? (
          <ImSpinner9 size="2rem" className="animate-spin" />
        ) : (
          <button
            onClick={onSubmitComment}
            disabled={submitDisableEvaluater() ? true : false}
            className="mt-3 rounded-3xl bg-red-400 px-6 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-slate-300 hover:text-black disabled:bg-slate-300 disabled:text-slate-500"
          >
            SUBMIT
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewsDetails;
