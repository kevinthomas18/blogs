import CardsContainer from "@/components/CardsContainer";
import Heading from "@/components/Heading";
import ImageSlider from "@/components/ImageSlider";
import { fetchAllBlogs } from "@/utils/actions";

const HomePage = async() => {
  const blogs=await fetchAllBlogs();
  console.log(blogs.banner);
  return (
    <div className="sm:px-3 md:px-12 lg:px-28 mt-10">
      {/* <Heading />
      <CardsContainer /> */}
      <ImageSlider banners={blogs.banner}/>
      <CardsContainer title="Featured" blogs={blogs.featured}/>
      <CardsContainer title="Standard" blogs={blogs.standard}/>
    </div>
  );
};

export default HomePage;
