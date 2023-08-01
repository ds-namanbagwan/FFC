import { Link } from "@yext/pages/components";
import * as React from "react";

/**
 * Google review section | show restaurant review
 * @param props :data
 * @returns : Html
 */

export const GoogleReview = (props: any) => {
    const {
        placeData,
        googleReviewUrl,
        reviewSectionHeading,
        googleReviewsHeading,
    } = props;
    let percentRating;

    if (placeData != null && placeData?.result?.rating != null) {
        percentRating =
            placeData?.result?.rating && placeData?.result?.rating;
    }

    return (
        <>
            <div className="ratings1 google-reviews">
                <div className="review-inner">
                    {reviewSectionHeading && <h2>{reviewSectionHeading}</h2>}
                    {googleReviewsHeading && <h3>{googleReviewsHeading}</h3>}
                    <div className="star-rating" id="star-rating">
                        {placeData?.result?.rating != null && placeData?.result?.rating ? (
                            <>
                                <div
                                    className="rating-result"
                                    id="rating-result"
                                    title={"percentRating"}>
                                    <span style={{ width: percentRating + "%" }}>
                                        {" "}
                                        <span> </span>{" "}
                                    </span>
                                </div>
                                <span className="star-rating-value">
                                    {placeData.result.rating.toFixed(1).replace(".0", "")}
                                </span>
                                ( {placeData?.result?.user_ratings_total + " Reviews"} )
                                <div className="all-review">
                                    {googleReviewUrl ? (
                                        <Link
                                            target={"_blank"}
                                            className={"uppercase"}
                                            eventName={googleReviewUrl}
                                            data-ya-track={googleReviewUrl}
                                            rel="noopener noreferrer"
                                            href={googleReviewUrl}>
                                        </Link>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
