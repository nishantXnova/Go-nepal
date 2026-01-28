import { ExternalLink, Hotel, Mountain, Plane, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const partnerCategories = [
  {
    icon: Hotel,
    title: "Hotels & Lodges",
    description: "From luxury resorts to authentic teahouses along the trekking trails.",
    partners: ["Dwarika's Hotel", "Tiger Mountain Lodge", "Yeti Mountain Home"],
    cta: "Find Accommodation",
    link: "https://www.booking.com/country/np.en-gb.html?aid=861607&pagename=np&label=msn-ICRVt3vh7ZCJOFoc23YgFA-80608128146343:tikwd-80608341562765:loc-128:neo:mte:lp142622:dec:cid578717689:agid1289727784313803&utm_campaign=Deals%20-%20Nepal&utm_medium=cpc&utm_source=bing&utm_term=ICRVt3vh7ZCJOFoc23YgFA&msclkid=03a7d701f8cc19bbba61be7bd5ff0741&utm_content=Cy%3A148-Nepal",
    isExternal: true,
  },
  {
    icon: Mountain,
    title: "Trekking Guides",
    description: "Licensed guides and porters for safe and memorable mountain adventures.",
    partners: ["Nepal Mountaineering", "Himalayan Guides", "Adventure Consultants"],
    cta: "Find a Guide",
    link: "https://himalayaguidenepal.com/",
    isExternal: true,
  },
  {
    icon: Plane,
    title: "Domestic Flights",
    description: "Mountain flights and connections to remote destinations.",
    partners: ["Buddha Air", "Yeti Airlines", "Tara Air"],
    cta: "Book Flights",
    link: "/airlines",
    isExternal: false,
  },
  {
    icon: Package,
    title: "Tour Packages",
    description: "Curated experiences combining multiple destinations and activities.",
    partners: ["Nepal Tourism Board", "Intrepid Travel", "G Adventures"],
    cta: "Browse Packages",
    link: "https://www.getyourguide.com/-l169147/-tc1/?cmp=bing&cmp=bing&ad_id=78409142152750&adgroup_id=1254544125563947&bid_match_type=be&campaign_id=710823378&device=c&feed_item_id=&keyword=tours%20of%20nepal&loc_interest_ms=128&loc_physical_ms=142622&match_type=e&msclkid=02679414981814e2a3edfd6eb5c28c86&network=o&partner_id=CD951&target_id=kwd-78409396219588&utm_adgroup=lc%3D169147%3Anepal%7Cfn%3Df8%7Cci%3D942%3Atour&utm_campaign=dc%3D191%3Anp%7Clc%3D169147%3Anepal%7Cct%3Dcore%7Cln%3D29%3Aen%7Ctc%3Dall&utm_keyword=tours%20of%20nepal&utm_medium=paid_search&utm_query=Tour%20Packages%20nepal&utm_source=bing",
    isExternal: true,
  },
];

const Partners = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-widest text-sm font-medium mb-4">
            Trusted Partners
          </p>
          <h2 className="heading-section text-foreground mb-4">
            Book With <span className="italic text-accent">Confidence</span>
          </h2>
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            We've partnered with Nepal's best service providers to help you plan your perfect trip.
          </p>
        </div>

        {/* Partner Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-card rounded-2xl p-8 border border-border card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <category.icon className="h-8 w-8 text-accent" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>

                  {/* Partner Logos/Names */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.partners.map((partner) => (
                      <span
                        key={partner}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  {category.isExternal ? (
                    <a href={category.link} target="_blank" rel="noopener noreferrer">
                      <Button 
                        variant="outline" 
                        className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        {category.cta}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={category.link}>
                      <Button 
                        variant="outline" 
                        className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        {category.cta}
                        <Plane className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          * Partner links will redirect you to external booking platforms.GoNepalis not responsible for third-party services.
        </p>
      </div>
    </section>
  );
};

export default Partners;
