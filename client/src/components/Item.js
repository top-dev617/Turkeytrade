import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Loading from "./commons/Loading";
import { getPluralUnit } from "@/utils/helpers/getPluralUnit";

const Item = ({ items }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  console.log(items);

  return (
    <div className="item_parent pt-0">
      <div className="label">
        {items?.length ? (
          <div
            style={{ gap: "49px" }}
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          >
            {items?.map((item, index) => (
              <Link
                href={`/product/${item._id}`}
                key={index}
                style={{ cursor: "pointer", textDecoration: "none" }}
                className="item border rounded-md"
              >
                <div className="overflow-hidden">
                  <img
                    className="img-fluid h-[150px] md:h-[180px] w-full object-cover hover:scale-125 duration-300 rounded-md"
                    src={item?.images?.length && item?.images[0]}
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div style={{ padding: "10px 18px" }}>
                  <p
                    className={`${pathname === "/" && "text-center"} name mb-2`}
                  >
                    {item?.title?.length > 37 ? (
                      <h6 className="md:text-2xl label">
                        {item?.title?.slice(0, 37)}...
                      </h6>
                    ) : (
                      <h6 className="md:text-2xl label">{item?.title}</h6>
                    )}
                  </p>
                  {pathname !== "/" && (
                    <>
                      <div className="flex items-center flex-wrap gap-1">
                        <h1 className="font-bold text-black text-2xl">
                          € {item.minPrice} - {item.maxPrice}
                        </h1>
                        {/* <h1 className="label">
                          {item?.price[0]?.quantity?.from} -{" "}
                          {item?.price[0]?.quantity?.to}{" "}
                          {getPluralUnit(item?.unit)}
                        </h1> */}
                      </div>

                      <p className="amount label">
                        {item?.moq} {getPluralUnit(item?.unit)} (MOQ)
                      </p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <>{isLoading && <Loading />}</>
        )}
      </div>
    </div>
  );
};

export default Item;
