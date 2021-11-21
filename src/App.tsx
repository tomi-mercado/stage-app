import { useState } from "react";
import "./App.css";
import { TLight } from "./components/OverheadLight";
import Stage from "./components/Stage";

function App() {
  const [lights, setLights] = useState<{ [x in TLight]: boolean | undefined }>({
    left: undefined,
    center: undefined,
    right: undefined,
  });

  const [alternateScreen, setAlternateScreen] = useState(false);

  const handleLights = (light: TLight | TLight[]) => {
    const newLights = { ...lights };

    if (typeof light === "string") {
      newLights[light] = !newLights[light];
    } else {
      light.forEach((light) => {
        newLights[light] = !newLights[light];
      });
    }

    setLights(newLights);
  };

  const toggleAlternateScreen = () => {
    setAlternateScreen(!alternateScreen);
  };

  return (
    <div className="container">
      <div>
        <Stage
          lights={lights}
          controls={{
            "7": "left",
            "8": "center",
            "9": "right",
            " ": "alternateScreen",
          }}
          alternateScreen={alternateScreen}
          onLightsChange={handleLights}
          onAlternateScreen={toggleAlternateScreen}
        />
      </div>
    </div>
  );
}

export default App;
