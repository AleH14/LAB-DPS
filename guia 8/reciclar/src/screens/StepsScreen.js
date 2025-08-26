import React from "react";
import StepScreen from "./StepScreen";

const StepsScreen = ({ steps, navigation }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Si estamos en el último paso, podemos navegar a otra pantalla o

      setCurrentStep(0); // Esto es solo un ejemplo, puedes
    }
  };

  return (
    <StepScreen
      step={steps[currentStep].step}
      description={steps[currentStep].description}
      onNextStep={handleNextStep}
    />
  );
};
export default StepsScreen;
