import * as React from "react";
import { LexicalRichText } from "@yext/react-components";

type Props = {
  prop1: any;
  prop2: any;
};

const Card = (Data: Props) => {
  console.log(Data.prop2,"Data2 ")
  
  return (
    <>
      <div className="about-sec">
        <div className="container">
          <div className="about-content">
            <h3 className="sec_heading">{Data.prop1 ? Data.prop1 : ""}</h3>
            {/* <p dangerouslySetInnerHTML={{__html: Data.prop2 ? Data.prop2 : ""}} />              */}
            <LexicalRichText serializedAST={JSON.stringify(Data?.prop2?.json)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
