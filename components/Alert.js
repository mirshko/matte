import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogLabel,
} from "@reach/alert-dialog";
import { useRef } from "react";

const Alert = ({ label, description, close }) => {
  const cancelRef = useRef();

  return (
    <AlertDialog leastDestructiveRef={cancelRef}>
      <AlertDialogLabel>{label || "A Short Title Is Best"}</AlertDialogLabel>

      <AlertDialogDescription>
        {description || "A message should be a short, complete sentence."}
      </AlertDialogDescription>

      <div className="alert-buttons">
        <button onClick={close} ref={cancelRef}>
          Close
        </button>
      </div>

      <style jsx global>{`
        :root {
          --reach-dialog: 1;
        }

        [data-reach-alert-dialog-label] {
          padding: 20px 32px 0 32px;
          font-size: 17px;
          font-weight: 500;
          line-height: 22px;
        }

        [data-reach-alert-dialog-description] {
          padding: 2px 32px 20px 32px;
          font-size: 13px;
          letter-spacing: -0.08px;
          line-height: 16px;
        }

        .alert-buttons {
          box-shadow: 0 0 0 1px rgba(60, 60, 67, 0.29);
        }

        @media (-webkit-min-device-pixel-ratio: 2) {
          .alert-buttons {
            box-shadow: 0 0 0 0.5px rgba(60, 60, 67, 0.29);
          }
        }

        button {
          background: transparent;
          border: none;
          color: #007aff;
          font-size: 17px;
          font-weight: 600;
          line-height: 22px;
          outline: none;
          padding: 12px 16px 10px 16px;
          width: 100%;
        }

        [data-reach-dialog-overlay] {
          background: hsla(0, 0%, 0%, 0.4);
          bottom: 0;
          color: black;
          left: 0;
          overflow: auto;
          position: fixed;
          right: 0;
          top: 0;
        }

        [data-reach-dialog-content] {
          backdrop-filter: blur(20px);
          background: hsla(0, 0%, 100%, 0.8);
          border-radius: 14.875px;
          user-select: none;
          left: 50%;
          max-width: 270px;
          outline: none;
          overflow: hidden;
          position: absolute;
          text-align: center;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
          width: 100%;
        }
      `}</style>
    </AlertDialog>
  );
};

export default Alert;
