import { useState } from "react";
import { Search, Calendar, Users, DollarSign, Filter, Loader2, Sparkles, TrendingDown, Swords, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendMessage, Message } from "@/lib/openrouter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const interests = ["Adventure", "Culture", "Nature", "Spirituality", "Family"];
const durations = ["3 days", "5 days", "7 days", "10+ days"];
const difficulties = ["Easy", "Moderate", "Challenging"];
const budgets = ["Budget", "Mid-range", "Luxury"];

const SYSTEM_PROMPT = `You are GoBot, an intelligent, interactive tourism assistant designed to help users explore, plan, and enjoy Nepal to the fullest. Your goal is to provide accurate, engaging, and personalized travel guidance for domestic and international tourists. Always respond in a friendly, informative, and culturally sensitive manner.

Core Responsibilities:
Tourist Information & Recommendations:
- Provide details on cities, towns, landmarks, and hidden gems in Nepal.
- Suggest activities like trekking, mountaineering, cultural tours, wildlife safaris, and adventure sports.
- Give information on local cuisine, festivals, customs, and etiquette.

Travel Planning & Itineraries:
- Help users plan trips based on duration, budget, interests, and travel style.
- Create optimized itineraries including transportation, accommodation, and sightseeing.
- Suggest alternative routes or experiences for unique travel experiences.

Logistics & Practical Guidance:
- Provide information on flights, buses, taxis, and local transport options.
- Give guidance on visa requirements, safety tips, weather conditions, and best travel seasons.
- Recommend hotels, guesthouses, hostels, and homestays according to user preferences.

Interactive & Personalized Assistance:
- Ask users about preferences to customize recommendations.
- Use clear, concise, and engaging language suitable for both first-time and repeat travelers.
- Offer insider tips, offbeat experiences, and cultural insights.

Content Style & Tone:
- Friendly, helpful, and encouraging tone, inspiring curiosity about Nepal.
- Avoid generic or vague advice; be specific, actionable, and accurate.
- Include small, interesting trivia about places to make the conversation engaging.

Limitations:
- Always provide factual, up-to-date information. If unsure, admit uncertainty rather than guessing.
- Do not provide any content unrelated to Nepal tourism or travel.
- Avoid political, religious, or controversial discussions unless relevant to travel context (e.g., local customs).

Branding:
- Always introduce yourself as GoNepal – Powered by VPHS Team when starting a session.
- Maintain the identity of a trustworthy, local Nepal travel expert.

Important Rules:
- Write clear, well-formatted content with proper markdown headers (use #, ##, ###).
- Use proper LaTeX formatting for mathematical expressions.
- Always format your response cleanly with proper spacing and structure.`;

const PlanTrip = () => {
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refinementLoading, setRefinementLoading] = useState<string | null>(null);

  const handlePlanTrip = async (refinement?: string) => {
    setIsLoading(true);
    if (refinement) setRefinementLoading(refinement);
    
    try {
      const userPrompt = refinement 
        ? `I liked the plan, but can you make it ${refinement}? Here is the previous plan: ${itinerary}`
        : `I want to plan a trip to Nepal with the following preferences:
           - Interest: ${selectedInterest}
           - Duration: ${selectedDuration}
           - Difficulty: ${selectedDifficulty || 'Any'}
           - Budget: ${selectedBudget || 'Any'}
           
           Please provide a detailed itinerary with day-by-day activities, estimated costs, and travel tips.`;

      const messages: Message[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ];

      const response = await sendMessage(messages);
      setItinerary(response.choices[0].message.content);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('itinerary-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Failed to plan trip:", error);
    } finally {
      setIsLoading(false);
      setRefinementLoading(null);
    }
  };

  return (
    <section id="plan" className="section-padding bg-primary relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-wide relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary-foreground/70 uppercase tracking-widest text-sm font-medium mb-4">
            Trip Planner
          </p>
          <h2 className="heading-section text-primary-foreground mb-4">
            Plan Your Perfect <span className="italic text-nepal-gold">Journey</span>
          </h2>
          <p className="text-body-large text-primary-foreground/80 max-w-2xl mx-auto">
            Tell us how you want to explore, and we'll help you find the perfect itinerary.
          </p>
        </div>

        {/* Filter Card */}
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated max-w-4xl mx-auto mb-12">
          {/* Interest Filter */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-foreground font-medium mb-4">
              <Search className="h-5 w-5 text-accent" />
              What interests you?
            </label>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => setSelectedInterest(interest === selectedInterest ? null : interest)}
                  className={`px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${
                    selectedInterest === interest
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-foreground font-medium mb-4">
              <Calendar className="h-5 w-5 text-accent" />
              How long is your trip?
            </label>
            <div className="flex flex-wrap gap-3">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration === selectedDuration ? null : duration)}
                  className={`px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${
                    selectedDuration === duration
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty & Budget */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Difficulty */}
            <div>
              <label className="flex items-center gap-2 text-foreground font-medium mb-4">
                <Filter className="h-5 w-5 text-accent" />
                Difficulty level?
              </label>
              <div className="flex flex-wrap gap-3">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty === selectedDifficulty ? null : difficulty)}
                    className={`px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${
                      selectedDifficulty === difficulty
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border text-foreground hover:border-accent hover:text-accent"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="flex items-center gap-2 text-foreground font-medium mb-4">
                <DollarSign className="h-5 w-5 text-accent" />
                What's your budget?
              </label>
              <div className="flex flex-wrap gap-3">
                {budgets.map((budget) => (
                  <button
                    key={budget}
                    onClick={() => setSelectedBudget(budget === selectedBudget ? null : budget)}
                    className={`px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${
                      selectedBudget === budget
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border text-foreground hover:border-accent hover:text-accent"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button 
            size="lg" 
            className="w-full btn-accent text-lg py-6"
            disabled={!selectedInterest || !selectedDuration || isLoading}
            onClick={() => handlePlanTrip()}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Consulting GoNepal..." : "Find My Perfect Trip"}
          </Button>
        </div>

        {/* Results Section */}
        {itinerary && (
          <div id="itinerary-result" className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            <Card className="bg-white/95 backdrop-blur-sm border-none shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                      <Sparkles className="text-accent h-6 w-6" />
                      Your Custom Nepal Itinerary
                    </h3>
                    <p className="text-muted-foreground mt-1">Crafted by GoNepal Assistant</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 text-xs h-8"
                      disabled={isLoading}
                      onClick={() => handlePlanTrip("more cheaper and budget-friendly")}
                    >
                      {refinementLoading === "more cheaper and budget-friendly" ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      Cheaper
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 text-xs h-8"
                      disabled={isLoading}
                      onClick={() => handlePlanTrip("more adventurous and thrilling")}
                    >
                      {refinementLoading === "more adventurous and thrilling" ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Swords className="h-3 w-3" />
                      )}
                      More Adventurous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 text-xs h-8"
                      disabled={isLoading}
                      onClick={() => handlePlanTrip("more relaxed and cultural")}
                    >
                      {refinementLoading === "more relaxed and cultural" ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Mountain className="h-3 w-3" />
                      )}
                      More Relaxed
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[500px] pr-4">
                  <div className="prose prose-slate max-w-none text-foreground leading-relaxed markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4 text-primary" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-5 mb-3 text-primary" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-4 mb-2 text-primary" {...props} />,
                        p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-primary" {...props} />,
                        em: ({node, ...props}) => <em className="italic text-accent" {...props} />,
                        code: ({node, inline, ...props}) => 
                          inline ? (
                            <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                          ) : (
                            <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-sm font-mono mb-3" {...props} />
                          ),
                      }}
                    >
                      {itinerary}
                    </ReactMarkdown>
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanTrip;

