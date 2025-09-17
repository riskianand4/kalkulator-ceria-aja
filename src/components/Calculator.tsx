import { useState } from "react";
import { cn } from "@/lib/utils";

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "number" | "operator" | "equals" | "clear";
  className?: string;
}

const CalculatorButton = ({ children, onClick, variant = "number", className }: CalculatorButtonProps) => {
  const baseClasses = "h-16 rounded-2xl font-semibold text-lg backdrop-blur-xl border border-white/10 transition-all duration-300 active:scale-95 select-none";
  
  const variantClasses = {
    number: "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-foreground shadow-[0_4px_15px_0_hsl(220_25%_5%_/_0.2)] hover:shadow-[0_6px_20px_0_hsl(220_25%_5%_/_0.3)]",
    operator: "bg-gradient-to-br from-primary/80 to-primary/60 hover:from-primary hover:to-primary/80 text-primary-foreground shadow-[0_4px_15px_0_hsl(263_70%_55%_/_0.3)] hover:shadow-[0_6px_20px_0_hsl(263_70%_55%_/_0.4)]",
    equals: "bg-gradient-to-br from-accent/80 to-accent/60 hover:from-accent hover:to-accent/80 text-accent-foreground shadow-[0_4px_15px_0_hsl(202_75%_55%_/_0.3)] hover:shadow-[0_6px_20px_0_hsl(202_75%_55%_/_0.4)]",
    clear: "bg-gradient-to-br from-destructive/80 to-destructive/60 hover:from-destructive hover:to-destructive/80 text-destructive-foreground shadow-[0_4px_15px_0_hsl(0_84%_60%_/_0.3)] hover:shadow-[0_6px_20px_0_hsl(0_84%_60%_/_0.4)]"
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
};

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (firstOperand: string, secondOperand: string, operation: string): string => {
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);

    switch (operation) {
      case "+":
        return (first + second).toString();
      case "-":
        return (first - second).toString();
      case "×":
        return (first * second).toString();
      case "÷":
        return second !== 0 ? (first / second).toString() : "Error";
      default:
        return secondOperand;
    }
  };

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = display;

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || "0";
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(newValue);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, display, operation);
      setDisplay(newValue);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-gradient-to-br from-calculator-glass/80 to-calculator-glass/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_32px_0_hsl(220_25%_5%_/_0.3)]">
      {/* Display */}
      <div className="mb-6 p-6 bg-calculator-display/80 backdrop-blur-sm rounded-2xl border border-white/5 shadow-inner">
        <div className="text-right text-4xl font-light text-foreground truncate">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CalculatorButton variant="clear" onClick={clear} className="col-span-2">
          Clear
        </CalculatorButton>
        <CalculatorButton variant="operator" onClick={() => performOperation("÷")}>
          ÷
        </CalculatorButton>
        <CalculatorButton variant="operator" onClick={() => performOperation("×")}>
          ×
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => inputNumber("7")}>7</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("8")}>8</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("9")}>9</CalculatorButton>
        <CalculatorButton variant="operator" onClick={() => performOperation("-")}>
          −
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => inputNumber("4")}>4</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("5")}>5</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("6")}>6</CalculatorButton>
        <CalculatorButton variant="operator" onClick={() => performOperation("+")}>
          +
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputNumber("1")}>1</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("2")}>2</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber("3")}>3</CalculatorButton>
        <CalculatorButton variant="equals" onClick={performCalculation} className="row-span-2">
          =
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton onClick={() => inputNumber("0")} className="col-span-2">
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
      </div>
    </div>
  );
}