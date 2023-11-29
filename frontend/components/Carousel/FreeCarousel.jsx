import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useAppContext } from "../../context/state";

const FreeCarousel = ({ children, reload, setReload }) => {
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
          loop: true,
          mode: "free-snap",
          breakpoints: {
            "(min-width: 200px)": {
              slides: { perView: 3, spacing: 5 },
            },
            "(min-width: 420px)": {
              slides: { perView: 4, spacing: 15 },
            },
            "(min-width: 700px)": {
              slides: { perView: 5, spacing: 5 },
            },
            "(min-width: 1000px)": {
              slides: { perView: 5, spacing: 10 },
            },
            "(min-width: 1300px)": {
              slides: { perView: 6, spacing: 10 },
            },
            "(min-width: 1500px)": {
              slides: { perView: 7, spacing: 10 },
            },
            "(min-width: 1800px)": {
              slides: { perView: 8, spacing: 10 },
            },
          },
        });
      });
      setPageLoad(true);
    }
  }, [pageLoaded, wait]);

  useEffect(() => {
    if (reload) {
      setOption({});
      wait(100).then(() => {
        setOption({
          initial: 0,
          slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
          },
          created() {
            setLoaded(true);
          },
          loop: true,
          mode: "free-snap",
          breakpoints: {
            "(min-width: 200px)": {
              slides: { perView: 3, spacing: 5 },
            },
            "(min-width: 420px)": {
              slides: { perView: 4, spacing: 15 },
            },
            "(min-width: 700px)": {
              slides: { perView: 5, spacing: 5 },
            },
            "(min-width: 1000px)": {
              slides: { perView: 5, spacing: 10 },
            },
            "(min-width: 1300px)": {
              slides: { perView: 6, spacing: 10 },
            },
            "(min-width: 1500px)": {
              slides: { perView: 7, spacing: 10 },
            },
            "(min-width: 1800px)": {
              slides: { perView: 8, spacing: 10 },
            },
          },
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
        {loaded && instanceRef.current && (
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

export default FreeCarousel;
