import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";

async function fetchCategories() {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  return data.data;
}

export default function CategorySlider() {
  const {
    data: categorySlider,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 3600000,
    retry: 20,
    retryDelay: 20000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 font-bold text-xl my-10">
        Loading categories...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-bold text-xl my-10">
        {error.message}
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    cssEase: "linear",
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
    ],
  };

  return (
    <>
      <h3 className="mt-10">Shop Popular Categories</h3>
      <Slider {...settings}>
        {categorySlider.map((c) => (
          <div className="p-2" key={c._id}>
            <img
              className="md:h-48 sm:h-60 h-72 object-cover object-center w-full"
              src={c.image}
              alt={c.name}
            />
            <h2 className="text-center">{c.name}</h2>
          </div>
        ))}
      </Slider>
      <div className="mb-20"></div>
    </>
  );
}
