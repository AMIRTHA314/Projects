import { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

interface CustomWebViewerProps {
  pdfUrl: string;
}

const CustomWebViewer: React.FC<CustomWebViewerProps> = ({ pdfUrl }) => {
  const viewer = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (viewer.current) {
    const fullPdfUrl = `${window.location.origin}${pdfUrl}`;
    console.log("Viewer Path: /webviewer");
    console.log("PDF URL:", fullPdfUrl);

    WebViewer(
      {
        path: "/webviewer",
        initialDoc: fullPdfUrl,
      },
      viewer.current
    )
      .then((instance) => {
        console.log("WebViewer initialized");
        const { UI } = instance;
        UI.setTheme("light");
      })
      .catch((err) => {
        console.error("WebViewer failed:", err);
      });
  }
}, [pdfUrl]);


  return (
    <div className="h-full w-full">
      <div className="h-full w-full" ref={viewer}></div>
    </div>
  );
};

export default CustomWebViewer;
