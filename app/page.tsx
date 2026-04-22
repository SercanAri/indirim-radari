import Header from "@/components/header";
import HeroSlider from "@/components/hero-slider";
import BrandsMarquee from "@/components/brands-marquee";
import TodayDeals from "@/components/today-deals";
import UpcomingDeals from "@/components/upcoming-deals";
import LastHours from "@/components/last-hours";
import CategoriesGrid from "@/components/categories-grid";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <BrandsMarquee />
        <TodayDeals />
        <LastHours />
        <UpcomingDeals />
        <CategoriesGrid />
      </main>
      <Footer />
    </>
  );
}
