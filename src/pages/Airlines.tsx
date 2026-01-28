import { Plane, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const airlines = [
  {
    name: "Buddha Air",
    description: "The largest domestic airline in Nepal, operating a modern fleet of ATR aircraft. Known for its punctual flights and extensive network.",
    website: "https://www.buddhaair.com/",
    type: "Scheduled Domestic",
    hubs: "Kathmandu, Pokhara",
  },
  {
    name: "Yeti Airlines",
    description: "A leading domestic carrier with an extensive network covering major cities and trekking gateways across Nepal.",
    website: "https://www.yetiairlines.com/",
    type: "Scheduled Domestic",
    hubs: "Kathmandu",
  },
  {
    name: "Nepal Airlines",
    description: "The national flag carrier of Nepal, operating both domestic and international flights. Essential for reaching remote mountain regions.",
    website: "https://www.nepalairlines.com.np/",
    type: "Flag Carrier",
    hubs: "Kathmandu",
  },
  {
    name: "Shree Airlines",
    description: "Operates a fleet of Bombardier CRJ jets and helicopters. Known for connecting major urban centers with high-speed service.",
    website: "https://www.shreeairlines.com/",
    type: "Scheduled Domestic",
    hubs: "Kathmandu",
  },
  {
    name: "Tara Air",
    description: "A subsidiary of Yeti Airlines, specializing in STOL (Short Take-Off and Landing) operations to remote mountain airports like Lukla.",
    website: "https://www.taraair.com/",
    type: "Mountain / STOL",
    hubs: "Kathmandu, Nepalgunj",
  },
  {
    name: "Sita Air",
    description: "Specializes in mountain flights and cargo services to remote parts of Nepal using Dornier aircraft.",
    website: "https://www.sitaair.com.np/",
    type: "Mountain / STOL",
    hubs: "Kathmandu",
  },
  {
    name: "Summit Air",
    description: "A STOL specialist operating modern Let L-410 aircraft to challenging mountain destinations including Lukla and Jomsom.",
    website: "https://www.summitair.com.np/",
    type: "Mountain / STOL",
    hubs: "Kathmandu, Nepalgunj",
  }
];

const Airlines = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-wide py-12">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-accent hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Domestic <span className="text-accent italic">Airlines</span> in Nepal
          </h1>
          <p className="text-body-large text-muted-foreground max-w-2xl">
            Explore and book domestic flights across Nepal with these trusted carriers. 
            From mountain STOL flights to major city connections.
          </p>
        </div>

        {/* Airline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {airlines.map((airline) => (
            <div 
              key={airline.name}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Plane className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{airline.name}</h2>
                  <span className="text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {airline.type}
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-6 flex-grow">
                {airline.description}
              </p>
              
              <div className="space-y-4">
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Hubs:</span> {airline.hubs}
                </div>
                
                <a 
                  href={airline.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Official Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-16 bg-secondary/30 rounded-2xl p-8 border border-border">
          <h3 className="text-xl font-bold text-foreground mb-4">Travel Tip</h3>
          <p className="text-muted-foreground">
            Domestic flights in Nepal, especially to mountain destinations like Lukla, Jomsom, and Phaplu, 
            are highly weather-dependent. It is recommended to book early morning flights and keep 
            at least one buffer day in your itinerary for potential delays.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Airlines;
