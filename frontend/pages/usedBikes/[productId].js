// next js imports
import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

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
import { getBikeById } from "../../lib/car";
import { useDispatch } from "react-redux";
import { setLocation } from "../../store/slices/shop/filter/locationSlice";
import { useBikeListQuery } from "../../store/service/api";

const Product = ({ productData }) => {
  // console.log(productData);
  const dispatch = useDispatch();
  const [ytLink, setYtLink] = useState(
    "https://www.youtube.com/embed/e_wlmBv_ry8"
  );

  const { data: bike, isLoading: bikeLoading } = useBikeListQuery();
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
              <h2>
                {productData.brand + " " + productData.model}
                {productData.verified && <MdVerified className="icon" />}
              </h2>

              <div className="breadcrumb">
                <Link href="/" className="active">
                  Home
                </Link>

                <span>{">"}</span>

                <Link href="/usedBikes" className="active">
                  Used Bikes
                </Link>

                <span>{">"}</span>

                <Link
                  href="/usedBikes"
                  className="active"
                  onClick={() => dispatch(setLocation(productData.location))}
                >
                  {"Bikes in " + productData.location}
                </Link>

                <span>{">"}</span>

                <Link
                  href={`/usedBikes/${
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
                <CarDetails productData={productData} bike={true} />
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
              {!bikeLoading && <SimilarCars car={bike} bike={true} />}
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

  const carDetail = await getBikeById(id);

  return { props: { productData: carDetail } };
}
