import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import React, { useState, useEffect } from "react";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";
const StatisticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([[]]);
  const user = JSON.parse(localStorage.getItem("posUser"));
  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const configArea = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const configDonut = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>

      {data ? (
        <div className="px-6 md:pb-0 pb-10 ">
          <div className="statistic-section ">
            <h2>
              Hoş Geldin
              <span className="text-green-700 font-bold text-xl">
                {user.username}.
              </span>
            </h2>
            <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-12 md:gap-10 gap-4">
              <StatisticCard
                title={"Toplam Müşteri"}
                amount={data?.length}
                img={"images/user.png"}
              />
              <StatisticCard
                title={"Toplam Kazanç"}
                amount={totalAmount()}
                img={"images/money.png"}
              />
              <StatisticCard
                title={"Toplam Satış"}
                amount={data?.length}
                img={"images/sale.png"}
              />
              <StatisticCard
                title={"Toplam Ürün"}
                amount={products?.length}
                img={"images/product.png"}
              />
            </div>
            <div className="flex justify-between lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 lg:h-92 h-72 w-full ">
                <Area {...configArea} />
              </div>
              <div className="lg:w-1/2 lg:h-92 h-72 w-full">
                <Pie {...configDonut} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default StatisticPage;
