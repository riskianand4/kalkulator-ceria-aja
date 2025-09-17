import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Kalkulator Modern
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Kalkulator dengan desain glass morphism yang elegan dan smooth animations
          </p>
        </div>
        
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
