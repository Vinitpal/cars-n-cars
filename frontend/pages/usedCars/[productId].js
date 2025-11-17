// next js imports
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

// component imports
const CarCta = dynamic(() => import("../../components/ShopProduct/CarCta"));
const CarInfo = dynamic(() => import("../../components/ShopProduct/CarInfo"));
const CarCarousel = dynamic(() =>
  import("../../components/ShopProduct/CarCarousel")
);
const CarDetails = dynamic(() =>
  import("../../components/ShopProduct/CarDetails")
);
const SimilarCars = dynamic(() =>
  import("../../components/ShopProduct/SimilarCars")
);

// icon
import { MdVerified } from "react-icons/md";
import { getCarById } from "../../lib/car";
import { useDispatch } from "react-redux";
import { setLocation } from "../../store/slices/shop/filter/locationSlice";
import { useCarListQuery, useModelsQuery } from "../../store/service/api";
import { useState, useEffect } from "react";

const Product = ({ productData }) => {
  console.log({ productData });
  const dispatch = useDispatch();
  const [ytLink, setYtLink] = useState(
    "https://www.youtube.com/embed/AtriYnhC3-Q?si=9yIayIyJJDtoa0L-"
  );

  const { data: car, isLoading: carLoading } = useCarListQuery();
  // const { data: model, isLoading: modelLoading } = useModelsQuery();

  // useEffect(() => {
  //   if (!modelLoading && productData) {
  //     model.data.forEach((element) => {
  //       if (element.m_name === productData.model && element.youtube) {
  //         // console.log(element.youtube.split("/"));
  //         let link = element?.youtube?.split("/");
  //         let ytcode = link[link.length - 1];
  //         // console.log(ytcode);
  //         setYtLink("https://www.youtube.com/embed/" + ytcode);
  //       }
  //     });
  //   }
  // }, [model, modelLoading, productData]);

  return (
    <>
      <Head>
        <title>{productData.brand + " " + productData.model}</title>
        <meta
          name="title"
          content={productData.brand + " " + productData.mode}
        />
        <meta
          name="description"
          content={productData.brand + " " + productData.moden}
        />
        <meta
          name="keywords"
          content={productData.brand + " " + productData.mode}
        />
        {/* <script type="application/ld+json" id="seoSchema">
          {productData?.seo_schema}
        </script> */}
      </Head>
      <div className="product-detail">
        {productData && (
          <>
            <div className="header">
              {/* ------- */}
              {/* Heading */}
              {/* ------- */}
              <h2>
                {productData.brand + " " + productData.model}
                {productData.verified && <MdVerified className="icon" />}
              </h2>

              {/* ---------- */}
              {/* BreadCrumb */}
              {/* ---------- */}
              <div className="breadcrumb">
                <Link href="/" className="active">
                  Home
                </Link>

                <span>{">"}</span>

                <Link href="/usedCars" className="active">
                  Used Cars
                </Link>

                <span>{">"}</span>

                <Link
                  href="/usedCars"
                  className="active"
                  onClick={() => dispatch(setLocation(productData.location))}
                >
                  {"Cars in " + productData.location}
                </Link>

                <span>{">"}</span>

                <Link
                  href={`/usedCars/${
                    productData.brand + "_" + productData.model
                  }?id=${productData._id}`}
                >
                  {productData.brand + " " + productData.model}
                </Link>
              </div>
            </div>

            <div className="product-detail-container">
              <CarCarousel productData={productData} />
              <CarInfo productData={productData} />
            </div>

            <section className="product-detail-second-section">
              <div className="car-details border-pc">
                <CarDetails productData={productData} />
              </div>

              <div className="car-preview border-pc">
                <iframe
                  src={ytLink}
                  allow="autoplay; encrypted-media"
                  width={"100%"}
                  height={"350px"}
                  allowFullScreen
                  title="video"
                />
              </div>
            </section>

            <section className="cta-btns-section">
              <CarCta productData={productData} />
            </section>

            <div className="similar-cars">
              {!carLoading && <SimilarCars car={car} />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

// {/}
export default Product;

// export async function getStaticPaths() {
//   // Call an external API endpoint to get paths
//   const paths = await getCarPath();
//   // console.log(paths);

//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

export async function getServerSideProps(context) {
  const id = context.query.id;
  // console.log(context);

  const carDetail = await getCarById(id);

  return { props: { productData: carDetail } };
}
