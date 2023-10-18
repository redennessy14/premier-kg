import CustomCarousel from "../components/CustomCarouesel/CustomCarousel";
import CustomCategory from "../components/CustomCategory/CustomCategory";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <div>
        {" "}
        <CustomCarousel />
        <CustomCategory />
      </div>
    </div>
  );
};

export default Home;
