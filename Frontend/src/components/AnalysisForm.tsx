import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AnalysisFormProps {
  onAnalyze: (results: any) => void;
}

export const AnalysisForm = ({ onAnalyze }: AnalysisFormProps) => {
  const [sequence, setSequence] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [marker, setMarker] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sequence.trim()) {
      alert('Please enter a DNA sequence to analyze.');
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis process
    setTimeout(() => {
      const results = {
        speciesCount: Math.floor(Math.random() * 10) + 8,
        readQuality: (Math.random() * 5 + 95).toFixed(1),
        novelSequences: Math.floor(Math.random() * 5),
        confidence: (Math.random() * 10 + 90).toFixed(1),
        chartData: generateChartData()
      };
      
      onAnalyze(results);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateChartData = () => {
    const species = ['Fish', 'Crustaceans', 'Mollusks', 'Algae', 'Bacteria', 'Other'];
    return species.map(specie => ({
      name: specie,
      value: Math.floor(Math.random() * 100)
    }));
  };

  return (
    <section className="analysis-card p-12 rounded-lg my-20">
      <h2 className="font-heading text-4xl mb-8 text-center text-ocean-gradient">
        eDNA Sequence Analysis
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <Label htmlFor="sequence" className="text-lg font-semibold text-muted-foreground mb-3 block">
            DNA Sequence (FASTA format)
          </Label>
          <Textarea
            id="sequence"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="Paste your DNA sequence here..."
            className="min-h-48 glass-card border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <Label htmlFor="sample-type" className="text-lg font-semibold text-muted-foreground mb-3 block">
            Sample Type
          </Label>
          <Select value={sampleType} onValueChange={setSampleType}>
            <SelectTrigger className="glass-card border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select sample type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seawater">Seawater</SelectItem>
              <SelectItem value="sediment">Sediment</SelectItem>
              <SelectItem value="biofilm">Biofilm</SelectItem>
              <SelectItem value="tissue">Tissue Sample</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="marker" className="text-lg font-semibold text-muted-foreground mb-3 block">
            Genetic Marker
          </Label>
          <Select value={marker} onValueChange={setMarker}>
            <SelectTrigger className="glass-card border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select genetic marker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="18s">18S rRNA</SelectItem>
              <SelectItem value="coi">COI</SelectItem>
              <SelectItem value="12s">12S rRNA</SelectItem>
              <SelectItem value="its">ITS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location" className="text-lg font-semibold text-muted-foreground mb-3 block">
            Collection Location
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Pacific Ocean, 2000m depth"
            className="glass-card border-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <Label htmlFor="date" className="text-lg font-semibold text-muted-foreground mb-3 block">
            Collection Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="glass-card border-primary/20 focus:border-primary"
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <Button 
            type="submit" 
            variant="hero" 
            size="lg"
            className="w-full text-lg py-6"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Sequence'}
          </Button>
        </div>
      </form>
    </section>
  );
};