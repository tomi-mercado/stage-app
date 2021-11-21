import { useEffect } from "react";
import "./styles.css";
import OverheadLight, { TLight } from "../OverheadLight";

export type TControl = TLight | TLight[] | "alternateScreen";

function Stage({
  lights,
  controls,
  alternateScreen,
  onLightsChange,
  onAlternateScreen,
}: {
  lights: { [x in TLight]: boolean | undefined };
  controls: { [key: string]: TControl };
  alternateScreen?: boolean;
  onLightsChange: (light: TLight | TLight[]) => void;
  onAlternateScreen?: () => void;
}) {
  const handleStage = (e: KeyboardEvent) => {
    const control = controls[e.key];

    if (!!control) {
      if (control === "alternateScreen") {
        onAlternateScreen?.();
      } else {
        onLightsChange(control);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleStage);
    return () => {
      window.removeEventListener("keydown", handleStage);
    };
  }, [lights, alternateScreen]);

  return (
    <div className="container_stage">
      <div
        className={`screen alternateTransition ${
          alternateScreen ? "alternate_screen" : ""
        }`}
      ></div>
      <img
        className="stage_img"
        src="https://pics.clipartpng.com/midle/Stage_Lights_PNG_Clip_Art-2731.png"
      />
      <div
        className={`center_globe alternateTransition ${
          alternateScreen ? "alternate_center_globe" : ""
        }`}
      ></div>
      {(Object.keys(lights) as TLight[]).map((position) => {
        return (
          <OverheadLight
            key={position}
            position={position}
            active={!!lights[position]}
          />
        );
      })}
    </div>
  );
}

export default Stage;
