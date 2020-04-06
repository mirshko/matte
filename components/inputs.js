export const FileInput = ({ label = "Choose File", onChange, ...rest }) => (
  <>
    <input
      id="file"
      type="file"
      accept="image/*"
      onChange={onChange}
      {...rest}
    />
    <label htmlFor="file">{label}</label>
    <style jsx>{`
      input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }

      input + label {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: black;
        font-size: 17px;
        padding: 10px 22px;
        text-align: center;
        font-weight: 600;
        border-radius: 99999px;
        background-color: white;
        border: none;
        appearance: none;
        background: white;
      }

      input:focus + label {
        outline: none;
      }

      input + label::before,
      input + label::after {
        content: "";
        display: block;
        position: absolute;
        border-radius: inherit;
      }

      input + label::before {
        z-index: 0;
        width: 100%;
        height: 100%;
      }

      input:focus + label::before {
        box-shadow: 0 0 0 3px rgba(131, 192, 253, 0.5);
        outline: none;
      }
    `}</style>
  </>
);
