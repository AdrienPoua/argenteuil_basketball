import React from "react";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useMediaQuery, useTheme, Fab } from "@mui/material";

const NextArrow = (props:  any ) => {
  const { onClick } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Fab
      aria-label="Next"
      onClick={onClick}
      size={isSmallScreen ? "small" : "large"}
      className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-primary">
      <ArrowForwardIosIcon />
    </Fab>
  );
};

const PrevArrow = (props: any ) => {
  const { onClick } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Fab
      aria-label="Previous"
      onClick={onClick}
      size={isSmallScreen ? "small" : "large"}
      className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 bg-primary">
      <ArrowBackIosIcon />
    </Fab>
  );
};
export default function SimpleSlider({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = {
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768, // md in TailwindCSS (768px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640, // sm in TailwindCSS (640px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return <Slider className="max-w-[80%]" {...settings}>{children}</Slider>;
}
