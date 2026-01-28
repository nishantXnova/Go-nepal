import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Settings2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Textarea } from './ui/textarea';
import { Message, sendMessage } from '@/lib/openrouter';
import { cn } from '@/lib/utils';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(`You are GoNepal, an intelligent, interactive tourism assistant.
  - ALWAYS use standard Markdown for formatting:
    - Headers: Use #, ##, ###
    - Lists: Use - or 1.
    - Bold/Italic: Use **bold** and *italic*
    - Horizontal Rules: Use ---
    - Tables: Use standard markdown table syntax
  - ALWAYS use proper LaTeX for mathematical formulas, symbols, or scientific notation:
    - Inline: Wrap in single dollar signs like $E = mc^2$
    - Block: Wrap in double dollar signs like $$ \\sum_{i=1}^n i = \\frac{n(n+1)}{2} $$
  - NEVER show raw LaTeX tags or unrendered markdown.
  - Tone: Friendly, expert, and encouraging.
  - Identity: GoNepal – Powered by VPHS Team.`);

  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const messagesWithSystem = systemPrompt 
        ? [{ role: 'system', content: systemPrompt } as Message, ...newMessages]
        : newMessages;
      
      const response = await sendMessage(messagesWithSystem);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content,
      };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please check the console.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="mb-4 w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col overflow-hidden border-primary/20 animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <MessageCircle size={20} />
              AI Assistant
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings2 size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden relative flex flex-col">
            {showSettings ? (
              <div className="p-4 space-y-4 h-full bg-muted/30">
                <div className="space-y-2">
                  <label className="text-sm font-medium">System Prompt</label>
                  <Textarea 
                    placeholder="Paste your system prompt here..." 
                    className="h-[300px] resize-none text-sm bg-background"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  />
                  <p className="text-[10px] text-muted-foreground italic">
                    This prompt will be sent at the beginning of every conversation.
                  </p>
                </div>
                <Button className="w-full" onClick={() => setShowSettings(false)}>
                  Save & Back to Chat
                </Button>
              </div>
            ) : (
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[350px] text-center text-muted-foreground opacity-60">
                    <MessageCircle size={48} className="mb-4" />
                    <p className="text-sm">No messages yet.<br/>Start a conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex",
                          msg.role === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                          <div 
                            className={cn(
                              "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                              msg.role === 'user' 
                                ? "bg-primary text-primary-foreground rounded-tr-none" 
                                : "bg-muted text-foreground rounded-tl-none border border-border"
                            )}
                          >
                            {msg.role === 'assistant' ? (
                                <ReactMarkdown
                                  remarkPlugins={[remarkMath, remarkGfm]}
                                  rehypePlugins={[rehypeKatex]}
                                  className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted-foreground/10 prose-pre:p-2 prose-pre:rounded-lg prose-hr:my-4 prose-headings:mb-2 prose-headings:mt-4"
                                >
                                  {msg.content}
                                </ReactMarkdown>

                            ) : (
                              msg.content
                            )}
                          </div>

                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-foreground max-w-[80%] rounded-2xl rounded-tl-none px-4 py-2 text-sm border border-border flex items-center gap-2">
                          <Loader2 size={14} className="animate-spin" />
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            )}
          </CardContent>

          {!showSettings && (
            <CardFooter className="p-3 border-t bg-background">
              <form 
                className="flex w-full items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1 h-9"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={isLoading || !input.trim()}>
                  <Send size={16} />
                </Button>
              </form>
            </CardFooter>
          )}
        </Card>
      )}

      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-all duration-300",
          isOpen ? "bg-muted text-muted-foreground hover:bg-muted" : "bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </Button>
    </div>
  );
};
