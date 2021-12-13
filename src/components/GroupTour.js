/* eslint-disable eqeqeq */
import React from "react";
import CardTour from "./Card/CardTour";
import Empty from "./Empty";

export default function GroupTour({ dataTour, handelRender }) {
  return (
    <div className="c-group-tour container text-dark align-items-enter">
      <p className="text-center main-title py-3">Group Tour</p>
      <div
        style={{ marginTop: "-30px" }}
        className="row justify-content-center"
      >
        {dataTour?.length != 0 ? (
          <>
            {dataTour?.map((d, i) => {
              const newD = JSON.stringify(d).split(",");
              return (
                <CardTour
                  handelRender={handelRender}
                  key={i}
                  d={JSON.parse(newD)}
                />
              );
            })}
          </>
        ) : (
          <Empty header={false} />
        )}
      </div>
    </div>
  );
}
