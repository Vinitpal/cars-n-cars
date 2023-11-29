import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useAppContext } from "../../context/state";
import "keen-slider/keen-slider.min.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CarouselForBudget = ({ children, reload, setReload }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [options, setOption] = useState({});
  const [pageLoaded, setPageLoad] = useState(false);
  const { wait } = useAppContext();

  useEffect(() => {
    if (!pageLoaded) {
      wait(200).then(() => {
        setOption({
          initial: 0,
          slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
          },
          created() {
            setLoaded(true);
          },
          mode: "free-snap",
          loop: false,

          breakpoints: {
            "(min-width: 200px)": {
              slides: { perView: 1, spacing: 20 },
            },
            "(min-width: 700px)": {
              slides: { perView: 2, spacing: 5 },
            },
            "(min-width: 1000px)": {
              slides: { perView: 3, spacing: 10 },
            },
            "(min-width: 1600px)": {
              slides: { perView: 4, spacing: 20 },
            },
          },
          slides: { spacing: 20 },
        });
      });
      setPageLoad(true);
    }
  }, [pageLoaded, wait]);

  useEffect(() => {
    if (reload) {
      setOption({});
      wait(10).then(() => {
        setOption({
          initial: 0,
          slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
          },
          created() {
            setLoaded(true);
          },
          mode: "free-snap",
          loop: false,

          breakpoints: {
            "(min-width: 200px)": {
              slides: { perView: 1, spacing: 20 },
            },
            "(min-width: 700px)": {
              slides: { perView: 2, spacing: 5 },
            },
            "(min-width: 1000px)": {
              slides: { perView: 3, spacing: 10 },
            },
            "(min-width: 1600px)": {
              slides: { perView: 4, spacing: 20 },
            },
          },
          slides: { spacing: 20 },
        });
      });
      setReload(false);
    }
  }, [reload, wait, setReload]);

  const [sliderRef, instanceRef] = useKeenSlider(options);

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {children}
        </div>
        {pageLoaded && instanceRef.current && (
          <>
            <Arrow
              left
              disabled={currentSlide === 0}
              onClick={(e) => {
                if (instanceRef.current.slides.length === 0) {
                  e.stopPropagation();
                } else {
                  e.stopPropagation() || instanceRef.current?.prev();
                }
              }}
            />

            <Arrow
              onClick={(e) => {
                if (instanceRef.current.slides.length === 0) {
                  e.stopPropagation();
                } else {
                  e.stopPropagation() || instanceRef.current?.next();
                }
              }}
              disabled={
                currentSlide ===
                instanceRef.current.track.details?.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <button
      onClick={props.onClick}
      className={`carousal-arrow ${
        props.left ? "carousal-left" : "carousal-right"
      } ${disabled}`}
    >
      {props.left && <AiOutlineLeft />}
      {!props.left && <AiOutlineRight />}
    </button>
  );
}

export default CarouselForBudget;
