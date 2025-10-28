import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Delta = Quill.import("delta");

type Editor = {
  readOnly: boolean;
  value: string;
  onChange: (semanticHtml: string) => void;
};

const Editor = forwardRef<Quill, Editor>(
  ({ readOnly = false, value, onChange }, ref) => {
    const containerRef = useRef(null);
    const valueRef = useRef(value);
    const onChangeRef = useRef(onChange);

    useLayoutEffect(() => {
      onChangeRef.current = onChange;
    });

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
        readOnly,
        modules: {
          toolbar: "#toolbar",
        },
      });

      if (ref && typeof ref !== "function") ref.current = quill;

      if (valueRef.current) {
        const isHTML = /^<([a-z]+)[^>]*>[\S\s]*<\/\1>$/.test(valueRef.current);
        const contentValue = isHTML
          ? quill.clipboard.convert({ html: valueRef.current })
          : new Delta().insert(valueRef.current);
        quill.setContents(contentValue);
      }

      quill.on(Quill.events.TEXT_CHANGE, () => {
        onChangeRef.current?.(quill.getSemanticHTML());
      });

      return () => {
        if (ref && typeof ref !== "function") ref.current = null;
        container.innerHTML = "";
      };
    }, [ref, readOnly]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = "Editor";

export const RichTextEditor = () => {
  const [value, setValue] = useState("");

  const quillRef = useRef();

  useEffect(() => {}, []);

  return (
    <div>
      <div id="toolbar" className="text-white bg-primary/10">
        <style>
          {`
            .ql-toolbar {
              border: 0.1px solid #0a0e2c !important;   
              border-top-left-radius: 0.375rem;
              border-top-right-radius: 0.375rem;
            }

            button:hover .ql-stroke,
            .ql-picker-label:hover .ql-stroke {
              fill: none;
              stroke: #4F46E5 !important;
            }
              
            button:hover .ql-fill,
            .ql-picker-label:hover .ql-fill {
              fill: #4F46E5 !important;
              stroke: none;
            }

            .ql-toolbar .ql-stroke {
              fill: none;
              stroke: white;
            }

            .ql-toolbar .ql-fill {
                fill: white;
                stroke: none;
            }

            .ql-toolbar .ql-picker {
                color: white;
            }

            .ql-toolbar .ql-picker-label:hover {
              color: #4F46E5 !important;
            }

            .ql-toolbar .ql-picker-item:hover {
              color: #4F46E5 !important;
            }

            .ql-toolbar .ql-picker-options {
              background-color: #0a0e2c !important;
            }

            .ql-toolbar .ql-picker-item.ql-selected {
              color: #4F46E5 !important;
            }
            
            .ql-editor {
              min-height: 300px;
              max-height: 600px;
              height: auto;
            }

            .ql-container {
              border: 0.1px solid #1e293b !important;
              border-bottom-left-radius: 0.375rem;
              border-bottom-right-radius: 0.375rem;
            }
          `}
        </style>
        <select className="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <select className="ql-color" />
        <select className="ql-background" />
        <button className="ql-script" value="sub" />
        <button className="ql-script" value="super" />
      </div>
      <Editor
        ref={quillRef}
        value={value}
        onChange={setValue}
        readOnly={false}
      />
    </div>
  );
};
