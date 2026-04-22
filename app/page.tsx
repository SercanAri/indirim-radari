import Header from "@/components/header";
import HeroSlider from "@/components/hero-slider";
import SearchHero from "@/components/search-hero";
import ValueProps from "@/components/value-props";
import BrandsMarquee from "@/components/brands-marquee";
import TodayDeals from "@/components/today-deals";
import UpcomingDeals from "@/components/upcoming-deals";
import LastHours from "@/components/last-hours";
import CategoriesGrid from "@/components/categories-grid";
import Footer from "@/components/footer";

// Countdown targetDates mock-data'da module-level `new Date()`'ten
// üretildiği için static prerender build time'a donuyor. Dynamic render ile
// her isteğe taze "şimdi" veriyoruz; client-side Countdown da doğru başlıyor.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <SearchHero />
        <ValueProps />
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
