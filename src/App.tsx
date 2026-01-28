import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DestinationDetail from "./pages/DestinationDetail";
import Airlines from "./pages/Airlines";
import NotFound from "./pages/NotFound";
import HoverReceiver from "@/GoNepal/VisualEditsMessenger";
import { ChatBot } from "@/components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HoverReceiver />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/airlines" element={<Airlines />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
