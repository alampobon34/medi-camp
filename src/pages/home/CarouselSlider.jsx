import { Carousel, Typography, Button } from "@material-tailwind/react";


const SLIDERS = [
    {
        title: 'A free health check-up campaign',
        paragraph: "Through 2 MBBS doctors conduct the health checkup campaign.",
        imageUrl: "https://www.newagebd.com/files/records/news/202206/172372_120.jpg"
    },
    {
        title: "COVID-19 vaccination",
        paragraph: "Over 22M children aged 5 to 11 to get pediatric Pfizer vaccines in countrywide drive",
        imageUrl: "https://bd.usembassy.gov/wp-content/uploads/sites/151/2023/11/I9A0737-1140x684-1.jpg"
    },
    {
        title: 'Boosting immunity Vit-A campaign',
        paragraph: "Remarkable achievement for one of few Vitamin A campaigns held worldwide during the pandemic.",
        imageUrl: "https://www.unicef.org/bangladesh/sites/unicef.org.bangladesh/files/styles/hero_extended/public/UN0353783%20%281%29_0.JPG.webp?itok=xB5yiYEX"
    },

]

export default function CarouselSlider() {
    return (
        <Carousel className="rounded-xl mt-2">
            {
                SLIDERS.map((slider, index) => (
                    <div key={index} className="relative h-full w-full">
                        <img
                            src={slider?.imageUrl}
                            alt="image 1"
                            className="w-full object-cover h-[320px] md:h-[480px]"
                        />
                        <div className="absolute inset-0 grid h-full w-full items-center bg-black/40">
                            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    {slider.title}
                                </Typography>
                                <Typography
                                    variant="lead"
                                    color="white"
                                    className="mb-4 md:mb-6 opacity-80"
                                >
                                    <span className="block md:hidden">{slider.paragraph.length > 40 ? slider.paragraph.slice(0, 40) + '...' : slider.paragraph}</span>
                                    <span className="hidden md:block">{slider.paragraph}</span>
                                </Typography>
                                <div className="flex gap-2">
                                    <Button size="md" color="white">
                                        Explore
                                    </Button>
                                    <Button size="md" color="white" variant="text">
                                        Gallery
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Carousel>
    );
}