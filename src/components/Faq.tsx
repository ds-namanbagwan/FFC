import * as React from "react";
import { useEffect, useState } from "react";

type Faq = {
  prop: any;
};

const Faq = (faqData: Faq) => {
  const [faq_Data, setFaq_Data] = useState([]);
  const [faqClass, setFaqClass] = useState("");
  const [leftFaqLen, setLeftFaqLen] = useState(0);

  const [selected, setselected] = useState(null);

  const isShowContent = (e: any, index: any) => {
    setselected(index);
    let parent = e.target.parentNode;
    let parent2 = e.target.parentNode.parentNode;

    if (
      parent.classList.contains("opened") ||
      parent2.classList.contains("opened")
    ) {
      setFaqClass("");
    } else {
      var acc = document.getElementsByClassName("faq-block");
      for (let s = 0; s < -1; s++) {
        acc[s].classList.remove("opened");
      }

      setFaqClass("opened");
    }
  };

  useEffect(() => {
    setFaq_Data(faqData.prop);
    let left = Math.round(faqData.prop.length / 2);

    setLeftFaqLen(left);
  });

  return (
    <>
      <div className="faq-sec bg-light">
        <div className="container">
          <div className="heading text-center">
            <h3 className="sec_heading">FAVORITE QUESTIONS WE'RE ASKED MOST</h3>
            <p className="text-xl">We’re happy to answer your questions!</p>
          </div>

          <div className="faq-blocks">
            <div className="left-faq">
              {faq_Data.map((i: any, index: any) => {
                if (index + 1 <= leftFaqLen) {
                  return (
                    <div
                      id={index}
                      className={
                        selected == index
                          ? `faq-block ${faqClass}`
                          : "faq-block"
                      }
                      key={index}
                    >
                      <h4
                        className="faq-title"
                        onClick={(e) => isShowContent(e, index)}
                      >
                        {i.question} <span className="faq-icon"></span>
                      </h4>

                      <>
                        <div className="faq-content">
                          <p>{i.answer}</p>
                        </div>
                      </>
                    </div>
                  );
                }
              })}
            </div>

            <div className="right-faq">
              <div className="faq-block">
                {faq_Data.map((i: any, index: any) => {
                  if (index + 1 > leftFaqLen) {
                    return (
                      <>
                        <div
                          id={index + 1}
                          className={
                            selected == index + 1
                              ? `faq-block ${faqClass}`
                              : "faq-block"
                          }
                        >
                          <h4
                            className="faq-title"
                            onClick={(e) => isShowContent(e, index + 1)}
                          >
                            {i.question} <span className="faq-icon"></span>
                          </h4>

                          <div className="faq-content">
                            <p>{i.answer}</p>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Faq;
